const CreditCard = require('../models/CreditCard')

const getAllCreditCards = async (req, res) => {
	try {
		const userId = req.user.id;

		const creditCards = await CreditCard.getAllCreditCards(userId);

		if (!creditCards) {
			return res.status(404).json({ message: 'Nenhum cartão encontrado' });
		}

		res.status(200).json(creditCards);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const getCreditCardById = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;

		const creditCard = await CreditCard.getCreditCardById(id, userId);

		if (!creditCard) {
			return res.status(404).json({ message: 'Cartão não encontrado' });
		}

		res.status(200).json(creditCard);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const createCreditCard = async (req, res) => {
	try {
		const userId = req.user.id;
		const { name, icon, credit_limit, due_date, invoice } = req.body;

		const creditCard = await CreditCard.createCreditCard(userId, name, icon, credit_limit, due_date, invoice);

		if (!creditCard) {
			return res.status(400).json({ message: 'Erro ao criar cartão' });
		}

		res.status(201).json(creditCard);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const updateCreditCard = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;
		const { name, icon, credit_limit, due_date, invoice } = req.body;

		const creditCard = await CreditCard.updateCreditCard(id, userId, name, icon, credit_limit, due_date, invoice);

		if (!creditCard) {
			return res.status(400).json({ message: 'Erro ao atualizar cartão' });
		}

		res.status(200).json(creditCard);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const deleteCreditCard = async (req, res) => {
	try {
		const userId = req.user.id;
		const { id } = req.params;

		const creditCard = await CreditCard.deleteCreditCard(id, userId);

		if (!creditCard) {
			return res.status(400).json({ message: 'Erro ao deletar cartão' });
		}

		res.status(200).json({ message: 'Cartão deletado com sucesso' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

module.exports = {
	getAllCreditCards,
	getCreditCardById,
	createCreditCard,
	updateCreditCard,
	deleteCreditCard
};