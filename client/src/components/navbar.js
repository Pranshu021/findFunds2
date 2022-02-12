import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = (props) => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ps-3 sticky-top">
            <Link to="/" className="links"><a className="navbar-brand" href="#"><span className="f-navbar-symbol">f</span>ind<span className="f-navbar-symbol">F</span>unds</a></Link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav d-flex ms-auto pe-3">
                        <li className="nav-item mr-auto">
                            <small className='accountAddress'>Account : {props.blockchainDetails.account}</small>
                        </li>
                </ul>
            </div>    
        </nav>
    )
}

export default Navbar;