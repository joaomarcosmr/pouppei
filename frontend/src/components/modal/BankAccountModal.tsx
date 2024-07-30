import React from 'react';
import { BankAccountResponse, IBankAccount } from '../../Interfaces/BankAccount';
import BankAccount from '../../services/models/BankAccount';

interface BankAccountModalProps {
	isOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setBankAccount: React.Dispatch<React.SetStateAction<IBankAccount>>;
	bankAccount: IBankAccount;
}

const BankAccountModal: React.FC<BankAccountModalProps> = ({ isOpen, setIsModalOpen, setBankAccount, bankAccount }) => {

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		if (type === 'checkbox') {
			setBankAccount((prevAccount) => ({
				...prevAccount,
				[name]: checked,
			}));

			return;
		}

		setBankAccount((prevAccount) => ({
			...prevAccount,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const res = await BankAccount.createBankAccount(bankAccount) as BankAccountResponse

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
				<h2 className="text-center text-2xl font-bold mb-6">Nova conta</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="name">Nome da conta</label>
						<input
							id="name"
							name="name"
							type="text"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="Dê um nome para identificar esta conta"
							onChange={handleInputChange}
							value={bankAccount?.name}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="add_general_balance">
							<input
								id="add_general_balance"
								name="add_general_balance"
								type="checkbox"
								className="mr-2"
								onChange={handleInputChange}
								checked={bankAccount?.add_general_balance || false}
							/>
							Não somar no Saldo Geral
						</label>
					</div>
					<button
						type="submit"
						className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-700"
					>
						Adicionar conta
					</button>
				</form>
			</div>
		</div>
	);
};

export default BankAccountModal;
