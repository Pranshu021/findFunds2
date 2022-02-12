import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import '../css/project.css';
import {useNavigate} from 'react-router-dom';


const Project = (props) => {
    let [projectInfo, setProjectInfo] = useState({});
    const params = useParams();
    const id = params.id;
    const navigate= useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/projects/'+id).then((res) => {
            return res.json();
        }).then((data) => {
            setProjectInfo(data);
            
        })
    }, [params]);

    return(
    <div className="container-fluid project-container text-center">
        <div className="row heading-row">
            <div className="col-lg-12">
                <h2>{projectInfo.projectName}</h2>
                <p>Required Amount : {projectInfo.requiredAmount} ETH</p>
                <p>Funds Acquired : {projectInfo.totalAmountfunded} ETH</p>
                <p>Total Investors : {projectInfo.totalInvestors}</p>

            </div>
        </div>

        <div className="row mt-5">
            <div className="col-lg-12">
                <p>{projectInfo.description}</p>
            </div>
        </div>
        
        <div className="row project-buttons-row mt-3">
            <button className="btn btn-block btn-success project-buttons" onClick={() => navigate(`/invest/${projectInfo.projectAddress}`)}>Invest</button>
        </div>

        {/* <div className="row project-buttons-row mt-3">
            <button className="btn btn-block btn-danger project-buttons" onClick={() => props.approveFundingFunction(projectInfo.projectAddress)}>Approve Funding</button>
        </div> */}

        {projectInfo.projectAddress === props.blockchainDetails.account ? <div className="row project-buttons-row mt-3">
            <button className="btn btn-block btn-danger project-buttons" onClick={() => props.releaseFundingFunction(projectInfo.projectAddress)}>Release Funding</button>
        </div> : null}
        
    </div>
    )
}

export default Project;