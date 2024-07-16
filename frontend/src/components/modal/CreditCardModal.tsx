import React, { useState } from 'react';

interface CreditCardModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (card: CreditCard) => void;
}

interface CreditCard {
	name: string;
	limit: number;
	closeDay: number;
	dueDay: number;
	defaultAccount: string;
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({ isOpen, onClose, onSave }) => {
	const [card, setCard] = useState<CreditCard>({
		name: '',
		limit: 0,
		closeDay: 1,
		dueDay: 1,
		defaultAccount: 'Conta inicial'
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setCard((prevCard) => ({
			...prevCard,
			[name]: name === 'limit' ? parseFloat(value) : value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(card);
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
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="name">Nome do cartão</label>
						<input
							id="name"
							name="name"
							type="text"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="Dê um nome para identificar este cartão"
							onChange={handleInputChange}
							value={card.name}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="limit">Limite</label>
						<input
							id="limit"
							name="limit"
							type="number"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="R$ 0,00"
							onChange={handleInputChange}
							value={card.limit}
						/>
					</div>
					<div className="mb-4 flex space-x-4">
						<div>
							<label className="block text-gray-700" htmlFor="closeDay">Fecha dia</label>
							<select
								id="closeDay"
								name="closeDay"
								className="w-full p-2 border border-gray-300 rounded mt-1"
								onChange={handleInputChange}
								value={card.closeDay}
							>
								{Array.from({ length: 31 }, (_, i) => (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>
						</div>
						<div>
							<label className="block text-gray-700" htmlFor="dueDay">Vence dia</label>
							<select
								id="dueDay"
								name="dueDay"
								className="w-full p-2 border border-gray-300 rounded mt-1"
								onChange={handleInputChange}
								value={card.dueDay}
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
							value={card.defaultAccount}
						>
							<option value="Conta inicial">Conta inicial</option>
							{/* Add other account options here */}
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
