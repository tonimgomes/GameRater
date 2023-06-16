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