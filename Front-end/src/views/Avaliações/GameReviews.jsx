import React, { useEffect, useState, useContext } from 'react';
import { getGameReviews, postGameReview, getUser } from '../../services/gameService'; // Importe as funções getGameReviews e postGameReview
//import { getUser } from '../../services/userService'; // Importe a função getUser
import { useAuth } from '../../contexts/useAuth'
import { useParams } from 'react-router-dom';
import './GameReviews.css'
import Modal from 'react-modal';

async function fetchUserNames(reviews, setUserNames) {
    try {
      const newNames = {};
      for (const review of reviews) {
        const userId = review.user_id;
        if (!newNames[userId]) {
          const user = await getUser(userId);
          newNames[userId] = user.name;
        }
      }
      setUserNames(newNames);
    } catch (error) {
      console.error('Erro ao obter nomes dos usuários:', error);
    }
  }

function GameReviews() {
    const { gameId } = useParams();
    const [reviews, setReviews] = useState([]);
    const user = useAuth(); // Usar o hook useAuth para obter o estado de autenticação, incluindo o userId
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const reviewsData = await getGameReviews(gameId);

                setReviews(reviewsData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [gameId]);

    const handleReviewSubmit = async (event) => {
        event.preventDefault(); // Impedir o comportamento padrão de envio do formulário

        const rating = event.target.elements.rating?.value;
        const comment = event.target.elements.comment?.value;

        try {
            // Enviar a nova avaliação para o backend
            const newReview = await postGameReview(gameId, rating, comment, user.id); // Use o userId obtido do contexto de autenticação

            // Atualizar a lista de avaliações exibidas no componente
            setReviews((prevReviews) => [...prevReviews, newReview]);
            event.target.reset();
        } catch (error) {
            console.error('Erro ao enviar a avaliação:', error);
        }
    };

    const [userNames, setUserNames] = useState({});

  useEffect(() => {
    fetchUserNames(reviews, setUserNames);
  }, [reviews]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {;
    setModalIsOpen(false);
  };

    return (
        <div className='Principal'>
            <h2>Deixe sua Opinião sobre o jogo</h2>
            <form className='formRating' onSubmit={handleReviewSubmit}>
                <div className='imgRating'>
                    <img src="https://cdn.ome.lt/HNSyBx0JwUHN90bSBvTlQ5BDcxE=/770x0/smart/uploads/conteudo/fotos/Google-Play-Games-Feature-Image-Light-Green.png" alt="imagem teste" />
                    <p>Nome do Jogo</p>
                </div>
                <div>
                    <label>Nota: </label>
                    <input type="number" min="1" max="10" required name="rating" />
                </div>
                <div>
                    <label>Comentário:</label>
                    <textarea required name="comment" />
                </div>
                <button className='submitRating' type="submit">Enviar Avaliação</button>
            </form>
                <button className="commentRating" onClick={() => openModal()}>
                  Visualizar Comentários
                </button>
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-content"
                overlayClassName="modal-overlay"
                >
                    <h2>Comentários</h2>
                {reviews.map((review) => (
                    <div key={review._id}>
                        <p>{userNames[review.user_id]} (Nota: {review.rate}): {review.comment} </p>
                    </div>
                ))}   
                </Modal>
        </div>
    );
}

export default GameReviews;