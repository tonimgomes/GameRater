import React from 'react'
import xbox from '../../imagens/xbox.png'
import pl from '../../imagens/playstation.png'
import nswitch from '../../imagens/switch.png'
import pc from '../../imagens/windows.png'
import './Consoles.css'

function Consoles(){
    return(
        <div className="principal">
            <div>
                <h1 className="titulo-consoles">Selecione uma plataforma:</h1>
            </div>

            <div className="divConsoles">
                <div className="logo-consoles" id='xbox'>
                    <img src={xbox} alt="XBox"/>
                </div>

                <div className="logo-consoles" id='play' >
                    <img src={pl} alt="Playstation"/>
                </div>

                <div className="logo-consoles" id='switch'>
                    <img src={nswitch} alt="Switch"/>
                </div>

                <div className="logo-consoles" id='pc'>
                    <img src={pc} alt="Windows"/>
                </div>
            </div>
        </div>
    )
}

export default Consoles