import React from 'react';

const Home: React.FC = () => {
	const transactions = [
		{ id: 1, description: 'Supermercado', amount: -150, category: 'Compras' },
		{ id: 2, description: 'Restaurante', amount: -75, category: 'Alimentação' },
		{ id: 3, description: 'Cinema', amount: -30, category: 'Lazer' },
		{ id: 4, description: 'Salário', amount: 5000, category: 'Receita' },
		{ id: 5, description: 'Gasolina', amount: -200, category: 'Transporte' },
	];

	return (
		<div className="flex flex-col w-full max-w-6xl p-8 bg-white rounded shadow-md mx-auto min-h-full">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div className="col-span-1 lg:col-span-2 bg-gray-100 p-4 rounded shadow">
					<div className="flex justify-between items-center">
						<div>
							<h2 className="text-lg font-bold">Boa noite, João! 🌙</h2>
							<div className="flex space-x-4 mt-2">
								<div className="bg-white p-2 rounded shadow flex-1">
									<p className="text-green-500">Receita mensal</p>
									<p className="text-green-500 font-bold">R$ 0,00</p>
								</div>
								<div className="bg-white p-2 rounded shadow flex-1">
									<p className="text-red-500">Despesa mensal</p>
									<p className="text-red-500 font-bold">R$ 85,00</p>
								</div>
							</div>
						</div>
						<button className="bg-white p-2 rounded shadow">Ver relatórios</button>
					</div>
				</div>
				<div className="col-span-1 lg:col-span-1 bg-gray-100 p-4 rounded shadow">
					<h2 className="text-lg font-bold">Acesso rápido</h2>
					<div className="flex space-x-2 mt-2">
						<button className="bg-red-500 text-white p-2 rounded">DESPESA</button>
						<button className="bg-green-500 text-white p-2 rounded">RECEITA</button>
						<button className="bg-gray-500 text-white p-2 rounded">TRANSF.</button>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
				<div className="col-span-1 bg-gray-100 p-4 rounded shadow">
					<h2 className="text-lg font-bold">Saldo geral</h2>
					<p className="text-2xl font-bold text-green-500">R$ 595,00</p>
					<div className="mt-4">
						<h3 className="font-bold">Minhas contas</h3>
						<div className="flex justify-between items-center mt-2">
							<div className="flex items-center">
								<span className="text-2xl">💼</span>
								<span className="ml-2">Conta inicial</span>
							</div>
							<span className="text-blue-500">R$ 595,00</span>
						</div>
						<button className="bg-white mt-4 p-2 rounded shadow">Gerenciar contas</button>
					</div>
				</div>
				<div className="col-span-1 bg-gray-100 p-4 rounded shadow">
					<h2 className="text-lg font-bold">Faturas de Agosto</h2>
					<p className="text-2xl font-bold text-red-500">R$ -20,00</p>
					<div className="mt-4">
						<h3 className="font-bold">Meus cartões</h3>
						<div className="flex justify-between items-center mt-2">
							<div className="flex items-center">
								<span className="text-2xl">💳</span>
								<span className="ml-2">teste</span>
							</div>
							<button className="bg-green-500 text-white p-2 rounded">Ver fatura</button>
						</div>
						<div className="flex justify-between mt-2">
							<span>Limite Disponível</span>
							<span>R$ 3.680,00</span>
						</div>
						<div className="flex justify-between mt-2">
							<span>Fatura atual</span>
							<span>R$ -20,00</span>
						</div>
						<button className="bg-white mt-4 p-2 rounded shadow">Gerenciar cartões</button>
					</div>
				</div>
				<div className="col-span-1 bg-gray-100 p-4 rounded shadow">
					<h2 className="text-lg font-bold">Últimas Transações</h2>
					<ul className="mt-4 space-y-2">
						{transactions.map((transaction) => (
							<li key={transaction.id} className="flex justify-between">
								<div>
									<p className="text-sm">{transaction.description}</p>
									<p className="text-xs text-gray-500">{transaction.category}</p>
								</div>
								<p className={`text-sm ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
									{transaction.amount < 0 ? '-' : '+'}R$ {Math.abs(transaction.amount).toFixed(2)}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
				<div className="col-span-1 bg-gray-100 p-4 rounded shadow">
					<h2 className="text-lg font-bold">Contas a pagar</h2>
					<div className="mt-4">
						{[
							{ name: 'Fatura de Agosto 2024', amount: 'R$ 20,00' },
							{ name: 'Estapar', amount: 'R$ 85,00' },
							{ name: 'Estapar', amount: 'R$ 85,00' },
							{ name: 'Estapar', amount: 'R$ 85,00' },
						].map((bill, index) => (
							<div key={index} className="flex justify-between items-center mt-2">
								<div className="flex items-center">
									<span className="text-2xl">📅</span>
									<span className="ml-2">{bill.name}</span>
								</div>
								<span className="text-gray-500">{bill.amount}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
