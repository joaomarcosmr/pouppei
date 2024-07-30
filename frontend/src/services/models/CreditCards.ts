import api from '../api';

class CreditCard{
	static async pegarDadosCreditCardsPorId(id: number) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('ID inválido');
			}

			api
			.get("creditcard/" + id)
			.then((response) => {
					resolve(response);
			})
			.catch((erros) => {
					erros.map((erro: string) => {
							console.error(erro)
					})
					reject(erros);
			})
		});
	}

	static async pegarDadosCreditCards() {
		return new Promise((resolve, reject) => {
			api
			.get("creditcard")
			.then((response) => {
					resolve(response.data);
			})
			.catch((erros) => {
					console.log(erros)
					reject(erros);
			})
		});
	}

	static async createCreditCard(dados: any) {
		return new Promise((resolve, reject) => {
			api
			.post("creditcard", dados)
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

	static async atualizarCreditCard(id: number, dados: any) {
		return new Promise((resolve, reject) => {
			api
			.put("creditcard/" + id, dados)
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

	static async deletarCreditCard(id: number) {
		return new Promise((resolve, reject) => {
			api
			.delete("creditcard/" + id)
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

export default CreditCard;