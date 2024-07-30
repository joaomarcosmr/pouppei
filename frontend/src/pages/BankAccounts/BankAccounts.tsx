import React, { useEffect, useState } from 'react';
import BankAccountModal from '../../components/modal/BankAccountModal';
import { IBankAccount } from '../../Interfaces/BankAccount';
import BankAccount from '../../services/models/BankAccount';
import { useNavigate } from 'react-router-dom';

const BankAccounts: React.FC = () => {
	const navigate = useNavigate();
	const [bankAccount, setBankAccount] = useState<IBankAccount>({ id: 0, name: '', icon: '', add_general_balance: false });
	const [accounts, setAccounts] = useState<IBankAccount[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		if (!isModalOpen) {
			setBankAccount({ id: 0, name: '', icon: '', add_general_balance: false });

			BankAccount.getAllBankAccounts().then((response: any) => {
				setAccounts(response);
			});
		}
	}, [isModalOpen]);

	const handleDeleteBankAccount = (account: IBankAccount) => {
		BankAccount.deleteBankAccount(account.id).then(() => {
			BankAccount.getAllBankAccounts().then((response: any) => {
				setAccounts(response);
			});
		});
	};

	const handleSeeAccount = (account: IBankAccount) => {
		navigate(`/bank-accounts/${account.id}`);
	};

	return (
		<div className="flex flex-col w-full max-w-4xl p-8 bg-white rounded shadow-md ml-4 min-h-full">
			<div className="sticky top-0 bg-white py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Contas</h1>
					<button
						className="bg-purple-500 text-white p-2 rounded hover:bg-purple-700"
						onClick={() => setIsModalOpen(true)}
					>
						+ Nova conta
					</button>
				</div>
			</div>
			<div className="mt-4 flex-1 overflow-y-auto">
				<ul className="space-y-2">
					{accounts.map((account, index) => (
						<li key={index} className="flex justify-between items-center hover:bg-gray-100 p-4 border rounded transition-colors">
							<div className="flex items-center">
								<span className="text-xl mr-4">{account.icon}</span>
								<span>{account.name}</span>
							</div>
							<div className="flex space-x-4">
								<button
									onClick={() => handleSeeAccount(account)}
									className="text-blue-500 hover:text-blue-700"
								>
									Ver
								</button>
								<button
									onClick={() => handleDeleteBankAccount(account)}
									className="text-red-500 hover:text-red-700"
								>
									Deletar
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
			{isModalOpen && (
				<BankAccountModal
					isOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					setBankAccount={setBankAccount}
					bankAccount={bankAccount}
				/>
			)}
		</div>
	);
};

export default BankAccounts;
