import React from 'react';

const BankAccounts: React.FC = () => {
	return (
		<div className="flex flex-col w-full max-w-4xl p-8 bg-white rounded shadow-md ml-4 min-h-full">
			<div className="sticky top-0 bg-white py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Contas</h1>
					<button className="bg-green-500 text-white p-2 rounded">
						+ Nova conta
					</button>
				</div>
			</div>
			<div className="mt-4 flex-1 overflow-y-auto">
				<ul className="space-y-4">
					<li className="flex justify-between items-center">
						<div className="flex items-center">
							<span className="text-xl mr-4">💼</span>
							<span>Conta inicial</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default BankAccounts;
