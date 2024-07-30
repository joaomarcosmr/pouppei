import React, { useState } from 'react';
import { ITransaction } from '../../Interfaces/Transactions';

type TransactionModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSave: (transaction: { type: string; amount: number; description: string; category: string; date: string }) => void;
	transactionType: string;
	setInfoTransactions: React.Dispatch<React.SetStateAction<ITransaction>>;
	infoTransactions: ITransaction;
};

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSave, transactionType, setInfoTransactions, infoTransactions }) => {

	const handleSave = () => {
		onClose();
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setInfoTransactions((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Nova {transactionType}</h2>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-600">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div className="mb-4">
					<label htmlFor="amount" className="block text-sm font-medium text-gray-700">Valor</label>
					<input
						type="number"
						id="amount"
						value={infoTransactions.amount}
						onChange={handleInputChange}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
						placeholder="Ex: 100.00"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
					<input
						type="text"
						id="description"
						value={infoTransactions.description}
						onChange={handleInputChange}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
						placeholder="Ex: Compra no supermercado"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
					<input
						type="text"
						id="category"
						value={infoTransactions.category}
						onChange={handleInputChange}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
						placeholder="Ex: Alimentação"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
					<input
						type="date"
						id="date"
						value={infoTransactions.date}
						onChange={handleInputChange}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
					/>
				</div>
				<div className="flex justify-end space-x-2">
					<button
						onClick={handleSave}
						className="bg-green-500 text-white py-1.5 px-4 rounded hover:bg-green-600 focus:outline-none"
					>
						Salvar
					</button>
					<button onClick={onClose} className="bg-gray-500 text-white py-1.5 px-4 rounded hover:bg-gray-600 focus:outline-none">
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};

export default TransactionModal;
