import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
	return (
		<div className="w-1/4 bg-gray-100 p-4 rounded shadow-md">
			<ul className="space-y-4">
				<li>
					<Link to="/categories" className="cursor-pointer">Categorias</Link>
				</li>
				<li>
					<Link to="/bank-accounts" className="cursor-pointer">Contas</Link>
				</li>
				<li>
					<Link to="/credit-cards" className="cursor-pointer">Cartões de crédito</Link>
				</li>
				{/* <li>
					<Link to="/preferences" className="cursor-pointer">Preferências</Link>
				</li> */}
				{/* <li>
					<Link to="/plans" className="cursor-pointer">Plano</Link>
				</li> */}
				<li>
					<Link to="/tags" className="cursor-pointer">Tags</Link>
				</li>
				{/* <li>
					<Link to="/alerts" className="cursor-pointer">Alertas</Link>
				</li>
				<li>
					<Link to="/activities" className="cursor-pointer">Atividades</Link>
				</li> */}
			</ul>
		</div>
	);
};

export default Sidebar;
