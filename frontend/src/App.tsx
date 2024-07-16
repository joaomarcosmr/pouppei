import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Categories from './pages/Categorias/Categorias';
import BankAccounts from './pages/BankAccounts/BankAccounts';
import Home from './pages/Home/Home';
import CreditCards from './pages/CreditCards/CreditCards';
import Tags from './pages/Tags/Tags';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App: React.FC = () => {
	const token = localStorage.getItem('token');

	return (
		<Router>
			<div className="App min-h-screen flex flex-col">
				{token && <NavBar />}
				<MainContent />
			</div>
		</Router>
	);
};

const MainContent: React.FC = () => {
	const location = useLocation();
	const token = localStorage.getItem('token');
	const showSidebar = ['/categories', '/bank-accounts', '/tags', '/credit-cards'].includes(location.pathname);

	if (!token) {
		return <Routes>
			<Route path="*" element={<Navigate to="/login" />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>;
	}

	return (
		<div className="flex flex-1 justify-center mt-8">
			{showSidebar && <Sidebar />}
			<div className={`flex-1 p-4 ${showSidebar ? 'max-w-4xl' : 'max-w-6xl'}`}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/bank-accounts" element={<BankAccounts />} />
					<Route path="/credit-cards" element={<CreditCards />} />
					<Route path="/tags" element={<Tags />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
