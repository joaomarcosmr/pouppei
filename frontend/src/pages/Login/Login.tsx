import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import User from '../../services/models/Login';
import { ILogin } from '../../Interfaces/Login';

const Login: React.FC = () => {
	const [infoUsers, setInfoUsers] = useState<ILogin>({ email: '', password: '' });
	const navigate = useNavigate();

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		User.login(infoUsers)
			.then(() => {
				navigate('/');
			})
			.catch((error) => {
				console.error("Login failed:", error);
			});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInfoUsers((prevInfoUsers) => ({
			...prevInfoUsers,
			[name]: value
		}));
	};

	console.log(infoUsers);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<div className="flex justify-center mb-6">
					<img src="logo.png" alt="Pouppei" className="h-12" />
				</div>
				<h2 className="text-center text-2xl font-bold mb-6">Acesse sua conta</h2>
				<div className="flex items-center my-4">
					<hr className="flex-grow border-t border-gray-300" />
					<span className="mx-2 text-gray-400">ou</span>
					<hr className="flex-grow border-t border-gray-300" />
				</div>
				<form onSubmit={handleLogin}>
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
						<a href="#" className="text-blue-500">Esqueci minha senha</a>
					</div>
					<button
						type="submit"
						className="w-full p-2 bg-purple-600 text-white rounded hover:bg-purple-700"
					>
						Entrar
					</button>
				</form>
				<div className="text-center mt-6">
					<NavLink to="/register" className="text-blue-500">Ainda não possui conta? Faça o cadastro!</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Login;
