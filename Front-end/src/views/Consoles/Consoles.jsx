import React from 'react'
import xbox from '../../imagens/xbox.png'
import pl from '../../imagens/playstation.png'
import nswitch from '../../imagens/switch.png'
import pc from '../../imagens/windows.png'
import {Route, Link, useNavigate} from "react-router-dom";
import './Consoles.css'

function Consoles(){
    const navigate = useNavigate();

    function handleClickXbox() {
        navigate('/xbox');
    }

    function handleClickPlay() {
        navigate('/play');
    }

    function handleClickPc() {
        navigate('/pc');
    }

    function handleClickSwitch() {
        navigate('/switch');
    }

    return(
        <div className="principal">
            <div>
                <h1 className="titulo-consoles">Selecione uma plataforma:</h1>
            </div>

            <div className="divConsoles">
                <div className="logo-consoles" id='xbox' onClick={handleClickXbox}>
                    <img src={xbox} alt="XBox"/>
                </div>

                <div className="logo-consoles" id='play' onClick={handleClickPlay}>
                    <img src={pl} alt="Playstation"/>
                </div>

                <div className="logo-consoles" id='switch' onClick={handleClickSwitch}>
                    <img src={nswitch} alt="Switch"/>
                </div>

                <div className="logo-consoles" id='pc' onClick={handleClickPc}>
                    <img src={pc} alt="Windows"/>
                </div>
            </div>
        </div>
    )
}

export default Consoles