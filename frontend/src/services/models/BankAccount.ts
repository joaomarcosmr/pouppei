import api from '../api';

class BankAccount {
	static async getBankAccountById(id: number) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('ID inválido');
			}

			api
			.get("bankaccount/" + id)
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

	static async getAllBankAccounts() {
		return new Promise((resolve, reject) => {
			api
			.get("bankaccount")
			.then((response) => {
					resolve(response.data);
			})
			.catch((erros) => {
					console.log(erros)
					reject(erros);
			})
		});
	}

	static async createBankAccount(dados: any) {
		return new Promise((resolve, reject) => {
			api
			.post("bankaccount", dados)
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

	static async updateBankAccount(id: number, dados: any) {
		return new Promise((resolve, reject) => {
			api
			.put("bankaccount/" + id, dados)
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

	static async deleteBankAccount(id: number) {
		return new Promise((resolve, reject) => {
			api
			.delete("bankaccount/" + id)
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
}

export default BankAccount;