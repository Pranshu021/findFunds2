import React from 'react';
import '../css/home.css';
import {useNavigate} from 'react-router-dom';

const Home = (props) => {
    const navigate = useNavigate();

    return(
        <div className="container-fluid home-container">
            <div className="row main-row mt-5 p-5">
                <div className="col-md-12">
                    <h1 className="heading"><span className="f-symbol">f</span>ind<span className="f-symbol">F</span>unds</h1>
                    <p className="description">A Decentralized Crowd Funding Platform</p>
                   
                </div>
            </div>

            <div className="row home-buttons-row pt-5">
                <div className="col-lg-12">
                    <button class="btn home-buttons btn-block btn-success" onClick={() => navigate('/submitProject')}>Submit a Project</button>
                </div>
            </div>
            <div className="row home-buttons-row pt-3">         
                <div className="col-lg-12">
                    <button class="btn home-buttons btn-block btn-success" onClick={() => navigate('/browseProjects')}>Browse and Invest</button>
                </div>
            </div>  
        </div>
    )
}

export default Home;