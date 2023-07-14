import { useContext, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlatformContext } from '../../contexts/platformContext';

import xbox from '../../imagens/xbox.png';
import playstation from '../../imagens/playstation.png';
import nintendo from '../../imagens/Nintendo.jpg';
import pc from '../../imagens/computer.png';
import mobile from '../../imagens/celular.png';

import './Consoles.css';

const Consoles = () => {
    const navigate = useNavigate();
    const { setSelectedPlatform } = useContext(PlatformContext);

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
            consoles: ['PC', 'macOS', 'Linux'],
        },
        {
            name: 'Mobile',
            image: mobile,
            consoles: ['iOS', 'Android'],
        },
    ];

    function handleClick(platform) {
        setSelectedPlatform(platform);
        navigate('/games');
    }

    return (
        <div className="principal">
            <h1 className="titulo-consoles">Selecione uma plataforma:</h1>

            <div className="divConsoles">
                {platforms.map((platform) => (
                    <div className="platform-container" key={platform.name}>
                        <div className="logo-consoles">
                            <img
                                src={platform.image}
                                alt={platform.name}
                            />
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