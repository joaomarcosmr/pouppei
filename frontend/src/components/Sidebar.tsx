import React from 'react';

const Sidebar: React.FC = () => {
	return (
		<div className="w-1/4 bg-gray-100 p-4 rounded shadow-md">
			<ul className="space-y-4">
				<li className="cursor-pointer">Categorias</li>
				<li className="cursor-pointer">Contas</li>
				<li className="cursor-pointer">Cartões de crédito</li>
				<li className="cursor-pointer">Preferências</li>
				<li className="cursor-pointer">Plano</li>
				<li className="cursor-pointer">Tags</li>
				<li className="cursor-pointer">Alertas</li>
				<li className="cursor-pointer">Atividades</li>
			</ul>
		</div>
	);
};

export default Sidebar;
