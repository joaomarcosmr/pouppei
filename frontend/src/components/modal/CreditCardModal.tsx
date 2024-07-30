import React from 'react';
import { ICreditCard } from '../../Interfaces/CreditCard';

interface CreditCardModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: () => void;
	infoCreditCards: ICreditCard;
	setInfoCreditCards: React.Dispatch<React.SetStateAction<ICreditCard>>;
}

const icons = [
	'🍴', '📰', '🍸', '🏠', '🛍️', '💅', '💸', '🎓', '👨‍👩‍👧‍👦', '🧾', '🎨', '🛒',
	'📈', '👨‍💻', '❤️', '⭐', '👤', '🎥', '🎵', '📷', '✉️', '🚩', '📚', '🚴', '🚗', '🚀', '🌟', '🔥', '⚡'
];

const CreditCardModal: React.FC<CreditCardModalProps> = ({ isOpen, onClose, onSave, infoCreditCards, setInfoCreditCards }) => {

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setInfoCreditCards((prevCard) => ({
			...prevCard,
			[name]: name === 'credit_limit' ? parseFloat(value) : value,
		}));
	};

	const handleIconChange = (icon: string) => {
		setInfoCreditCards((prevCategory) => ({
			...prevCategory,
			icon,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave();
		onClose();
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<div className="flex justify-end">
					<button onClick={onClose} className="text-gray-600 hover:text-gray-800">
						&times;
					</button>
				</div>
				<h2 className="text-center text-2xl font-bold mb-6">Novo cartão</h2>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-wrap mt-1">
						{icons.map((icon, index) => (
							<button
								key={index}
								type="button"
								className={`w-8 h-8 rounded-full mr-2 mb-2 ${infoCreditCards.icon === icon ? 'ring-2 ring-offset-2 ring-purple-600' : ''}`}
								onClick={() => handleIconChange(icon)}
							>
								<span className="text-xl">{icon}</span>
							</button>
						))}
					</div>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="name">Nome do cartão</label>
						<input
							id="name"
							name="name"
							type="text"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="Dê um nome para identificar este cartão"
							onChange={handleInputChange}
							value={infoCreditCards.name}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="credit_limit">Limite</label>
						<input
							id="credit_limit"
							name="credit_limit"
							type="number"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="R$ 0,00"
							onChange={handleInputChange}
							value={infoCreditCards.credit_limit}
						/>
					</div>
					<div className="mb-4 flex">
						<div className='w-1/2 pr-2'>
							<label className="block text-gray-700" htmlFor="close_date">Fecha dia</label>
							<select
								id="close_date"
								name="close_date"
								className="w-full p-2 border border-gray-300 rounded mt-1"
								onChange={handleInputChange}
								value={infoCreditCards.close_date}
							>
								{Array.from({ length: 31 }, (_, i) => (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>
						</div>
						<div className='w-1/2 pl-2'>
							<label className="block text-gray-700" htmlFor="due_date">Vence dia</label>
							<select
								id="due_date"
								name="due_date"
								className="w-full p-2 border border-gray-300 rounded mt-1"
								onChange={handleInputChange}
								value={infoCreditCards.due_date}
							>
								{Array.from({ length: 31 }, (_, i) => (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="defaultAccount">Conta de pagamento padrão</label>
						<select
							id="defaultAccount"
							name="defaultAccount"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							onChange={handleInputChange}
							value={infoCreditCards.icon}
						>
							<option value="Conta inicial">Conta inicial</option>
						</select>
					</div>
					<button
						type="submit"
						className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-700"
					>
						Adicionar cartão
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreditCardModal;
