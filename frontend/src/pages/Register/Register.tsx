import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import User from '../../services/models/Login';

const Register: React.FC = () => {
	const [infoUsers, setInfoUsers] = useState({ username: '', email: '', password: '' });
	const navigate = useNavigate();

	const handleRegister = (e: React.FormEvent) => {
		e.preventDefault();

		User.register(infoUsers)
			.then((response) => {
				console.log(response);
				navigate('/login');
			})
			.catch((error) => {
				console.error("Registration failed:", error);
			});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInfoUsers((prevInfoUsers) => ({
			...prevInfoUsers,
			[name]: value
		}));
	};

	console.log(infoUsers)

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<div className="flex justify-center mb-6">
					<img src="logo.png" alt="Pouppei" className="h-12" />
				</div>
				<h2 className="text-center text-2xl font-bold mb-6">Registre sua conta</h2>
				<div className="flex items-center my-4">
					<hr className="flex-grow border-t border-gray-300" />
					<span className="mx-2 text-gray-400">ou</span>
					<hr className="flex-grow border-t border-gray-300" />
				</div>
				<form onSubmit={handleRegister}>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="username">Seu nome</label>
						<input
							id="username"
							name="username"
							type="text"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="Seu primeiro nome"
							onChange={handleInputChange}
							value={infoUsers.username}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="email">Seu email</label>
						<input
							id="email"
							name="email"
							type="email"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="Seu email"
							onChange={handleInputChange}
							value={infoUsers.email}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700" htmlFor="password">Sua senha</label>
						<input
							id="password"
							name="password"
							type="password"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							placeholder="Sua senha"
							onChange={handleInputChange}
							value={infoUsers.password}
						/>
					</div>
					<div className="text-right mb-4">
						<Link to="/forgot-password" className="text-blue-500">Esqueci minha senha</Link>
					</div>
					<button
						type="submit"
						className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
					>
						Registrar
					</button>
				</form>
				<div className="text-center mt-6">
					<Link to="/login" className="text-blue-500">Ainda não possui conta? Faça o cadastro!</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
