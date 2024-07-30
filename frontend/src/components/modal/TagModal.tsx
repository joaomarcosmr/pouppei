import React, { useState, useEffect } from 'react';
import { ITags } from '../../Interfaces/Tag';

type TagModalProps = {
	onClose: () => void;
	onSave: (name: string) => void;
	initialName?: string | null;
	infoTags: ITags;
	setInfoTags: React.Dispatch<React.SetStateAction<ITags>>;
};

const TagModal: React.FC<TagModalProps> = ({ onClose, onSave, initialName, infoTags, setInfoTags }) => {

	useEffect(() => {
	}, [initialName]);

	const handleSave = () => {
		onSave(infoTags.description);
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">{initialName ? 'Editar tag' : 'Nova tag'}</h2>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-600">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div className="mb-4">
					<label htmlFor="tagName" className="block text-sm font-medium text-gray-700">Nome</label>
					<input
						type="text"
						id="tagName"
						value={infoTags.description}
						onChange={(e) => setInfoTags(e.target.value)}
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
					/>
				</div>
				<div className="flex justify-end">
					<button onClick={handleSave} className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
						Salvar
					</button>
				</div>
			</div>
		</div>
	);
};

export default TagModal;
