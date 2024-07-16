import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Categories from './pages/Categorias/Categorias';
import BankAccounts from './pages/BankAccounts/BankAccounts';
import Home from './pages/Home/Home';

const App: React.FC = () => {
	return (
		<Router>
			<div className="App min-h-screen flex flex-col">
				<NavBar />
				<MainContent />
			</div>
		</Router>
	);
};

const MainContent: React.FC = () => {
	const location = useLocation();
	const showSidebar = ['/categories', '/bank-accounts', '/tags'].includes(location.pathname);

	return (
		<div className="flex flex-1 justify-center mt-8">
			{showSidebar && <Sidebar />}
			<div className={`flex-1 p-4 ${showSidebar ? 'max-w-4xl' : 'max-w-6xl'}`}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/bank-accounts" element={<BankAccounts />} />
					{/* Add more routes here */}
				</Routes>
			</div>
		</div>
	);
};

export default App;
