const Income = require('../models/Income');

const getAllIncomes = async (req, res) => {
	try {
		const userId = req.user.id;

		const incomes = await Income.getAllincome(userId);

		if (!incomes) {
			return res.status(404).json({ message: 'Nenhuma receita encontrada' });
		}

		res.status(200).json(incomes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const getIncomebyId = async (req, res) => {
	try {
		const userId = req.user.id;
		const incomeId = req.params.id

		if (incomeId === undefined) {
			return res.status(400).json({ message: 'ID não informado' })
		}

		const income = await Income.getIncomebyId(incomeId, userId)

		if (!income) {
			return res.status(404).json({ message: 'Receita não encontrada' })
		}

		res.status(200).json(income)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

const createincome = async (req, res) => {
	try {
		const userId = req.user.id;
		const { name, color, emoji } = req.body

		if (!name || !color || !emoji) {
			return res.status(400).json({ message: 'Preencha todos os campos.' })
		}

		const income = await Income.createIncome(userId, name, color, emoji)

		if (!income) {
			return res.status(400).json({ message: 'Erro ao criar receita.' })
		}

		res.status(201).json(income)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

const updateIcome = async (req, res) => {
	try {
		const userId = req.user.id;
		const incomeId = req.params.id
		const { name, color, emoji } = req.body

		if (!incomeId) {
			return res.status(400).json({ message: 'ID não informado' })
		}

		if (!name || !color || !emoji) {
			return res.status(400).json({ message: 'Preencha todos os campos.' })
		}

		const income = await Income.updateIncome(incomeId, userId, name, color, emoji)

		if (!income) {
			return res.status(400).json({ message: 'Erro ao atualizar receita.' })
		}

		res.status(200).json(income)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

const deleteIncome = async (req, res) => {
	try {
		const userId = req.user.id;
		const incomeId = req.params.id

		if (!incomeId) {
			return res.status(400).json({ message: 'ID não informado' })
		}

		const income = await Income.deleteIncome(incomeId, userId)

		if (!income) {
			return res.status(404).json({ message: 'Receita não encontrada' })
		}

		res.status(200).json({ message: "Receita deletada!" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

module.exports = {
	getAllIncomes,
	getIncomebyId,
	createincome,
	updateIcome,
	deleteIncome
}