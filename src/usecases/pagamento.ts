import { PagamentoOutput } from "../adapters/pagamento";
import { StatusPagamentoEnum } from "../common/enum/status-pagamento-enum";
import { Pagamento } from "../entities/pagamento.entity";
import { PagamentoProps } from "../entities/props/pagamento.props";
import { IPagamentoGateway } from "../interfaces/gateway/pagamento.gateway.interface";

export class PagamentoUseCases {
	static async CriarPagamento(
		pagamentoGatewayInterface: IPagamentoGateway,
		pagamentoProps: PagamentoProps
	) {
		const novoPagamento = new Pagamento(pagamentoProps);

		return pagamentoGatewayInterface.CriarPagamento(novoPagamento.object);
	}

	static async BuscarPagamentoPorID(
		pagamentoGatewayInterface: IPagamentoGateway,
		pagamentoID: string
	): Promise<PagamentoOutput | null> {
		const pagamentoEncontrado = await pagamentoGatewayInterface.BuscarPagamentoPorID(
			pagamentoID
		);

		if (!pagamentoEncontrado) {
			throw new Error("Pagamento não encontrado");
		}

		return pagamentoEncontrado;
	}

	static async AlterarStatusPagamento(
		pagamentoGatewayInterface: IPagamentoGateway,
		pagamentoID: string,
		statusPagamento: StatusPagamentoEnum
	): Promise<PagamentoOutput> {
		if (!Object.values(StatusPagamentoEnum).includes(statusPagamento)) {
			throw new Error("Status de pagamento inválido");
		}

		const pagamentoEncontrado = await pagamentoGatewayInterface.BuscarPagamentoPorID(
			pagamentoID
		);

		if (!pagamentoEncontrado) {
			throw new Error("Pagamento não encontrado");
		}

		pagamentoEncontrado.statusPagamento = statusPagamento;

		const pagamentoEditado = await pagamentoGatewayInterface.EditarPagamento(pagamentoEncontrado);

		delete pagamentoEditado.codigoPix;

		return pagamentoEditado;
	}
}
