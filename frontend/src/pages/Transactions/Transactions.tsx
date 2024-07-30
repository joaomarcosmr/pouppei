import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import TransactionModal from '../../components/modal/TransactionModal';
import { ITransaction } from '../../Interfaces/Transactions';

const TransactionsPage: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [infoTransactions, setInfoTransactions] = useState<ITransaction>({ id: 0, date: '', description: '', category: '', amount: 0 });
	const [listTransactions, setListTransactions] = useState<ITransaction[]>([{ id: 0, date: '', description: '', category: '', amount: 0 }]);
	const [transactionType, setTransactionType] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const handleOpenModal = (type: string) => {
		setTransactionType(type);
		setIsModalOpen(true);
	};

	const handleSaveTransaction = (transaction: ITransaction) => {
		console.log('Saving transaction:', transaction);
	};

	return (
		<div className="min-h-screen bg-white p-6">
			<div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
				<div className="mb-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Transações</h1>
					<div className="flex space-x-2">
						<button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={() => handleOpenModal('Despesa')}>
							DESPESA
						</button>
						<button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={() => handleOpenModal('Receita')}>
							RECEITA
						</button>
						<button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" onClick={() => handleOpenModal('Transf.')}>
							TRANSF.
						</button>
					</div>
				</div>
				<table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
					<thead className="bg-gray-100">
						<tr>
							<th className="text-left p-4 border-b">Data</th>
							<th className="text-left p-4 border-b">Descrição</th>
							<th className="text-left p-4 border-b">Categoria</th>
							<th className="text-right p-4 border-b">Valor</th>
							<th className="text-center p-4 border-b">Ações</th>
						</tr>
					</thead>
					<tbody>
						{listTransactions.map((transaction) => (
							<tr key={transaction.id} className="border-b">
								<td className="p-4">{transaction.date}</td>
								<td className="p-4">{transaction.description}</td>
								<td className="p-4">{transaction.category}</td>
								<td className={`p-4 text-right ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
									{transaction.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
								</td>
								<td className="p-4 text-center">
									<button className="text-blue-500 hover:text-blue-700 mr-2">
										<FontAwesomeIcon icon={faEdit} />
									</button>
									<button className="text-red-500 hover:text-red-700">
										<FontAwesomeIcon icon={faTrashAlt} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div >

			<TransactionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSaveTransaction}
				transactionType={transactionType}
				setInfoTransactions={setInfoTransactions}
				infoTransactions={infoTransactions}
			/>
		</div >
	);
};

export default TransactionsPage;