import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShoppingCart, faUtensils } from '@fortawesome/free-solid-svg-icons';
import CreditCard from '../../../services/models/CreditCards';
import { CreditCardResponse, ICreditCard } from '../../../Interfaces/CreditCard';

type Transaction = {
	id: number;
	name: string;
	category: string;
	icon: any;
	amount: number;
	date: string;
};

const CreditCardInformations = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [showTransactions, setShowTransactions] = useState(false);
	const [infoCreditCard, setInfoCreditCard] = useState<ICreditCard | null>(null);
	const [visibleCount, setVisibleCount] = useState(2);

	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				const creditCard = await CreditCard.pegarDadosCreditCardsPorId(parseInt(id)) as CreditCardResponse;

				if (!creditCard) {
					//toast.error('Erro ao buscar cartão de crédito');
					return;
				}

				setInfoCreditCard(creditCard?.data!);
				//toast.success('Cartão de crédito encontrado com sucesso!');
			}

			fetchData();
		}
	}, [id]);

	const transactions: Transaction[] = [
		{ id: 1, name: 'Supermercado', category: 'Compras', icon: faShoppingCart, amount: -150, date: '2024-07-01' },
		{ id: 2, name: 'Restaurante', category: 'Alimentação', icon: faUtensils, amount: -75, date: '2024-07-02' },
		{ id: 3, name: 'Eletrônicos', category: 'Compras', icon: faShoppingCart, amount: -300, date: '2024-07-03' },
		// Add more transactions as needed
	];

	const handleBackClick = () => {
		navigate(-1);
	};

	const toggleTransactions = () => {
		setShowTransactions(!showTransactions);
	};

	const loadMoreTransactions = () => {
		setVisibleCount((prevCount) => prevCount + 2); // Load 2 more transactions each time
	};

	return (
		<div className="p-5 border border-gray-300 rounded-lg w-full mx-auto max-w-7xl bg-white">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center">
					<button onClick={handleBackClick} className="text-gray-600 mr-4">
						<FontAwesomeIcon icon={faArrowLeft} size="lg" />
					</button>
					<div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
						<img src="/path/to/amex-logo.png" alt="Card Logo" className="w-full h-full object-contain" />
					</div>
				</div>
				<div className="flex-1 ml-4">
					<h2 className="text-lg font-semibold">{infoCreditCard?.name}</h2>
					<p className="text-sm text-gray-500">Vence dia {infoCreditCard?.due_date}</p>
				</div>
				<div className="flex items-center">
					<a href="#" className="text-green-500 hover:text-green-700 mr-2">Editar</a>
					<a href="#" className="text-red-500 hover:text-red-700">Arquivar</a>
				</div>
			</div>
			<div className="text-2xl font-bold mb-4">
				R$ 0,00 <button onClick={toggleTransactions} className="text-blue-500 hover:underline text-sm">Ver fatura</button>
			</div>
			<div className="text-sm text-gray-500 mb-4">Limite disponível de R$ 50,00</div>

			{showTransactions && (
				<div className="mt-4 border-t border-gray-300 pt-4">
					<table className="w-full border-collapse">
						<thead>
							<tr className="bg-gray-200">
								<th className="p-2 border">Nome</th>
								<th className="p-2 border">Categoria</th>
								<th className="p-2 border">Ícone</th>
								<th className="p-2 border">Valor</th>
								<th className="p-2 border">Data</th>
							</tr>
						</thead>
						<tbody>
							{transactions.slice(0, visibleCount).map((transaction, index) => (
								<tr key={transaction.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-center`}>
									<td className="p-2 border">{transaction.name}</td>
									<td className="p-2 border">{transaction.category}</td>
									<td className="p-2 border">
										<FontAwesomeIcon icon={transaction.icon} />
									</td>
									<td className="p-2 border">
										{transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
									</td>
									<td className="p-2 border">{transaction.date}</td>
								</tr>
							))}
						</tbody>
					</table>
					{visibleCount < transactions.length && (
						<div className="text-center mt-4">
							<button onClick={loadMoreTransactions} className="py-2 px-4 bg-purple-500 text-white rounded-lg">
								Carregar Mais
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CreditCardInformations;
