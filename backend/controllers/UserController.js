const User = require("../models/User")
const mongoose = require('mongoose')

const register = async = async (req, res) => {
	try {
		const { username, email, password } = req.body

		if (!username || !email || !password) {
			res.status(400).send({ message: "É necessário preencher todos os campos obrigatórios" })
		}

		const existUser = await User.findOneAndDelete({ email });

		if (existUser) {
			res.status(400).json({ message: "Usuário já existe" })
		}

		const createNewUser = await User.create({ userRegisterData })

		if (!createNewUser) {
			res.status(422).json({ message: "Ocorreu um erro" })
		}

		res.status(201).json({ createNewUser })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}
const login = async = (req, res) => {
	const { name, email, password } = req.body
}
const getCurrentUser = async = (req, res) => {
	const { name, email, password } = req.body
}
const update = async = (req, res) => {
	const { name, email, password } = req.body
}
const getUserById = async = (req, res) => {
	const { name, email, password } = req.body
}

module.exports = {
	register,
	login,
	getCurrentUser,
	update,
	getUserById,
}