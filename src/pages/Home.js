import React from "react";
import {Link} from "react-router-dom";
import ilustration from "../images/home.svg";
import '../style/home.css';

function Home(){
    return(
        <div className='home-section'>
            <div className='description'>
                <h1>Manage your time</h1>
                <p>Orgnise your work or you daily tasks by creating a to do list, to help be effecient with your special time.</p>
                <div className='buttons'>
                    <Link to='/signup'><button className='signup-button'>Sign Up</button></Link>
                    <Link to='/login'><button className='login-button'>Log in</button></Link>
                </div>
            </div>
            <img src={ilustration} alt='ilust'/>
        </div>
    )
}

export default Home;