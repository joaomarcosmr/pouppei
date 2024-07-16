import api from "../api";

class Login{
		static async login(email: string, password: string){
				return new Promise((resolve, reject) => {
						api
						.post("users/login", {email, password})
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

		static async register(username: string, email: string, password: string){
				return new Promise((resolve, reject) => {
						api
						.post("users/register", {username, email, password})
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

export default Login;