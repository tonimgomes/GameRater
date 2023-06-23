import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './views/Home/Home.jsx'
import Consoles from './views/Consoles/Consoles.jsx'
import Login from './views/Login/Login.jsx'
import Cadastro from './views/Cadastro/Cadastro.jsx'
import Jogos from './views/Jogos/Jogos.jsx'


import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route path='/' element={<Home />}/>
					<Route path='/consoles' element={<Consoles />}/>
					<Route path='/login' element={<Login />}/>
					<Route path='/games' element={<Jogos />}/>
					<Route path='/cadastro' element={<Cadastro />}/>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
)