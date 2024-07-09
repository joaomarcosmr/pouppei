const Category = require("../models/Categories");

const getAllCategories = async (req, res) => {
	try {
		const userId = req.user.id;

		const categories = await Category.getAllCategories(userId);

		if (!categories) {
			return res.status(404).json({ message: "Nenhuma categoria encontrada" });
		}

		res.status(200).json(categories);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erro no servidor.", error });
	}
}

const getCategoryById = async (req, res) => {
	try {
		const userId = req.user.id;
		const categoryId = req.params.id;

		const category = await Category.getCategoryById(categoryId, userId);

		if (!category) {
			return res.status(404).json({ message: "Categoria não encontrada" });
		}

		res.status(200).json(category);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erro no servidor.", error });
	}
}

const createCategory = async (req, res) => {
	try {
		const userId = req.user.id;
		const { name, color, emoji } = req.body;

		if (!name || !color || !emoji) {
			return res.status(400).json({ message: "Preencha todos os campos." });
		}

		const category = await Category.createCategory(userId, name, color, emoji);

		if (!category) {
			return res.status(400).json({
				message: "Erro ao criar categoria."
			})
		}

		res.status(201).json(category);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erro no servidor.", error });
	}
}

const updateCategory = async (req, res) => {
	try {
		const userId = req.user.id;
		const categoryId = req.params.id;
		const { name, color, emoji } = req.body;

		if (!name || !color || !emoji) {
			return res.status(400).json({ message: "Preencha todos os campos." });
		}

		const category = await Category.updateCategory(categoryId, userId, name, color, emoji);

		if (!category) {
			return res.status(400).json({
				message: "Erro ao atualizar categoria."
			})
		}

		res.status(200).json(category);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erro no servidor.", error });
	}
}

const deleteCategory = async (req, res) => {
	try {
		const userId = req.user.id;
		const categoryId = req.params.id;

		const deleted = await Category.deleteCategory(categoryId, userId);

		if (!deleted) {
			return res.status(400).json({ message: "Erro ao deletar categoria." });
		}

		res.status(204).json({ message: "Categoria deletada com sucesso." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erro no servidor.", error });
	}
}

module.exports = {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory
}