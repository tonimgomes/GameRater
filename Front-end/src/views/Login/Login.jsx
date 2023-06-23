import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/loginService';

import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const success = await login(username, password);
      if (success) {
        // Lógica de tratamento de login bem-sucedido (ex: redirecionamento para outra página)
        alert('Bem-vindo!');
      } else {
        // Lógica de tratamento de login inválido (ex: exibição de mensagem de erro)
        alert('Usuário ou senha inválidos.');
      }
    } catch (error) {
      // Lógica de tratamento de erro de login (ex: exibição de mensagem de erro)
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className='login'>
      <form className='loginTela' onSubmit={handleLogin}>
        <h1>Login</h1>
        <label>
          <input
            type='text'
            placeholder='Usuário'
            className='user'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type='password'
            placeholder='Senha'
            className='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <input type='submit' value='Login' className='submit' />
        <p>
          Não possui uma conta? <Link to='/cadastro'>Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
/*
import {Link} from "react-router-dom";

import './Login.css';

function Login(){

    function handleClick(event) {
        event.preventDefault();
        alert('Bem Vindo!');
    }

    return(
        <div className='login'>
            <form className='loginTela' onSubmit={handleClick}>
                <h1>Login</h1>
                <label>
                    <input type="text" placeholder='Usuário' className='user' required/>
                </label>
                <label>
                    <input type="password" placeholder='Senha' className='password' required /> 
                </label>
                <input type="submit" value="Login" className='submit'/>
                <p>Não possui uma conta? <Link to='/cadastro'>Cadastre-se</Link></p>
            </form>
        </div>
    )
}

export default Login
*/