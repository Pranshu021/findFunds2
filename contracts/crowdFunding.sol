// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;
import './fundingBank.sol';

contract CrowdFunding {
    uint64 numberOfProjects;
    address owner;
    FundingBank public Bank;
    mapping(address => projectInfo) projects;
    mapping(address => mapping(address => uint256)) investedinProject;

    
    struct projectInfo {
        uint64 id;
        string projectName;
        uint256 requiredFunds;
        uint256 totalFunds;
        address[] investors;
        bool[] approvals;
    }

    // projectInfo info;

    modifier ownerOnly {
        require(msg.sender == owner, "You don't have the required permissions");
        _;
    }

    modifier projectOwnerOnly (address _projectAddress) {
        require(_projectAddress == msg.sender);
        _;
    }

    event projectRegistered(address _projectAddress, string _projectName, uint256 _requiredFunds);
    event amountInvestedInProject(address _projectAddress, address _investorAddress, uint256 _amount);
    event fundingReleased(address _projectAddress);

    constructor(address payable _fundingBankAddress) public {
        owner = msg.sender;
        Bank = FundingBank(_fundingBankAddress);
    }

    function registerProject (address _projectAddress, string memory _projectName, uint256 _requiredFunds) public {
        numberOfProjects += 1;
        projectInfo memory info;
        address[] memory investor = new address[](0);
        bool[] memory approval = new bool[](1);
        info = projectInfo(numberOfProjects, _projectName, _requiredFunds, 0, investor, approval);
        projects[_projectAddress] = info;
        emit projectRegistered(_projectAddress, _projectName, _requiredFunds);
    }

    function invest (address _projectAddress, uint256 _amount) public payable {
        if(investedinProject[_projectAddress][msg.sender] > 0) {
            projects[_projectAddress].totalFunds += _amount;
        }
        else {
            projects[_projectAddress].totalFunds += _amount;
            investedinProject[_projectAddress][msg.sender] = _amount;
            projects[_projectAddress].investors.push(msg.sender);
        }
        // payable(address(Bank)).transfer(msg.value);
        emit amountInvestedInProject(_projectAddress, msg.sender, _amount);
    }

    function getInvestors(address _projectAddress) public view returns (address[] memory) {
        return projects[_projectAddress].investors;
    }

    function retrieveMoney(address _projectAddress) public {
        require(projects[_projectAddress].id==0, "Unable to retrieve, project still running");
        Bank.returnMoney(msg.sender, investedinProject[_projectAddress][msg.sender]);
    }

    function approveFunding(address _projectAddress) public {
        require(investedinProject[_projectAddress][msg.sender] > 0, "You are not allowed to Vote");
        projects[_projectAddress].approvals.push(true); 
        if(projects[_projectAddress].totalFunds >= projects[_projectAddress].requiredFunds) {
            // Condition is to release the funds when totalfunds reach requriedFunds and more than half of the investors approve.
            Bank.releaseFunding(_projectAddress, projects[_projectAddress].totalFunds);
        }
    }

    function releaseFunding(address _projectAddress) public projectOwnerOnly(_projectAddress) {
        require(projects[_projectAddress].totalFunds >= projects[_projectAddress].requiredFunds, "Total Funds are less than required, Funding cannot be released.");
            // Condition is to release the funds when totalfunds reach requriedFunds and more than half of the investors approve.
        Bank.releaseFunding(_projectAddress, projects[_projectAddress].totalFunds);
        emit fundingReleased(_projectAddress);
    }

    // function getProjectTotalFunding(address _projectAddress) public view returns (uint256) {
    //     return projects[_projectAddress].totalFunds;
    // }
    //  && (projects[_projectAddress].approvals.length > (projects[_projectAddress].investors.length/2
}