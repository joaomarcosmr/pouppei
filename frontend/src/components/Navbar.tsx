import React from 'react';
import { Link } from 'react-router-dom';
import PouppeiLogo from '../assets/pouppei.jpg';

const NavBar: React.FC = () => {
	return (
		<nav className="bg-purple-600 p-4 flex justify-center">
			<div className="flex items-center justify-between w-full max-w-6xl">
				<img src={PouppeiLogo} alt="Pouppei" className="h-14" />
				<div className="flex items-center space-x-4">
					<Link to="/" className="text-white text-lg">visão geral</Link>
					<Link to="/" className="text-white text-lg">lançamentos</Link>
					<Link to="/reports" className="text-white text-lg">relatórios</Link>
					<Link to="/spending-limit" className="text-white text-lg">limite de gastos</Link>
				</div>
				<div className="flex items-center space-x-4">
					<Link to="/categories">
						<button className="text-white">
							<i className="fas fa-cog"></i>
						</button>
					</Link>
					<button className="text-white">
						<i className="fas fa-bell"></i>
					</button>
					<button className="text-white rounded-full bg-purple-700 p-2">
						<i className="fas fa-user"></i>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
