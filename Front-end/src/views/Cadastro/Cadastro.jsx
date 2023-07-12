import {Link} from "react-router-dom";
import {set, useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cadastro } from '../../services/userService';

import './Cadastro.css';

const schema = yup.object({
    username: yup.string().required('Usuário obrigatório'),
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().min(5,'Senha com no mínimo 5 caracteres').required(),
    passwordConf: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], 'As senhas devem coincidir!'),
}).required();

function Cadastro(){

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, control, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        try {
         await cadastro(data.username, data.email, data.password);
          alert('Usuário cadastrado com sucesso!');
        } catch (error) {
          console.error('Erro ao cadastrar usuário:', error);
          alert('Erro ao cadastrar usuário. Por favor, tente novamente mais tarde.');
        }
      };

    return(
        <div className='cadastro'>
            <form className='cadastroTela' onSubmit={handleSubmit(submit)} noValidate>
                <h1>Cadastrar</h1>   

                <label htmlFor="username">Usuário:</label>
                <input
                    type='text'
                    id='username'
                    placeholder="Usuário"
                    {...register('username')}
                />
                {errors.username?.message}

                <label htmlFor="email">Email:</label>
                <input
                    type='text'
                    id='email'
                    placeholder="Email"
                    {...register('email')}
                />
                {errors.email?.message}

                <label htmlFor='password'>Senha:</label>
                <input
                    type='password'
                    id="password" 
                    {...register('password')}
                />
                {errors.password?.message}

                <label htmlFor='passwordConf'>Confirmar Senha:</label>
                <input
                    type='password'
                    id="passwordConf" 
                    {...register('passwordConf')}
                />
                {errors.passwordConf?.message}

                <input type="submit" value="Cadastrar" className='submit'/>
            </form>
            <p>Já possui uma conta? <Link to='/login'>Entrar</Link></p>
        </div>
    )
}

export default Cadastro
