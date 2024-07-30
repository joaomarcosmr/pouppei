import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMoneyBillWave, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BankAccountResponse, IBankAccount } from '../../../Interfaces/BankAccount';
import BankAccount from '../../../services/models/BankAccount';

type Transaction = {
	id: number;
	name: string;
	category: string;
	icon: any;
	amount: number;
	date: string;
};

const BankAccountInformations = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [infoBankAccount, setInfoBankAccount] = useState<IBankAccount | null>(null);
	const [showTransactions, setShowTransactions] = useState(false);
	const [visibleCount, setVisibleCount] = useState(2);

	useEffect(() => {
		if (id) {
			const fetchData = async () => {
				const bankAccount = await BankAccount.getBankAccountById(parseInt(id)) as BankAccountResponse;

				if (!bankAccount) {
					//toast.error('Erro ao buscar conta bancária');
					return;
				}
				setInfoBankAccount(bankAccount?.data!);
				// toast.success('Conta bancária encontrada com sucesso!');
			}

			fetchData();
		}
	}, [id]);

	const transactions: Transaction[] = [
		{ id: 1, name: 'Pagamento de boleto', category: 'Despesas', icon: faMoneyBillWave, amount: -200, date: '2024-07-01' },
		{ id: 2, name: 'Depósito', category: 'Receita', icon: faMoneyBillWave, amount: 500, date: '2024-07-02' },
		{ id: 3, name: 'Compra no mercado', category: 'Compras', icon: faShoppingCart, amount: -150, date: '2024-07-03' },
		// Add more transactions as needed
	];

	const handleBackClick = () => {
		navigate(-1);
	};

	const toggleTransactions = () => {
		setShowTransactions(!showTransactions);
	};

	const loadMoreTransactions = () => {
		setVisibleCount((prevCount) => prevCount + 2);
	};

	return (
		<div className="p-5 border border-gray-300 rounded-lg w-full mx-auto max-w-7xl">
			<div className="flex justify-between items-center mb-4">
				<div className="flex items-center">
					<button onClick={handleBackClick} className="text-gray-600 mr-4">
						<FontAwesomeIcon icon={faArrowLeft} size="lg" />
					</button>
					<div className="w-12 h-12 bg-gray-300 rounded-full"></div>
				</div>
				<div className="flex-1 ml-4">
					<h2 className="text-lg font-semibold">{infoBankAccount?.name}</h2>
					<a href="#" className="text-blue-600 text-sm">Ajustar saldo</a>
				</div>
				<div className="flex items-center">
					<a href="#" className="text-green-500 mr-2">Editar</a>
				</div>
			</div>
			<div className="text-2xl font-bold mb-4">R$ {infoBankAccount?.balance}</div>
			<div className="flex items-center mb-4">
				<input type="checkbox" id="excludeBalance" className="mr-2" />
				<label htmlFor="excludeBalance" className="text-sm">Não somar no Saldo Geral</label>
			</div>
			<div className="flex justify-between">
				<button onClick={toggleTransactions} className="py-2 px-4 bg-gray-100 rounded-lg">
					Ver Lançamentos
				</button>
				<button className="py-2 px-4 bg-gray-100 rounded-lg">Relatórios</button>
				<button className="py-2 px-4 bg-gray-100 rounded-lg">Importação & Conciliação</button>
			</div>
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

export default BankAccountInformations;
