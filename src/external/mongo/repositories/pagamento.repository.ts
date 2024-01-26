import { ObjectId } from "mongodb";
import { PagamentoOutput } from "../../../adapters/pagamento";
import { PagamentoProps } from "../../../entities/props/pagamento.props";
import { IPagamentoGateway } from "../../../interfaces/gateway/pagamento.gateway.interface";
import { PagamentoMongo } from "../model/pagamento";

export class PagamentoRepositoryInMongo implements IPagamentoGateway {
	private _model;

	constructor() {
		this._model = PagamentoMongo;
	}

	async CriarPagamento(pagamentoProps: PagamentoProps): Promise<PagamentoOutput> {
		return this._model.create(pagamentoProps);
	}

	async BuscarPagamentoPorID(pagamentoID: string): Promise<PagamentoOutput | null> {
		if (!ObjectId.isValid(pagamentoID)) {
			throw new Error("ID inválido");
		}

		const pagamentoEncontrado = await this._model.findById(pagamentoID);

		if (!pagamentoEncontrado) {
			return null;
		}

		return pagamentoEncontrado;
	}

	async EditarPagamento(pagamentoEditar: PagamentoProps): Promise<PagamentoOutput> {
		if (!pagamentoEditar.id || !ObjectId.isValid(pagamentoEditar.id)) {
			throw new Error("ID inválido");
		}

		return this._model.findByIdAndUpdate(pagamentoEditar.id, pagamentoEditar, {
			new: true,
		});
	}
}
