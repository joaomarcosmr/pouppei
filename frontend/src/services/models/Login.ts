import { ILogin, ILoginResponse, IRegister } from "../../Interfaces/Login";
import api from "../api";

class User{
		static async login({email, password}: ILogin): Promise<ILoginResponse>{
				return new Promise((resolve, reject) => {
						api
						.post("user/login", {email, password})
						.then((response) => {
								localStorage.setItem('token', response.data.token);
								resolve(response.data);
						})
						.catch((erros) => {
								erros.map((erro: string) => {
										console.error(erro)
								})
								reject(erros);
						})
				});
		}

		static async register({username, email, password}: IRegister){
				return new Promise((resolve, reject) => {
						api
						.post("user/register", {username, email, password})
						.then((response) => {
								resolve(response.data);
						})
						.catch((erros) => {
								erros.map((erro: string) => {
										console.error(erro)
								})
								reject(erros);
						})
				});
		}

		static async getUserInfo(){
				return new Promise((resolve, reject) => {
						api
						.get("user")
						.then((response) => {
								resolve(response.data);
						})
						.catch((erros) => {
								erros.map((erro: string) => {
										console.error(erro)
								})
								reject(erros);
						})
				});
		}

		static async logout(){
				localStorage.removeItem('token');
				localStorage.removeItem('usuarioAutenticado');
				window.location.href = '/';
		}
}

export default User;