import { useEffect, useState } from 'react';
import CreditCardModal from '../../components/modal/CreditCardModal';
import { useNavigate } from 'react-router-dom';
import { CreditCardResponse, ICreditCard } from '../../Interfaces/CreditCard';
import CreditCard from '../../services/models/CreditCards';

const CreditCards = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [infoCreditCards, setInfoCreditCards] = useState<ICreditCard>(
		{ name: 'Conta inicial', icon: '', invoice: 0, due_date: 1, credit_limit: 1 });
	const [creditCardsList, setCreditCardsList] = useState<ICreditCard[] | null>([]);
	const [updateList, setUpdateList] = useState<boolean>(true);

	useEffect(() => {
		if (updateList) {
			const fetchData = async () => {
				try {
					const res = await CreditCard.pegarDadosCreditCards() as ICreditCard[];

					if (res) {
						setCreditCardsList(res || []);
					}

				} catch (error) {
					console.error('Falha ao buscar os dados dos cartões de crédito:', error);
				}

				setUpdateList(false);
			};

			fetchData();
		}
	}, [updateList])


	const handleSaveCard = async () => {
		const newCreditCard = await CreditCard.createCreditCard(infoCreditCards) as CreditCardResponse;

		if (!newCreditCard) {
			//toast.error('Erro ao criar cartão de crédito');
			return;
		}

		//toast.success('Cartão de crédito criado com sucesso!');
		setUpdateList(true);
		setIsModalOpen(false);
	};

	const handleSeeCreditCard = (id: number) => {
		navigate(`/credit-cards/${id}`);
	};

	const handleDeleteCard = async (id: number) => {
		const deletedCreditCard = await CreditCard.deletarCreditCard(id) as CreditCardResponse;

		if (!deletedCreditCard) {
			//toast.error('Erro ao criar cartão de crédito');
			return;
		}

		//toast.success('Cartão de crédito criado com sucesso!');
		setUpdateList(true);
	};

	return (
		<div className="flex flex-col w-full max-w-4xl p-8 bg-white rounded shadow-md ml-4 min-h-full">
			<div className="sticky top-0 bg-white py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Cartões de Crédito</h1>
					<button
						className="bg-purple-500 text-white p-2 rounded"
						onClick={() => {
							setIsModalOpen(true);
						}}
					>
						+ Adicionar Cartão
					</button>
				</div>
			</div>
			<div className="mt-4 flex-1 overflow-y-auto">
				<ul className="space-y-2">
					{creditCardsList?.map((card, index) => (
						<li
							key={index}
							className="flex justify-between items-center p-4 border rounded hover:bg-gray-100 transition-colors"
						>
							<div className="flex items-center">
								<span className="text-xl mr-4">💳</span>
								<span>{card.name}</span>
							</div>
							<div className="flex space-x-4">
								<button
									className="text-blue-500 hover:text-blue-700"
									onClick={() => handleSeeCreditCard(card.id!)}
								>
									Ver
								</button>
								<button
									className="text-red-500 hover:text-red-700"
									onClick={() => handleDeleteCard(card.id!)}
								>
									Deletar
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
			{isModalOpen && (
				<CreditCardModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSave={handleSaveCard}
					infoCreditCards={infoCreditCards}
					setInfoCreditCards={setInfoCreditCards}
				/>
			)}
		</div>
	);
};

export default CreditCards;
