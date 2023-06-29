import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './views/Home/Home.jsx'
import Consoles from './views/Consoles/Consoles.jsx'
import Login from './views/Login/Login.jsx'
import Cadastro from './views/Cadastro/Cadastro.jsx'
import Jogos from './views/Jogos/Jogos.jsx'
import Xbox from './views/Consoles/Plataformas/Xbox.jsx'
import Playstation from './views/Consoles/Plataformas/PlayStation.jsx'
import Switch from './views/Consoles/Plataformas/Switch.jsx'
import PC from './views/Consoles/Plataformas/PC.jsx'
import { AuthProvider } from './contexts/Auth';
import { Protected } from './components/Protected/Protected.jsx';


import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route path='/' element={<Home />}/>
					<Route path='/consoles' element={<Protected><Consoles /></Protected>}/>
					<Route path='/login' element={<Login />}/>
					<Route path='/xbox' element={<Xbox />}/>
					<Route path='/play' element={<Playstation />}/>
					<Route path='/switch' element={<Switch />}/>
					<Route path='/pc' element={<PC />}/>
					<Route path='/games' element={<Protected><Jogos /></Protected>}/>
					<Route path='/cadastro' element={<Cadastro />}/>
				</Route>
			</Routes>
		</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>,
)