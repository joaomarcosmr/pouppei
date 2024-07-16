import React, { useEffect, useState } from 'react';
import CreditCardModal from '../../components/modal/CreditCardModal';

interface CreditCard {
	name: string;
	limit: number;
	closeDay: number;
	dueDay: number;
	defaultAccount: string;
}

const CreditCards: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [cards, setCards] = useState<CreditCard[]>([
		{ name: 'Conta inicial', limit: 0, closeDay: 1, dueDay: 1, defaultAccount: 'Conta inicial' },
	]);

	useEffect(() => {

		// fetch

	}, [])

	const handleSaveCard = (card: CreditCard) => {
		setCards([...cards, card]);
	};

	return (
		<div className="flex flex-col w-full max-w-4xl p-8 bg-white rounded shadow-md ml-4 min-h-full">
			<div className="sticky top-0 bg-white py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Cartões de Crédito</h1>
					<button
						className="bg-purple-500 text-white p-2 rounded"
						onClick={() => setIsModalOpen(true)}
					>
						+ Adicionar Cartão
					</button>
				</div>
			</div>
			<div className="mt-4 flex-1 overflow-y-auto">
				<ul className="space-y-4">
					{cards.map((card, index) => (
						<li key={index} className="flex justify-between items-center">
							<div className="flex items-center">
								<span className="text-xl mr-4">💳</span>
								<span>{card.name}</span>
							</div>
						</li>
					))}
				</ul>
			</div>
			<CreditCardModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSaveCard}
			/>
		</div>
	);
};

export default CreditCards;
