const Income = require('../models/Income');

const getAllIcomes = async (req, res) => {
	try {
		const incomes = await Income.getAllIncomes();

		if (!incomes) {
			return res.status(404).json({ message: 'Nenhuma categoria encontrada' });
		}

		res.status(200).json(incomes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const getIncomebyId = async (req, res) => {
	try {
		const incomeId = req.params.id

		if (incomeId === undefined) {
			return res.status(400).json({ message: 'ID não informado' })
		}

		const income = await Income.getIncomebyId(incomeId)

		if (!income) {
			return res.status(404).json({ message: 'Categoria não encontrada' })
		}

		res.status(200).json(income)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

const createincome = async (req, res) => {
	try {
		const { name, color, emoji } = req.body

		if (!name || !color || !emoji) {
			return res.status(400).json({ message: 'Preencha todos os campos.' })
		}

		const income = await Income.createIncome(name, color, emoji)

		if (!income) {
			return res.status(400).json({ message: 'Erro ao criar categoria.' })
		}

		res.status(201).json(income)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

const updateIcome = async (req, res) => {
	try {
		const incomeId = req.params.id
		const { name, color, emoji } = req.body

		if (!incomeId) {
			return res.status(400).json({ message: 'ID não informado' })
		}

		if (!name || !color || !emoji) {
			return res.status(400).json({ message: 'Preencha todos os campos.' })
		}

		const income = await Income.updateIncome(incomeId, name, color, emoji)

		if (!income) {
			return res.status(400).json({ message: 'Erro ao atualizar categoria.' })
		}

		res.status(200).json(income)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

const deleteIncome = async (req, res) => {
	try {
		const incomeId = req.params.id

		if (!incomeId) {
			return res.status(400).json({ message: 'ID não informado' })
		}

		const income = await Income.deleteIncome(incomeId)

		if (!income) {
			return res.status(404).json({ message: 'Categoria não encontrada' })
		}

		res.status(200).json(income)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

module.exports = {
	getAllIcomes,
	getIncomebyId,
	createincome,
	updateIcome,
	deleteIncome
}