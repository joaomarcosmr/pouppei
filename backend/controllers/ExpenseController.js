const Expense = require('../models/Expense');

const getAllExpense = async (req, res) => {
	try {
		const userId = req.user.id;

		const expenses = await Expense.getAllExpense(userId);

		if (!expenses) {
			return res.status(404).json({ message: 'Nenhuma despesa encontrada' });
		}

		res.status(200).json(expenses);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const getExpenseById = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;

		const expense = await Expense.getExpenseById(id, userId);

		if (!expense) {
			return res.status(404).json({ message: 'Despesa não encontrada' });
		}

		res.status(200).json(expense);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const createExpense = async (req, res) => {
	try {
		const userId = req.user.id;
		const { name, icon } = req.body;

		const expense = await Expense.createExpense(userId, name, icon);

		if (!expense) {
			return res.status(400).json({ message: 'Erro ao criar despesa' });
		}

		res.status(201).json(expense);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const updateExpense = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;
		const { name, icon } = req.body;

		const expense = await Expense.updateExpense(id, userId, name, icon);

		if (!expense) {
			return res.status(400).json({ message: 'Erro ao atualizar despesa' });
		}

		res.status(200).json(expense);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const deleteExpense = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;

		const expense = await Expense.deleteExpense(id, userId);

		if (!expense) {
			return res.status(400).json({ message: 'Erro ao deletar despesa' });
		}

		res.status(200).json({ message: 'Despesa deletada com sucesso' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

module.exports = {
	getAllExpense,
	getExpenseById,
	createExpense,
	updateExpense,
	deleteExpense
}

