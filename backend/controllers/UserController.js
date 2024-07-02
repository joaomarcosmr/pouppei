const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	try {
		const { username, email, password, ...data } = req.body;

		if (!username || !email || !password) {
			return res.status(400).send({ message: "É necessário preencher todos os campos obrigatórios" });
		}

		const existUser = await User.findOne({ email });

		if (existUser) {
			return res.status(400).json({ message: "Usuário já existe" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const createNewUser = await User.create({
			username,
			email,
			password: hashedPassword,
			data
		});

		if (!createNewUser) {
			return res.status(422).json({ message: "Ocorreu um erro" });
		}

		res.status(201).json({ message: "Usuário criado com sucesso!" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(422).json({ message: "É preciso informar o campo de e-mail ou senha" })
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: "Usuário não encontrado" });
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return res.status(401).json({ message: "Credenciais inválidas" })
		}

		const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' });

		return res.status(200).json({ token })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Erro no servidor.', error });
	}
};

const getCurrentUser = async (req, res) => {
	// Implementação para obter o usuário atual
};

const update = async (req, res) => {
	// Implementação para atualizar usuário
};

const getUserById = async (req, res) => {
	// Implementação para obter usuário por ID
};

module.exports = {
	register,
	login,
	getCurrentUser,
	update,
	getUserById,
};
