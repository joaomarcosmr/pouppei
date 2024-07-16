import api from '../api';

class Category{
	static async pegarDadosDaCategoriaPorId(id: number) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('ID inválido');
			}

			api
			.get("categories/" + id)
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

	static async pegarDadosDasCategorias() {
		return new Promise((resolve, reject) => {
			api
			.get("categories")
			.then((response) => {
					resolve(response.data);
			})
			.catch((erros) => {
					console.log(erros)
					reject(erros);
			})
		});
	}

	static async criarCategoria(dados: any) {
		return new Promise((resolve, reject) => {
			api
			.post("categories", dados)
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

	static async atualizarCategoria(id: number, dados: any) {
		return new Promise((resolve, reject) => {
			api
			.put("categories/" + id, dados)
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

	static async deletarCategoria(id: number) {
		return new Promise((resolve, reject) => {
			api
			.delete("categories/" + id)
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

export default Category;