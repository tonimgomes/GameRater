import React from 'react';
import bg from '../../imagens/logo.webp';
import './Home.css';
import img1 from '../../imagens/img1.jpg';
import img2 from '../../imagens/img2.jpg';

const Home = () => {
    return (
        <div className="wrapper">
            <div className="container">
                <div className="left-container">
                    <img src={bg} alt="Logo" className="logo" />
                    <h2 className="title">A voz dos gamers</h2>
                    <h1 className="title">GAME RATER</h1>
                    <p className="description">Sua plataforma confiável para descobrir os jogos mais emocionantes.</p>
                </div>
                <div className="right-container">
                    <div className="image-container">
                        <img src={img1} alt="Imagem 1" className="image" />
                        <img src={img2} alt="Imagem 2" className="image" />
                    </div>
                    <div className="slogan-container">
                        <p className="slogan-line">A</p>
                        <p className="slogan-line">VOZ</p>
                        <p className="slogan-line">DOS</p>
                        <p className="slogan-line">GAMERS</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
