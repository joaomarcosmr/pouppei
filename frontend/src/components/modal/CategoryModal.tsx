import React from 'react';
import Category from '../../services/models/Categories';
import { CategoryResponse, ICategory } from '../../Interfaces/Category';

interface CategoryModalProps {
	isOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	categoryType: string;
	setCategory: React.Dispatch<React.SetStateAction<ICategory>>;
	category: ICategory;
	isEditar: boolean;
	setIsEditar: React.Dispatch<React.SetStateAction<boolean>>;
}

const icons = [
	'🍴', '📰', '🍸', '🏠', '🛍️', '💅', '💸', '🎓', '👨‍👩‍👧‍👦', '🧾', '🎨', '🛒',
	'📈', '👨‍💻', '❤️', '⭐', '👤', '🎥', '🎵', '📷', '✉️', '🚩', '📚', '🚴', '🚗', '🚀', '🌟', '🔥', '⚡'
];

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, setIsModalOpen, categoryType, setCategory, category, isEditar }) => {

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCategory((prevCategory) => ({
			...prevCategory,
			[name]: value,
		}));
	};

	const handleIconChange = (icon: string) => {
		setCategory((prevCategory) => ({
			...prevCategory,
			icon,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setCategory((prevCategory) => ({
			...prevCategory,
			category_type: categoryType,
		}));

		const res = await Category.createCategory(category) as CategoryResponse

		if (res) {
			setIsModalOpen(false);
			return;
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<div className="flex justify-end">
					<button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-gray-800">
						&times;
					</button>
				</div>
				<h2 className="text-center text-2xl font-bold mb-6">{isEditar ? 'Criando' : 'Alterando'} categoria de {categoryType}</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="name">Nome da categoria</label>
						<input
							id="name"
							name="name"
							type="text"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="Nome da categoria"
							onChange={handleInputChange}
							value={category.name}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Escolha um ícone</label>
						<div className="flex flex-wrap mt-1">
							{icons.map((icon, index) => (
								<button
									key={index}
									type="button"
									className={`w-8 h-8 rounded-full mr-2 mb-2 ${category.icon === icon ? 'ring-2 ring-offset-2 ring-purple-600' : ''}`}
									onClick={() => handleIconChange(icon)}
								>
									<span className="text-xl">{icon}</span>
								</button>
							))}
						</div>
					</div>
					<button
						type="submit"
						className="w-full p-2 bg-purple-500 text-white rounded hover:bg-green-700"
					>
						{isEditar ? 'Criar Categoria' : 'Salvar Categoria'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CategoryModal;