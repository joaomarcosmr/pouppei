const Transaction = require('../models/Transaction');

const getAllTransactions = async (req, res) => {
	try {
		const user_id = req.user.id;

		const transactions = await Transaction.getAllTransactions(user_id);

		if (!transactions) {
			return res.status(404).json({ message: 'Nenhuma transação encontrada' });
		}

		res.status(200).json(transactions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const getTransactionById = async (req, res) => {
	try {
		const user_id = req.user.id;
		const { id } = req.params;

		const transaction = await Transaction.getTransactionById(id, user_id);

		if (!transaction) {
			return res.status(404).json({ message: 'Transação não encontrada' });
		}

		res.status(200).json(transaction);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const createTransaction = async (req, res) => {
	try {
		const user_id = req.user.id;
		const { category_id, description, amount, date, tag_id, credit_card_id } = req.body;

		const transaction = await Transaction.createTransaction(user_id, category_id, description, amount, date, tag_id, credit_card_id);

		if (!transaction) {
			return res.status(400).json({ message: 'Erro ao criar transação' });
		}

		res.status(201).json(transaction);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const updateTransaction = async (req, res) => {
	try {
		const user_id = req.user.id;
		const { id } = req.params;
		const { category_id, description, amount, date, tag_id, credit_card_id } = req.body;

		const transaction = await Transaction.updateTransaction(id, user_id, category_id, description, amount, date, tag_id, credit_card_id);

		if (!transaction) {
			return res.status(400).json({ message: 'Erro ao atualizar transação' });
		}

		res.status(200).json(transaction);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const deleteTransaction = async (req, res) => {
	try {
		const user_id = req.user.id;
		const { id } = req.params;

		const transaction = await Transaction.deleteTransaction(id, user_id);

		if (!transaction) {
			return res.status(400).json({
				message: 'Erro ao deletar transação'
			});
		}

		res.status(200).json(transaction);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: 'Erro no servidor.',
			error
		});
	}
}


module.exports = { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction };