import {useState} from "react";
import {Route, Link, useNavigate} from "react-router-dom";
import {BiJoystick} from 'react-icons/bi';

import './Menu.css';

const Menu = () => {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/consoles');
    }
    function gamesClick() {
        navigate('/games');
    }
    function loginClick() {
        navigate('/login');
    }
    
    return(
        <div>
            <nav className="menu">
                <h2 className="btnPrincipal">
                    <Link to='/' >
                        <BiJoystick/> GameRater
                    </Link>
                </h2>

                <button onClick={handleClick}>Consoles</button>
                <button onClick={gamesClick}>Jogos</button>
                <button onClick={loginClick}>Login</button>
                
            </nav>
        </div>
    )
}

export default Menu