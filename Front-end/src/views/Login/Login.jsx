import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/userService';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import './Login.css';

const schema = yup.object({
  username: yup.string().required('Usuário obrigatório'),
  password: yup.string().min(5,'Senha com no mínimo 5 caracteres').required(),
}).required();

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const { username, password } = data;
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
      <form className='loginTela' onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>

        <label htmlFor="username">Usuário</label>
        <input
          type='text'
          id='username'
          placeholder='Usuário'
          {...register('username')}
        />
        {errors.username?.message}

        <label htmlFor='password'>Senha</label>
        <input
          type='password'
          id='password'
          placeholder='Senha'
          {...register('password')}
        />
        {errors.password?.message}

        <input type='submit' value='Login' className='submit' />
      </form>
      <p>
        Não possui uma conta? <Link to='/cadastro'>Cadastre-se</Link>
      </p>
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