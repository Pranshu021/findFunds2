import React, {useState} from 'react';
import '../css/submitProject.css';

const SubmitProject = (props) => {

    const [submissionState, setSubmissionState] = useState(false);

    // const projectSubmissionHandler = (event) => {
    //     event.preventDefault();
    //     let projectAddress = document.getElementById("projectAddress").value.toString();
    //     let projectName = document.getElementById("projectName").value.toString();
    //     let requiredAmount = document.getElementById("requiredAmount").value.toString();
    //     requiredAmount = window.web3.utils.toWei(requiredAmount, 'ether');
    //     let description = document.getElementById("description").value;        
    // }


    return(
        <div className="container-fluid form-container">
            <div className="row main-form-row">
                <form className="form-inline submitProjectForm p-4 mt-5" onSubmit={(event) => {
                    event.preventDefault();
                    let projectAddress = document.getElementById("projectAddress").value.toString();
                    let projectName = document.getElementById("projectName").value.toString();
                    let requiredAmount = document.getElementById("requiredAmount").value.toString();
                    let requiredAmountinEthers = window.web3.utils.toWei(requiredAmount, 'ether');
                    let description = document.getElementById("projectDescription").value;
                    const projectData = {
                        projectAddress : projectAddress, 
                        projectName: projectName, 
                        requiredAmount: requiredAmount, 
                        description: description, 
                        totalAmountfunded: 0, 
                        totalInvestors: 0,
                        investors: []
                    }
                    fetch('http://localhost:8000/projects', {
                        method: 'POST',
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(projectData)
                    }).then(() => {
                        console.log("Project Submitted");
                        setSubmissionState(true);
                    })
                    props.submitProjectHandler(projectAddress, projectName, requiredAmountinEthers);
                    

                     
                }}>
                    <div className="row">
                        <h2>Project Submission</h2>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-4">
                            <label for="projectName" className="mr-sm-2">Project Address &nbsp;</label>
                        </div>
                        <div className="col-lg-8">
                            <input type="text" className="form-control" id="projectAddress" placeholder='Project Address' required></input>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-4">
                            <label for="projectName" className="mr-sm-2">Project Name &nbsp;</label>
                        </div>
                        <div className="col-lg-8">
                            <input type="text" className="form-control" id="projectName" placeholder='Project Name' required></input>
                        </div>
                    </div>


                    <div className="row mt-3">
                        <div className="col-lg-4">
                            <label for="projectName" className="mr-sm-2">Required Amount (ETH) &nbsp;</label>
                        </div>
                        <div className="col-lg-8">
                            <input type="number" className="form-control" id="requiredAmount" placeholder='Required Amount' required></input>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-4">
                            <label for="projectName" className="mr-sm-2">Description &nbsp;</label>
                        </div>
                        <div className="col-lg-8">
                            <textarea id="projectDescription" className="form-control" placeholder='Describe your Project ...' required></textarea>
                        </div>
                    </div>

                    <div className="row button-row mt-4">
                        <div className="col-lg-12">
                            <input type="submit" className="btn btn-block btn-outline-danger" value="Submit"></input>
                        </div>
                    </div>
                </form>
            </div>

            {submissionState && !props.blockchainDetails.loading ? <div className="alert alert-success">Your Project has been submitted Successfully!</div> : null}
            
        </div>
    )
}

export default SubmitProject;