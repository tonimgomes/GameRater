import {useState, useContext} from "react";
import {Route, Link, useNavigate} from "react-router-dom";
import {BiJoystick} from 'react-icons/bi';
import { useAuth } from '../contexts/useAuth'
import { PlatformContext } from '../contexts/platformContext'

import './Menu.css';

const Menu = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const { setSelectedPlatform } = useContext(PlatformContext);

    function handleClick() {
        navigate('/consoles');
    }
    function gamesClick() {
        navigate('/games');
        setSelectedPlatform('all');
    }
    function loginClick() {
        navigate('/login');
    }
    function logoutClick() {
        auth.logout();
        navigate('/login');
    }
    
    return(
        <>
            <nav className="menu">
                <div className="btnPrincipal">
                    <Link to='/' >
                        <BiJoystick/> GameRater
                    </Link>
                </div>

                <button className="btnConsoles" onClick={handleClick}>Consoles</button>
                <button className="btnJogos" onClick={gamesClick}>Jogos</button>

                {auth.username ? 
                (<>
                <span className="loggedInUser">Bem-vindo, {auth.username}!</span>
                <button className="btnLogout" onClick={logoutClick}>Logout</button>
                </>) :
                (<button className="btnLogin" onClick={loginClick}>Login</button>) 
                }
                
            </nav>
        </>
    )
}

export default Menu