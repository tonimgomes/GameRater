import {Link} from "react-router-dom";

import '../../Jogos/Jogos.css';
import React, { useEffect, useState } from 'react';
import {getGamesByPlatform} from '../../../services/gameService'; // Importe a função getGames do arquivo api.js
import Modal from 'react-modal';

Modal.setAppElement('#root');

const GameListXbox = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getGamesByPlatform('Nintendo Switch')
      .then(response => {
        setGames(response);
      })
      .catch(error => {
        console.error('Erro ao obter os jogos:', error);
      });
  }, []);

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
              <td>{game.title}</td>
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
  

export default GameListXbox;