import { PagamentoOutput } from "../adapters/pagamento";
import { StatusPagamentoEnum } from "../common/enum/status-pagamento-enum";
import { PagamentoProps } from "../entities/props/pagamento.props";
import { IPagamentoGateway } from "../interfaces/gateway/pagamento.gateway.interface";
import { PagamentoUseCases } from "../usecases/pagamento";

export class PagamentoController {
	static async CriarPagamento(
		pagamentoGatewayInterface: IPagamentoGateway,
		pagamentoProps: PagamentoProps
	): Promise<PagamentoOutput> {
		try {
			return await PagamentoUseCases.CriarPagamento(
				pagamentoGatewayInterface,
				pagamentoProps
			);
		} catch (error) {
			throw error;
		}
	}

	static async BuscarPagamentoPorID(
		pagamentoGatewayInterface: IPagamentoGateway,
		pagamentoID: string
	): Promise<PagamentoOutput | null> {
		try {
			return await PagamentoUseCases.BuscarPagamentoPorID(
				pagamentoGatewayInterface,
				pagamentoID
			);
		} catch (error) {
			throw error;
		}
	}

	static async AlterarStatusPagamento(
		pagamentoGatewayInterface: IPagamentoGateway,
		pagamentoID: string,
		statusPagamento: StatusPagamentoEnum
	): Promise<PagamentoOutput | null> {
		try {
			return await PagamentoUseCases.AlterarStatusPagamento(
				pagamentoGatewayInterface,
				pagamentoID,
				statusPagamento
			);
		} catch (error) {
			throw error;
		}
	}

	static async DeletaPagamentoPorID(
		pagamentoGatewayInterface: IPagamentoGateway,
		pagamentoID: string
	): Promise<boolean> {
		try {
			return await PagamentoUseCases.DeletaPagamentoPorID(
				pagamentoGatewayInterface,
				pagamentoID
			);
		} catch (error) {
			throw error;
		}
	}
}
