import React from 'react';

const NavBar: React.FC = () => {
	return (
		<nav className="bg-purple-600 p-4 flex items-center justify-between">
			<div className="flex items-center space-x-4">
				<img src="logo.png" alt="Organizze" className="h-8" />
				<a href="#" className="text-white text-lg">visão geral</a>
				<a href="#" className="text-white text-lg">lançamentos</a>
				<a href="#" className="text-white text-lg">relatórios</a>
				<a href="#" className="text-white text-lg">limite de gastos</a>
			</div>
			<div className="flex items-center space-x-4">
				<button className="text-white">
					<i className="fas fa-cog"></i>
				</button>
				<button className="text-white">
					<i className="fas fa-bell"></i>
				</button>
				<button className="text-white rounded-full bg-purple-700 p-2">
					<i className="fas fa-user"></i>
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
