import React, { useEffect, useState } from 'react';
import BankAccountModal from '../../components/modal/BankAccountModal';

interface BankAccount {
	name: string;
	excludeFromTotal: boolean;
}

const BankAccounts: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [accounts, setAccounts] = useState<BankAccount[]>([
		{ name: 'Conta inicial', excludeFromTotal: false },
	]);

	useEffect(() => {

		// fetch accounts

	}, []);

	const handleSaveAccount = (account: BankAccount) => {
		setAccounts([...accounts, account]);
	};

	return (
		<div className="flex flex-col w-full max-w-4xl p-8 bg-white rounded shadow-md ml-4 min-h-full">
			<div className="sticky top-0 bg-white py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Contas</h1>
					<button
						className="bg-purple-500 text-white p-2 rounded"
						onClick={() => setIsModalOpen(true)}
					>
						+ Nova conta
					</button>
				</div>
			</div>
			<div className="mt-4 flex-1 overflow-y-auto">
				<ul className="space-y-4">
					{accounts.map((account, index) => (
						<li key={index} className="flex justify-between items-center">
							<div className="flex items-center">
								<span className="text-xl mr-4">💼</span>
								<span>{account.name}</span>
							</div>
						</li>
					))}
				</ul>
			</div>
			<BankAccountModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSaveAccount}
			/>
		</div>
	);
};

export default BankAccounts;
