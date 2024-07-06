const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/auth');

const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).send({ message: "É necessário preencher todos os campos obrigatórios" });
		}

		const existUser = await User.findUserByEmail(email)

		if (existUser) {
			return res.status(400).json({ message: "Usuário já existe" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const createNewUser = await User.createUser(username, email, hashedPassword);

		if (!createNewUser) {
			return res.status(422).json({ message: "Ocorreu um erro" });
		}

		res.status(201).json({ message: "Usuário criado com sucesso!", user: createNewUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email, !password) {
			res.status(400).json({ message: "É necessário preencher todos os campos!" })
		}

		const userExists = await User.findUserByEmail(email)

		if (!userExists) {
			res.status(400).json({ message: "Usuário ou senha inválidos!" })
		}

		const isPasswordValid = await bcrypt.compare(password, userExists.password);

		if (!isPasswordValid) {
			res.status(400).json({ message: "Usuário ou senha inválidos!" })
		}

		const token = generateToken(userExists)

		res.status(200).json({ message: "Logado com sucesso", token })
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

const getUserInfo = async (req, res) => {
	try {
		const userId = req.user.id

		const user = await User.getUserById(userId)

		if (!user) {
			return res.status(404).json({ message: "Usuário não existe." })
		}

		res.status(200).json(user)

	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
}

module.exports = {
	register,
	login,
	getUserInfo
};