import { Link } from "react-router-dom";

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
  const [searchTerm, setSearchTerm] = useState(''); // Inicia o termo de pesquisa vazio

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
          <div key={game._id} className="game-card">
            <img src={game.imgPath} alt={game.title} />
            <h3><Link to={`/games/${game._id}/reviews`}>{game.title}</Link></h3>
            <button className="summary-button" onClick={() => openModal(game)}>
              Ver Resumo
            </button>
            <div className="game-info">
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
              <span>Consoles:</span>
              <div className="platform-container">
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

/*
import { Link } from "react-router-dom";

import './Jogos.css';
import React, { useEffect, useState, useContext } from 'react';
import { getGames, getGamesByPlatform } from '../../services/gameService'; // Importe a função getGames do arquivo api.js
import Modal from 'react-modal';
import { PlatformContext } from '../../contexts/platformContext';

Modal.setAppElement('#root');

const GameList = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { selectedPlatform } = useContext(PlatformContext);
  const [searchType, setSearchType] = useState('title'); // Inicia a pesquisa por título
  const [searchTerm, setSearchTerm] = useState(''); // Inicia o termo de pesquisa vazio

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
      <table className="game-table">
        <thead>
          <tr>
            <th>Capa</th>
            <th>Título</th>
            <th>Resumo</th>
            <th>Desenvolvedor</th>
            <th>Console</th>
            <th>Gênero</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game._id}>
              <td><img src={game.imgPath} alt={game.title} className="game-image" /></td>
              <td>
                <Link to={`/games/${game._id}/reviews`}>{game.title}</Link>
              </td>
              <td>
                <button className="summary-button" onClick={() => openModal(game)}>
                  Ver Resumo
                </button>
              </td>
              <td>{game.developer.join(', ')}</td>
              <td>{game.type.join(', ')}</td>
              <td>{game.genre.join(', ')}</td>
              <td>{game.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

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


export default GameList;*/