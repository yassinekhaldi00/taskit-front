import React from "react";
import {Link} from "react-router-dom";
import ilustration from "../images/home.svg";
import '../style/home.css';
import github from '../images/github.png';
import linkedin from '../images/linkedin.svg';
import gmail from '../images/gmail.svg';

function Home(){
    return(
        <div>
            <div className='home-section'>
                <div className='description'>
                    <h1>Manage your time</h1>
                    <p>Organise your work or your daily tasks by creating a to do list, that you can share with your friends or co-workers.</p>
                    <div className='buttons'>
                        <Link to='/signup'><button className='signup-button'>Sign Up</button></Link>
                        <Link to='/login'><button className='login-button'>Log in</button></Link>
                    </div>
                </div>
                <img src={ilustration} alt='ilust'/>
            </div>
            <footer className="home-footer">
                <a href="https://github.com/yassinekhaldi00" target="_blank"><img src= {github} alt="github"/></a>
                <a href="https://www.linkedin.com/in/yassine-khaldi/" target="_blank"><img src= {linkedin} alt="linkedin"/></a>
                <a href="mailto: yassinekhaldi00@gmail.com" target="_blank"><img src= {gmail} alt="gmail"/></a>
            </footer>
        </div>
    )
}

export default Home;