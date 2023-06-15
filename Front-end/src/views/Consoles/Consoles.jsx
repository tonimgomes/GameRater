import React from 'react'
import './Consoles.css'

function Consoles(){
    return(
        <>
            <div >
                <h1 class="titulo-consoles">Selecione uma plataforma:</h1>
            </div>

            <div class="games-container">
                <div class="console-container" id='xbox'>
                    <button class="titulo-consoles">Xbox</button>
                </div>

                <div class="console-container" id='play' >
                    <button class="titulo-consoles">PlayStation</button>
                </div>

                <div class="console-container" id='switch'>
                    <button class="titulo-consoles">Switch</button>
                </div>

                <div class="console-container" id='pc'>
                    <button class="titulo-consoles">PC</button>
                </div>
                
            </div>
        </>
    )
}

export default Consoles