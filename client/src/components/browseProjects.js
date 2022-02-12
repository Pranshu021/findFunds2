import React, {useEffect, useState} from 'react';
import '../css/browseProjects.css';
import {useNavigate} from 'react-router-dom';


const BrowseProjects = (props) => {
    const [projects, setProjectsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/projects')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setProjectsData(data);
        })
    }, [])

    

    const projectsList = projects.map((project) => {
        return (
            <div className="row project-list-row">
                <div className="col-lg-8">
                    <p>
                        Project Name : <b>{project.projectName}</b> <br />
                        {/* Project Description : <b>{project.description}</b> <br /> */}
                        Required Funds : <b>{project.requiredAmount} ETH</b> <br />
                        Total Amount Funded : <b>{project.totalAmountfunded} ETH</b> <br />
                        Project Address : <b>{project.projectAddress}</b> <br />
                        {/* Project Id : <b>{project.id}</b> */}
                    </p>
                </div>

                <div className="col-lg-4">
                    <button className="btn invest-button btn-outline-danger" onClick={() => navigate(`/invest/${project.projectAddress}`)}>Invest</button>
                    <button className="btn invest-button btn-outline-danger mt-4" onClick={() => navigate(`/project/${project.id}`)}>More Info</button>
                </div>
            </div>
        )
    })



    return(
        <div className="contianer-fluid browseProjects-container">
            <div className="row text-center p-3">
                <h1 className="heading">Projects</h1>
            </div>
            {projectsList ? projectsList : <p>Loading...</p>}
        </div>
    )

}

export default BrowseProjects;