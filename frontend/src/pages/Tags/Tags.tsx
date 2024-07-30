import { useEffect, useState } from 'react';
import TagModal from '../../components/modal/TagModal';
import { ITags } from '../../Interfaces/Tag';
import TagsDescriptions from '../../services/models/Tags';

const Tags = () => {
	const [infoTags, setInfoTags] = useState<ITags>({ description: '', color: '' });
	const [listTags, setListTags] = useState<ITags[]>([{ description: '', color: '' }]);
	const [updateList, setUpdateList] = useState<boolean>(true);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		if (updateList) {
			const fetchTags = async () => {
				const response = await TagsDescriptions.pegarDadosDasTag() as ITags[];

				if (response) {
					setListTags(response);
					setUpdateList(false);
					return
				}

				//toast.error('Erro ao buscar tags');
			}

			fetchTags()
		}
	}, [updateList]);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const saveTag = async () => {
		const newTag = await TagsDescriptions.criaTag(infoTags) as ITags;

		if (newTag) {
			//toast.success('Tag criada com sucesso!');
			setUpdateList(true);
			closeModal();
			return;
		}

		//toast.error('Erro ao criar tag');
	};

	const deleteTag = async (id: number) => {
		const deletedTag = await TagsDescriptions.deletarTag(id);

		if (deletedTag) {
			//toast.success('Tag criada com sucesso!');
			setUpdateList(true);
			closeModal();
			return;
		}

		//toast.error('Erro ao criar tag');
	};

	return (
		<div className="flex flex-col w-full max-w-4xl p-8 bg-white rounded shadow-md ml-4 min-h-full">
			<div className="sticky top-0 bg-white py-4">
				<div className="flex justify-between items-center">
					<h1 className="text-2xl font-bold">Tags</h1>
					<button
						className="bg-purple-500 text-white p-2 rounded hover:bg-green-700"
						onClick={() => openModal()}
					>
						+ Adicionar Tag
					</button>
				</div>
			</div>
			<div className="mt-4 flex-1 overflow-y-auto">
				{listTags.map((tag, index) => (
					<ul className="space-y-2" key={index}>
						<li className="flex justify-between items-center p-4 border rounded hover:bg-gray-100 transition-colors">
							<div className="flex items-center">
								<span className="text-xl mr-4">💼</span>
								<span>{tag.name!}</span>
							</div>
							<div className="flex space-x-4">
								<button className="text-blue-500 hover:text-blue-700" onClick={() => openModal()}>Editar</button>
								<button className="text-red-500 hover:text-red-700" onClick={() => deleteTag(tag.id!)}>Deletar</button>
							</div>
						</li>
					</ul>
				))}
			</div>

			{isModalOpen && (
				<TagModal
					onClose={closeModal}
					onSave={saveTag}
					setInfoTags={setInfoTags}
					infoTags={infoTags}
				/>
			)}
		</div>
	);
};

export default Tags;
