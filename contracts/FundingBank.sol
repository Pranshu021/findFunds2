// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract FundingBank {
    mapping(address => uint256) project_funding;
    address owner;
    uint256 totalFundingAmount;

    constructor () {
        owner == msg.sender;
    }

    event fundingReleased(address _projectAddress, uint256 _amount);

    receive() external payable {}

    function releaseFunding(address _projectAddress, uint256 _amount) public {
        payable(_projectAddress).transfer(_amount);
        emit fundingReleased(_projectAddress, _amount);
    }

    function getTotalFunding() public view returns (uint256) {
        return address(this).balance;
    }

    function returnMoney(address _projectAddress, uint256 _amount) external{
        payable(_projectAddress).transfer(_amount);
    }


}
