import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../css/invest.css';

const Invest = (props) => {
    const params = useParams();
    console.log("project address : " + params.projectAddress);
    const [projectInfo, setProjectInfo] = useState({});
    let projectdata;
    const [submissionState, setSubmissionState] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/projects').then((res) => {
            return res.json();
        }).then((data) => {
            projectdata = data.filter(project => project.projectAddress === params.projectAddress)[0];
            setProjectInfo(projectdata);
            console.log(projectdata);
        })
    }, []);

    return (
        <div className="container-fluid invest-form-container">
            <div className="row invest-form-row pt-5">
                <form className="form-inline invest-form" onSubmit={(event) => {
                    event.preventDefault();
                    let projectAddress = document.getElementById("projectAddress").value;
                    let amount = document.getElementById("amount").value;
                    let amountInEther = window.web3.utils.toWei(amount, 'ether');
                    console.log(amountInEther);
                    let totalAmountFunded = parseInt(projectInfo.totalAmountfunded) + parseInt(amount);
                    let totalInvestors;
                    let newInvestorArray;
                    if(!projectInfo.investors.includes(props.blockchainDetails.account)) {
                        totalInvestors = projectInfo.totalInvestors + 1;
                        newInvestorArray = projectInfo.investors.concat(props.blockchainDetails.account);
                    }
                    else {
                        newInvestorArray = projectInfo.investors;
                    }
                    props.investFunction(projectAddress, amountInEther, projectInfo.id, totalAmountFunded , totalInvestors, newInvestorArray);
                    setSubmissionState(true);
                }}>
                    <div className="row">
                        <div className="col-lg-4">
                            <label for="projectAddress">Project Address : </label>
                        </div>
                        <div className="col-lg-8">
                            <input type="text" className="form-control" id="projectAddress" placeholder="Project Address" value={params.projectAddress} readOnly/>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-4">
                            <label for="projectAddress">Amount in Ether: </label>
                        </div>
                        <div className="col-lg-8">
                            <input type="number" className="form-control" id="amount" placeholder="Amount" required/>
                        </div>    
                    </div>    

                    <div className="row mt-3">
                        <input type="submit" className="btn btn-block btn-outline-warning" value="Submit"></input>

                    </div>
                </form>
            </div>
            {submissionState && !props.blockchainDetails.loading ? <div className="alert alert-success text-center">Transaction Successful</div> : null}

        </div>
    )
}

export default Invest;