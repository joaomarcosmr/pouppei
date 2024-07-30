import React, { useEffect, useState } from 'react';
import Category from '../../services/models/Categories';
import CategoryModal from '../../components/modal/CategoryModal';
import { ICategory } from '../../Interfaces/Category';

const Categories: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>('despesas');
	const [category, setCategory] = useState<ICategory>({ id: 0, name: '', icon: '', category_type: activeTab });
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isEditar, setIsEditar] = useState<boolean>(false);
	const [despesasList, setDespesasList] = useState<ICategory[]>([]);
	const [receitasList, setReceitasList] = useState<ICategory[]>([]);

	useEffect(() => {
		Category.pegarDadosDasCategorias()
			.then((response: any) => {
				const optionsDespesas = response.filter((categoria: any) => categoria.category_type === 'despesas');
				const optionsReceitas = response.filter((categoria: any) => categoria.category_type === 'receitas');

				setDespesasList(optionsDespesas);
				setReceitasList(optionsReceitas);
			});
	}, [isModalOpen]);

	useEffect(() => {
		setCategory((prevCategory) => ({
			...prevCategory,
			category_type: activeTab,
		}));
	}, [activeTab]);

	const handleDeleteCategory = (category: ICategory) => {
		Category.deletarCategoria(category.id)
			.then(() => {
				Category.pegarDadosDasCategorias()
					.then((response: any) => {
						const optionsDespesas = response.filter((categoria: any) => categoria.category_type === 'despesas');
						const optionsReceitas = response.filter((categoria: any) => categoria.category_type === 'receitas');

						setDespesasList(optionsDespesas);
						setReceitasList(optionsReceitas);
					});
			});
	};

	const handleEditCategory = (category: ICategory) => {
		setIsEditar(true);
		setCategory(category);
		setIsModalOpen(true);
	};

	return (
		<div className="flex flex-col w-full max-w-4xl p-8 bg-white rounded shadow-md ml-4">
			<div className="sticky top-0 bg-white py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Categorias</h1>
					<button
						className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
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
					<ul className="space-y-2">
						{despesasList.map((categoria) => (
							<li key={categoria.name} className="flex justify-between items-center hover:bg-gray-100 p-4 border rounded transition-colors">
								<div className="flex items-center">
									<span className="text-xl mr-4">{categoria.icon}</span>
									<span>{categoria.name}</span>
								</div>
								<div className="flex space-x-4">
									<button onClick={() => handleEditCategory(categoria)} className="text-blue-500 hover:text-blue-700">
										Editar
									</button>
									<button onClick={() => handleDeleteCategory(categoria)} className="text-red-500 hover:text-red-700">
										Deletar
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
				{activeTab === 'receitas' && (
					<ul className="space-y-2">
						{receitasList.map((categoria) => (
							<li key={categoria.name} className="flex justify-between items-center hover:bg-gray-100 p-4 border rounded transition-colors">
								<div className="flex items-center">
									<span className="text-xl mr-4">{categoria.icon}</span>
									<span>{categoria.name}</span>
								</div>
								<div className="flex space-x-4">
									<button onClick={() => handleEditCategory(categoria)} className="text-blue-500 hover:text-blue-700">
										Editar
									</button>
									<button onClick={() => handleDeleteCategory(categoria)} className="text-red-500 hover:text-red-700">
										Deletar
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			<CategoryModal
				categoryType={activeTab}
				isOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				setCategory={setCategory}
				category={category}
				isEditar={isEditar}
				setIsEditar={setIsEditar}
			/>
		</div>
	);
};

export default Categories;
