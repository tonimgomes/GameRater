import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import './Jogos.css';
import React, { useEffect, useState, useContext } from 'react';
import { getGames, getGamesByPlatform } from '../../services/gameService'; // Importe a função getGames do arquivo api.js
import Modal from 'react-modal';
import { PlatformContext } from '../../contexts/platformContext';
import xboxLogo from '../../imagens/xboxbranco.png';
import playstationLogo from '../../imagens/playbranco.png';
import windowsLogo from '../../imagens/windowsbranco.png';
import androidLogo from '../../imagens/androidbranco.png';
import macLogo from '../../imagens/macOsbranco.png';
import linux from '../../imagens/linuxBranco.png';
import nintendo from '../../imagens/nintendoBranco.png';


Modal.setAppElement('#root');

const GameList = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { selectedPlatform } = useContext(PlatformContext);
  const [searchType, setSearchType] = useState('title'); // Inicia a pesquisa por título
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null); 

  useEffect(() => {
    if (selectedPlatform != 'all' && selectedPlatform != '') {
      getGamesByPlatform(selectedPlatform)
        .then(response => {
          setGames(response);
        })
        .catch(error => {
          console.error('Erro ao obter os jogos:', error);
        });
    } else if (searchTerm) {
      // Se o termo de pesquisa estiver preenchido, faz a pesquisa pelo tipo selecionado
      getGames()
        .then(response => {
          const filteredGames = response.data.filter(game => {
            if (searchType === 'title') {
              return game.title.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchType === 'developer') {
              return game.developer.some(dev => dev.toLowerCase().includes(searchTerm.toLowerCase()));
            } else if (searchType === 'genre') {
              return game.genre.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            return false;
          });
          setGames(filteredGames);
        })
        .catch(error => {
          console.error('Erro ao obter os jogos:', error);
        });
    } else {
      getGames()
        .then(response => {
          setGames(response.data);
        })
        .catch(error => {
          console.error('Erro ao obter os jogos:', error);
        });
    }
  }, [selectedPlatform, searchType, searchTerm]);

  const openModal = (game) => {
    setSelectedGame(game);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedGame(null);
    setModalIsOpen(false);
  };

  const handleCardMouseEnter = (gameId) => {
    setHoveredCard(gameId);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div>
      <h1>Lista de Jogos</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Digite o termo de pesquisa..."
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="title">Título</option>
          <option value="developer">Desenvolvedor</option>
          <option value="genre">Gênero</option>
        </select>
        <button onClick={() => setSearchTerm('')}>Limpar</button>
      </div>
      <div className="game-cards">
        {games.map(game => (
          <div 
            key={game._id} 
            className={`game-card ${hoveredCard === game._id ? 'hovered' : ''}`} 
            onMouseEnter={() => handleCardMouseEnter(game._id)}
            onMouseLeave={handleCardMouseLeave}>
            <img src={game.imgPath} alt={game.title} />
            <h3><Link to={`/games/${game._id}`}>{game.title}</Link></h3>
            
            <div className= {`game-info-hidden ${hoveredCard === game._id ? 'hovered' : ''}`}>
              <div className= {`game-info`}>
              <p>
                <span>Desenvolvedores:</span>
                <span>{game.developer.join(', ')}</span>
              </p>
              
                  <p>
                    <span>Gêneros:</span>
                    <span>{game.genre.join(', ')}</span>
                  </p>
              </div>
              <p>
                <span className={`j-platform-container-consoles`}>Consoles:</span>
                <div className={`j-platform-container`}>
                  {game.type.includes('PlayStation 5') || game.type.includes('PlayStation 4') || game.type.includes('PlayStation 3') || game.type.includes('PlayStation 2') ? (
                    <img src={playstationLogo} alt="PlayStation" className="platform-logo" />
                    ) : null}
                  {game.type.includes('Xbox One') || game.type.includes('Xbox Series S/X') || game.type.includes('Xbox 360') || game.type.includes('Xbox') ? (
                    <img src={xboxLogo} alt="Xbox" className="platform-logo" />
                    ) : null}
                  {game.type.includes('PC') ? (
                    <img src={windowsLogo} alt="PC" className="platform-logo" />
                  ) : null}
                  {game.type.includes('Android') ? (
                    <img src={androidLogo} alt="Android" className="platform-logo" />
                    ) : null}
                  {game.type.includes('macOS') || game.type.includes('iOS') ? (
                    <img src={macLogo} alt="macOS" className="platform-logo" />
                    ) : null}
                  {game.type.includes('Linux') ? (
                    <img src={linux} alt="linux" className="platform-logo" />
                    ) : null}
                  {game.type.includes('Nintendo Switch') || game.type.includes('Nintendo 3DS') || game.type.includes('Wii U')? (
                    <img src={nintendo} alt="nitnedoLogo" className="platform-logo-nintendo" />
                    ) : null}
                </div>
              </p>
              <Link to={`/games/${game._id}/reviews`} className="summary-button">
                Reviews <BsFillArrowRightCircleFill />
              </Link>
            </div>
            <p className="rating">Rating: {game.rating}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedGame && (
          <>
            <h2>{selectedGame.title}</h2>
            <p>{selectedGame.summary}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default GameList;