const Revenue = require('../models/Revenue');

const getAllRevenue = async (req, res) => {
	try {
		const userId = req.user.id;

		const revenue = await Revenue.getAllRevenue(userId);

		if (!revenue) {
			return res.status(404).json({ message: 'Nenhuma receita encontrada' });
		}

		res.status(200).json(revenue);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const getRevenuebyId = async (req, res) => {
	try {
		const userId = req.user.id;
		const revenueId = req.params.id

		if (revenueId === undefined) {
			return res.status(400).json({ message: 'ID não informado' })
		}

		const revenue = await Revenue.getRevenuebyId(revenueId, userId)

		if (!revenue) {
			return res.status(404).json({ message: 'Receita não encontrada' })
		}

		res.status(200).json(revenue)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

const createRevenue = async (req, res) => {
	try {
		const userId = req.user.id;
		const { name, icon } = req.body

		if (!name || !icon) {
			return res.status(400).json({ message: 'Preencha todos os campos.' })
		}

		const revenue = await Revenue.createRevenue(userId, name, icon)

		if (!revenue) {
			return res.status(400).json({ message: 'Erro ao criar receita.' })
		}

		res.status(201).json(revenue)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

const updateRevenue = async (req, res) => {
	try {
		const userId = req.user.id;
		const revenueId = req.params.id
		const { name, icon } = req.body

		if (!revenueId) {
			return res.status(400).json({ message: 'ID não informado' })
		}

		if (!name || !icon) {
			return res.status(400).json({ message: 'Preencha todos os campos.' })
		}

		const revenue = await Revenue.updateRevenue(revenueId, userId, name, icon)

		if (!revenue) {
			return res.status(400).json({ message: 'Erro ao atualizar receita.' })
		}

		res.status(200).json(revenue)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

const deleteRevenue = async (req, res) => {
	try {
		const userId = req.user.id;
		const revenueId = req.params.id

		if (!revenueId) {
			return res.status(400).json({ message: 'ID não informado' })
		}

		const revenue = await Revenue.deleteRevenue(revenueId, userId)

		if (!revenue) {
			return res.status(404).json({ message: 'Receita não encontrada' })
		}

		res.status(200).json({ message: "Receita deletada!" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Erro no servidor.', error })
	}
}

module.exports = {
	getAllRevenue,
	getRevenuebyId,
	createRevenue,
	updateRevenue,
	deleteRevenue
}