import {Link} from "react-router-dom";

import './Cadastro.css';

function Cadastro(){

    function handleClick(event) {
        event.preventDefault();
        alert('Usuário cadastrado!');
    }

    return(
        <div className='cadastro'>
            <form className='cadastroTela' onSubmit={handleClick}>
                <h1>Cadastrar</h1>
                <label>
                    Usuário: <br />
                    <input type="text" placeholder='Usuário' className='user' required/>
                </label>
                <label>
                    Email: <br />
                    <input type="email" placeholder='email' className='email' required/>
                </label>
                <label>
                    Senha: <br />
                    <input type="password" placeholder='Senha' className='password' required /> 
                </label>
                <label>
                    Digite sua senha novamente: <br />
                    <input type="password" placeholder='Senha' className='password1' required /> 
                </label>
                <input type="submit" value="Cadastrar" className='submit'/>
                <p>Já possui uma conta? <Link to='/login'>Entrar</Link></p>
            </form>
        </div>
    )
}

export default Cadastro
