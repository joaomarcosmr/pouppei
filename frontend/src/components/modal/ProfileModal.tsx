import React, { useState } from 'react';

type ProfileModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSave: (profileData: { name: string; email: string; birthDate: string }) => void;
	onLogout: () => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSave, onLogout }) => {
	const [name, setName] = useState('João');
	const [email, setEmail] = useState('petsviploja@gmail.com');
	const [birthDate, setBirthDate] = useState('');

	const handleSave = () => {
		onSave({ name, email, birthDate });
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
				<div className="flex justify-center mb-6">
					<div className="w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center">
						<span className="text-white text-3xl">👤</span>
					</div>
				</div>
				<div className="mb-4">
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Data de nascimento</label>
					<input
						type="date"
						id="birthDate"
						value={birthDate}
						onChange={(e) => setBirthDate(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
					/>
				</div>
				<div className="mb-6">
					<h3 className="text-sm font-medium text-gray-500">SEGURANÇA E LOGIN</h3>
					<button className="w-full bg-white border border-gray-300 text-purple-500 py-2 px-4 rounded-md shadow-sm hover:bg-gray-100">
						Alterar minha senha
					</button>
				</div>
				<div className="flex justify-between items-center">
					<div className="flex space-x-2">
						<button onClick={handleSave} className="bg-purple-500 text-white py-1.5 px-4 rounded-lg hover:bg-purple-600 focus:outline-none">
							Salvar
						</button>
						<button onClick={onClose} className="bg-gray-500 text-white py-1.5 px-4 rounded-lg hover:bg-gray-600 focus:outline-none">
							Cancelar
						</button>
					</div>
					<button onClick={onLogout} className="bg-red-500 text-white py-1.5 px-4 rounded-lg hover:bg-red-600 focus:outline-none">
						Sair
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfileModal;
