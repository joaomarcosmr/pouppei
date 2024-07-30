import api from '../api';

class Transactions{
	static async pegarDadosDasTransacoesPorId(id: number) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('ID inválido');
			}

			api
			.get("transaction/" + id)
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

	static async pegarDadosDasTransacoes() {
		return new Promise((resolve, reject) => {
			api
			.get("transaction")
			.then((response) => {
					resolve(response.data);
			})
			.catch((erros) => {
					console.log(erros)
					reject(erros);
			})
		});
	}

	static async criaTransacao(dados: any) {
		return new Promise((resolve, reject) => {
			api
			.post("transaction", dados)
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

	static async atualizarTransacoes(id: number, dados: any) {
		return new Promise((resolve, reject) => {
			api
			.put("transaction/" + id, dados)
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

	static async deletarTransacoes(id: number) {
		return new Promise((resolve, reject) => {
			api
			.delete("transaction/" + id)
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

export default Transactions;