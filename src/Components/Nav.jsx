import './nav.css'
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';



function Nav() {
    const [logged, setLogged] = useState(false)
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.clear();
        setLogged(!logged);
        navigate('/')


    }
    return (
        <nav>
            <div className="nav-wrapper">
                <Link className='nav-heading'>College Diaries</Link>
                <MasterOrNot/>
                <LoginOrLogout handleLogout={handleLogout}/>
            </div>
        </nav>
    )
}



function LoginOrLogout({handleLogout}) {
    
    if (typeof localStorage.token != 'undefined') {
        // setLogged(true)
        const user = jwtDecode(localStorage.token);
        return (
            <div className="user-logged-in-items">
                <div className="user-name">{user.name}</div>
                <button className='nav-logout' onClick={handleLogout}>Log Out</button>
            </div>
        )
    } else {
        return (
            <div className="nav-buttons">
                <Link to="login"><button className='login-nav'>Log in</button></Link>
                <Link to="signup"><button className='signup-nav'>Sign up</button></Link>
            </div>
        )
    }
}


function MasterOrNot() {
    if (typeof localStorage.token != 'undefined') {
        const user = jwtDecode(localStorage.token);
        if (user.master == 'true') {
            return(
                <ul className='nav-links'>
                    <li className='blogs-nav'><Link className="link-blogs-nav" to="blogs">blogs</Link></li>
                    <li className='whoami-nav'> <Link className="link-whoami-nav" to="whoami">whoami</Link></li>
                    <li className="blog-create-nav"><Link className='link-blog-create-nav' to="write">write</Link></li>
                </ul>
            )
        } else {
            return(
                <ul className='nav-links'>
                    <li className='blogs-nav'><Link className="link-blogs-nav" to="blogs">blogs</Link></li>
                    <li className='whoami-nav'> <Link className="link-whoami-nav" to="whoami">whoami</Link></li>
                </ul>
            )
        }
    } else {
        return(
            <ul className='nav-links'>
                <li className='blogs-nav'><Link className="link-blogs-nav" to="blogs">blogs</Link></li>
                <li className='whoami-nav'> <Link className="link-whoami-nav" to="whoami">whoami</Link></li>
            </ul>
        )
    }
}


export default Nav;