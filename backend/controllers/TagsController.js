const Tags = require('../models/Tag')

const getAllTags = async (req, res) => {
	try {
		const userId = req.user.id;

		const tags = await Tags.getAllTags(userId);

		if (!tags) {
			return res.status(404).json({ message: 'Nenhuma tag encontrada' });
		}

		res.status(200).json(tags);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const getTagById = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;

		const tag = await Tags.getTagById(userId, id);

		if (!tag) {
			return res.status(404).json({ message: 'Tag não encontrada' });
		}

		res.status(200).json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const createTag = async (req, res) => {
	try {
		const userId = req.user.id;
		const { name } = req.body;

		const tag = await Tags.createTag(userId, name);

		if (!tag) {
			return res.status(400).json({ message: 'Erro ao criar tag' });
		}

		res.status(201).json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const updateTag = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;
		const { name } = req.body;

		const tag = await Tags.updateTag(id, userId, name);

		if (!tag) {
			return res.status(400).json({ message: 'Erro ao atualizar tag' });
		}

		res.status(200).json(tag);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const deleteTag = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;

		const tag = await Tags.deleteTag(id, userId);

		if (!tag) {
			return res.status(400).json({ message: 'Erro ao deletar tag' });
		}

		res.status(200).json({ message: 'Tag deletada com sucesso' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

module.exports = {
	getAllTags,
	getTagById,
	createTag,
	updateTag,
	deleteTag
}