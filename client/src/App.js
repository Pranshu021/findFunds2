import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import SubmitProject from './components/submitProject';
import BrowseProjects from './components/browseProjects';
import Project from './components/Project';
import Invest from './components/Invest';
import Web3 from 'web3';
import CrowdFunding from './contracts/CrowdFunding.json'
import FundingBank from './contracts/FundingBank.json'


const App = (props) => {

    const [blockchainDetails, setBlockchainDetails] = useState({
        // Good old useState hook :)
        account : "0x0",
        crowdFundingContract : {},
        crowdFundingContractAddress : '',
        fundingBankContract : {},
        fundingBankContractAddress : '',
        loading: true
    });

    const loadWeb3 = async () => {
        // Engine function. will load metamask. Read about them and don't forget next time Mr. Copy paste.
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert("Provider not Installed");
        }
    }

    const loadBlockchainData = async () => {
        // Updating the state and throwing everywhere possible.
        const web3 = window.web3;
        const user_account = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const fundingBankContractloader = await loadFundingBankContract(web3, networkId);
        const crowdFundingContractloader = await loadCrowdFundingContract(web3, networkId);
        
        setBlockchainDetails({
            account : user_account[0],
            crowdFundingContract : crowdFundingContractloader.crowdFundingContractInstance,
            crowdFundingContractAddress : crowdFundingContractloader.crowdFundingData.address,
            fundingBankContract : fundingBankContractloader.fundingBankContractInstance,
            fundingBankContractAddress : fundingBankContractloader.fundingBankData.address,
        });
    }

    const loadFundingBankContract = async(web3, networkId) => {
        // loading the bank Contract
        const fundingBankContractData = await FundingBank.networks[networkId];
        if(fundingBankContractData) {
            const fundingBankContractInstance = new web3.eth.Contract(FundingBank.abi, fundingBankContractData.address);
            return {fundingBankContractInstance : fundingBankContractInstance, fundingBankData : fundingBankContractData};
        }
    }

    const loadCrowdFundingContract = async(web3, networkId) => {
        // loading crowdFundingContract
        const crowdFundingContractData = await CrowdFunding.networks[networkId];
        if(crowdFundingContractData) {
            const crowdFundingContractInstance = new web3.eth.Contract(CrowdFunding.abi, crowdFundingContractData.address);
            return {crowdFundingContractInstance : crowdFundingContractInstance, crowdFundingData : crowdFundingContractData};
        }
    }

    const submitProject = (projectAddress, projectName, requiredAmount) => {
        // Simple function to submit project to blockchain
        setBlockchainDetails({...blockchainDetails, loading: true});
        blockchainDetails.crowdFundingContract.methods.registerProject(projectAddress, projectName, requiredAmount).send({from: blockchainDetails.account}).on('transactionHash', (hash) => {
            setBlockchainDetails({...blockchainDetails, loading: false});
        })
    }

    const investInProject = (projectAddress, amount, projectId, totalAmount, totalInvestors, newInvestorArray) => {
        // This function is so stupidly frustrating, take care of it when u feel fresh!!
        window.web3.eth.sendTransaction({
            from: blockchainDetails.account,
            to: blockchainDetails.fundingBankContractAddress,
            value: amount
        }).then((tx) => {
            console.log("Transaction : " + tx);
        })
        setBlockchainDetails({...blockchainDetails, loading: true});
        blockchainDetails.crowdFundingContract.methods.invest(projectAddress, amount).send({from:blockchainDetails.account}).on('transactionHash', (hash) => {
            fetch('http://localhost:8000/projects/' + projectId, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                    totalAmountfunded : totalAmount,
                    totalInvestors : totalInvestors,
                    investors: newInvestorArray,
                })
            }).then((response => {
                if(response.status == 200) {
                    setBlockchainDetails({...blockchainDetails, loading: false});
                }
            }))
        })
    }

    const approveFunding = (projectAddress) => {
        // Didn't work, will troubleshoot later - Voting functionality. Something wrong with blockchain call :"(
        setBlockchainDetails({...blockchainDetails, loading: true});
        blockchainDetails.crowdFundingContract.methods.approveFunding(projectAddress).send({from:blockchainDetails.account}).on('transactionHash', (hash) => {
            setBlockchainDetails({...blockchainDetails, loading: false});
        })
    }

    const releaseFunding = (projectAddress) => {
        // Saviour function, will release funds. Moneyyyy <3
        setBlockchainDetails({...blockchainDetails, loading: true});
        blockchainDetails.crowdFundingContract.methods.releaseFunding(projectAddress).send({from:blockchainDetails.account}).on('transactionHash', (hash) => {
            setBlockchainDetails({...blockchainDetails, loading: false});
        })
    }

    useEffect(() => {
        loadWeb3();
        loadBlockchainData();
    }, [])

    return (
        <Router>
            <div className="App">
                <Navbar blockchainDetails={blockchainDetails}/>
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route path="/submitProject" element={<SubmitProject blockchainDetails={blockchainDetails} submitProjectHandler={submitProject}/>} />
                    <Route path="/browseProjects" element={<BrowseProjects blockchainDetails={blockchainDetails}/>} />
                    <Route path="/invest/:projectAddress" element = {<Invest blockchainDetails={blockchainDetails} investFunction={investInProject}/>} />
                    <Route exact path="/project/:id" element = {<Project blockchainDetails={blockchainDetails} approveFundingFunction={approveFunding} releaseFundingFunction={releaseFunding}/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
