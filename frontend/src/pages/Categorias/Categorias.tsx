import React, { useEffect, useState } from 'react';
import Category from '../../services/models/Categories';

const Categories: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>('despesas');
	const [despesasList, setDespesasList] = useState<string[]>([]);
	const [receitasList, setReceitasList] = useState<string[]>([]);

	useEffect(() => {
		Category.pegarDadosDasCategorias()
			.then((response) => {
				console.log(response)
			});
	}, []);

	const despesas = [
		{ name: 'Alimentação', icon: '🍴' },
		{ name: 'Assinaturas e serviços', icon: '📰' },
		{ name: 'Bares e restaurantes', icon: '🍸' },
		{ name: 'Casa', icon: '🏠' },
		{ name: 'Compras', icon: '🛍️' },
		{ name: 'Cuidados pessoais', icon: '💅' },
		{ name: 'Dívidas e empréstimos', icon: '💸' },
		{ name: 'Educação', icon: '🎓' },
		{ name: 'Família e filhos', icon: '👨‍👩‍👧‍👦' },
		{ name: 'Impostos e Taxas', icon: '🧾' },
		{ name: 'Investimentos', icon: '💼' },
		{ name: 'Lazer e hobbies', icon: '🎨' },
		{ name: 'Mercado', icon: '🛒' },
	];

	const receitas = [
		{ name: 'Salário', icon: '💼' },
		{ name: 'Investimentos', icon: '📈' },
		{ name: 'Freelas', icon: '👨‍💻' },
	];

	return (
		<div className="flex flex-col w-full max-w-4xl p-8 bg-white rounded shadow-md ml-4">
			<div className="sticky top-0 bg-white py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Categorias</h1>
					<button className="bg-purple-600 text-white p-2 rounded">
						+ Categoria de {activeTab === 'despesas' ? 'despesa' : 'receita'}
					</button>
				</div>
				<div className="flex space-x-4 mt-4">
					<button
						className={`py-2 px-4 rounded ${activeTab === 'despesas' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
						onClick={() => setActiveTab('despesas')}
					>
						Despesas
					</button>
					<button
						className={`py-2 px-4 rounded ${activeTab === 'receitas' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
						onClick={() => setActiveTab('receitas')}
					>
						Receitas
					</button>
				</div>
			</div>
			<div className="mt-4">
				{activeTab === 'despesas' && (
					<ul className="space-y-4">
						{despesas.map((categoria) => (
							<li key={categoria.name} className="flex justify-between items-center">
								<div className="flex items-center">
									<span className="text-xl mr-4">{categoria.icon}</span>
									<span>{categoria.name}</span>
								</div>
								<div className="flex space-x-4">
									<a href="#" className="text-blue-500">arquivar</a>
									<a href="#" className="text-blue-500">+ sub-categoria</a>
								</div>
							</li>
						))}
					</ul>
				)}
				{activeTab === 'receitas' && (
					<ul className="space-y-4">
						{receitas.map((categoria) => (
							<li key={categoria.name} className="flex justify-between items-center">
								<div className="flex items-center">
									<span className="text-xl mr-4">{categoria.icon}</span>
									<span>{categoria.name}</span>
								</div>
								<div className="flex space-x-4">
									<a href="#" className="text-blue-500">arquivar</a>
									<a href="#" className="text-blue-500">+ sub-categoria</a>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Categories;
