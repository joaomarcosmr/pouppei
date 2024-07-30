const BankAccount = require('../models/BankAccount')

const getAllBankAccounts = async (req, res) => {
	try {
		const userId = req.user.id;

		const bankAccount = await BankAccount.getAllBankAccount(userId);

		if (!bankAccount) {
			return res.status(404).json({ message: 'Nenhum banco encontrado' });
		}

		res.status(200).json(bankAccount);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const getBankAccountById = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;

		const bankAccount = await BankAccount.getBankAccountById(id, userId);

		if (!bankAccount) {
			return res.status(404).json({ message: 'Banco não encontrado' });
		}

		res.status(200).json(bankAccount);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const createBankAccount = async (req, res) => {
	try {
		const userId = req.user.id;
		const { name, icon, add_general_balance, balance } = req.body;

		const bankAccount = await BankAccount.createBankAccount(userId, name, icon, add_general_balance, balance);

		if (!bankAccount) {
			return res.status(400).json({ message: 'Erro ao criar banco' });
		}

		res.status(201).json(bankAccount);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const updateBankAccount = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;
		const { name, icon, credit_limit, due_date, invoice } = req.body;

		const bankAccount = await BankAccount.updateBankAccount(id, userId, name, icon, credit_limit, due_date, invoice);

		if (!bankAccount) {
			return res.status(400).json({ message: 'Erro ao atualizar banco' });
		}

		res.status(200).json(bankAccount);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const deleteBankAccount = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;

		const bankAccount = await BankAccount.deleteBankAccount(id, userId);

		if (!bankAccount) {
			return res.status(400).json({ message: 'Erro ao deletar banco' });
		}

		res.status(200).json({ message: 'Banco deletado com sucesso' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

module.exports = {
	getAllBankAccounts,
	getBankAccountById,
	createBankAccount,
	updateBankAccount,
	deleteBankAccount
};