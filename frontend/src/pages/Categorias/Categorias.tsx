import React, { useEffect, useState } from 'react';
import Category from '../../services/models/Categories';
import CategoryModal from '../../components/modal/CategoryModal';

const Categories: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>('despesas');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [despesasList, setDespesasList] = useState<string[]>([]);
	const [receitasList, setReceitasList] = useState<string[]>([]);

	useEffect(() => {
		Category.pegarDadosDasCategorias()
			.then((response: any) => {
				const optionsDespesas = response.filter((categoria: any) => categoria.category_type === 'despesas');
				const optionsReceitas = response.filter((categoria: any) => categoria.category_type === 'receitas');

				setDespesasList(optionsDespesas);
				setReceitasList(optionsReceitas);
			});
	}, [isModalOpen]);

	const handleSaveCategory = (category: { name: string; color: string; icon: string }) => {
		if (activeTab === 'despesas') {
			setDespesasList([...despesasList, category.name]);
		} else {
			setReceitasList([...receitasList, category.name]);
		}

		setIsModalOpen(false);
	};

	const handleDeleteCategory = (category) => {
		console.log('Apagar');
	}

	const handleEditCategory = (category) => {
		console.log('Editar');
	}


	return (
		<div className="flex flex-col w-full max-w-4xl p-8 bg-white rounded shadow-md ml-4">
			<div className="sticky top-0 bg-white py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Categorias</h1>
					<button
						className="bg-purple-600 text-white p-2 rounded"
						onClick={() => setIsModalOpen(true)}
					>
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
						{despesasList.map((categoria) => (
							<li key={categoria.name} className="flex justify-between items-center">
								<div className="flex items-center">
									<span className="text-xl mr-4">{categoria.color}</span>
									<span>{categoria.name}</span>
								</div>
								<div className="flex space-x-4">
									<a onClick={() => handleEditCategory(categoria)} className="text-blue-500">editar</a>
									<a onClick={() => handleDeleteCategory(categoria)} className="text-blue-500">apagar</a>
								</div>
							</li>
						))}
					</ul>
				)}
				{activeTab === 'receitas' && (
					<ul className="space-y-4">
						{receitasList.map((categoria) => (
							<li key={categoria.name} className="flex justify-between items-center">
								<div className="flex items-center">
									<span className="text-xl mr-4">{categoria.icon}</span>
									<span>{categoria.name}</span>
								</div>
								<div className="flex space-x-4">
									<a onClick={() => handleEditCategory(categoria)} className="text-blue-500">editar</a>
									<a onClick={() => handleDeleteCategory(categoria)} className="text-blue-500">apagar</a>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			<CategoryModal
				categoryType={activeTab}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSaveCategory}
			/>
		</div>
	);
};

export default Categories;
