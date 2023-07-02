import React from 'react';
import xbox from '../../imagens/xbox.png';
import playstation from '../../imagens/playstation.png';
import nintendo from '../../imagens/Nintendo.jpg';
import pc from '../../imagens/windows.png';
import { Route, Link, useNavigate } from 'react-router-dom';
import './Consoles.css';
import { useContext } from 'react';
import { PlatformContext } from '../../contexts/platformContext';

function Consoles() {
    const navigate = useNavigate();
    const { setSelectedPlatform } = useContext(PlatformContext);

    function handleClick(platform) {
        setSelectedPlatform(platform);
        navigate('/games');
    }

    const platforms = [
        {
            name: 'Xbox',
            image: xbox,
            consoles: ['Xbox 360', 'Xbox One', 'Xbox Series S/X'],
        },
        {
            name: 'PlayStation',
            image: playstation,
            consoles: ['PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'PS Vita'],
        },
        {
            name: 'Nintendo',
            image: nintendo,
            consoles: ['Nintendo Switch', 'Nintendo 3DS', 'Wii U'],
        },
        {
            name: 'PC',
            image: pc,
            consoles: ['PC'],
        },
    ];

    return (
        <div className="principal">
            <div>
                <h1 className="titulo-consoles">Selecione uma plataforma:</h1>
            </div>

            <div className="divConsoles">
                {platforms.map((platform) => (
                    <div className="platform-container" key={platform.name}>
                        <div className="logo-consoles">
                            <img src={platform.image} alt={platform.name} />
                        </div>
                        <div className="consoles-list">
                            {platform.consoles.map((console) => (
                                <div
                                    className="console-item"
                                    key={console}
                                    onClick={() => handleClick(console)}
                                >
                                    {console}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Consoles;

/*
import React from 'react'
import xbox from '../../imagens/xbox.png'
import pl from '../../imagens/playstation.png'
import nswitch from '../../imagens/switch.png'
import pc from '../../imagens/windows.png'
import {Route, Link, useNavigate} from "react-router-dom";
import './Consoles.css'
import { useContext } from 'react';
import { PlatformContext } from '../../contexts/platformContext'

function Consoles() {
    const navigate = useNavigate();
    const { setSelectedPlatform } = useContext(PlatformContext);

    function handleClick(platform) {
        setSelectedPlatform(platform);
        navigate('/games');
    }

    return (
        <div className="principal">
            <div>
                <h1 className="titulo-consoles">Selecione uma plataforma:</h1>
            </div>

            <div className="divConsoles">
                <div className="logo-consoles" id='xbox' onClick={() => handleClick('Xbox One')}>
                    <img src={xbox} alt="XBox" />
                </div>

                <div className="logo-consoles" id='play' onClick={() => handleClick('PlayStation 5')}>
                    <img src={pl} alt="Playstation" />
                </div>

                <div className="logo-consoles" id='switch' onClick={() => handleClick('Nintendo Switch')}>
                    <img src={nswitch} alt="Switch" />
                </div>

                <div className="logo-consoles" id='pc' onClick={() => handleClick('PC')}>
                    <img src={pc} alt="Windows" />
                </div>
            </div>
        </div>
    )
}

export default Consoles*/