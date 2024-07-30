import api from '../api';

class TagsDescriptions{
	static async pegarDadosDasTagsPorId(id: number) {
		return new Promise((resolve, reject) => {
			if (!id) {
				reject('ID inválido');
			}

			api
			.get("tags/" + id)
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

	static async pegarDadosDasTag() {
		return new Promise((resolve, reject) => {
			api
			.get("tags")
			.then((response) => {
					resolve(response.data);
			})
			.catch((erros) => {
					console.log(erros)
					reject(erros);
			})
		});
	}

	static async criaTag(dados: any) {
		return new Promise((resolve, reject) => {
			api
			.post("tags", dados)
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

	static async atualizarTags(id: number, dados: any) {
		return new Promise((resolve, reject) => {
			api
			.put("tags/" + id, dados)
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

	static async deletarTag(id: number) {
		return new Promise((resolve, reject) => {
			api
			.delete("tags/" + id)
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

export default TagsDescriptions;