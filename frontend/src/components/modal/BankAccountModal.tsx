import React, { useState } from 'react';

interface BankAccountModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (account: BankAccount) => void;
}

interface BankAccount {
	name: string;
	excludeFromTotal: boolean;
}

const BankAccountModal: React.FC<BankAccountModalProps> = ({ isOpen, onClose, onSave }) => {
	const [account, setAccount] = useState<BankAccount>({ name: '', excludeFromTotal: false });

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAccount((prevAccount) => ({
			...prevAccount,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setAccount((prevAccount) => ({
			...prevAccount,
			[name]: checked,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// chamada api

		onSave(account);
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
							value={account.name}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="excludeFromTotal">
							<input
								id="excludeFromTotal"
								name="excludeFromTotal"
								type="checkbox"
								className="mr-2"
								onChange={handleCheckboxChange}
								checked={account.excludeFromTotal}
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
