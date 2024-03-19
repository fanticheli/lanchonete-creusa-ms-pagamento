import { PagamentoOutput } from "../../adapters/pagamento";
import { StatusPagamentoEnum } from "../../common/enum/status-pagamento-enum";
import { Pagamento } from "../../entities/pagamento.entity";
import { PagamentoProps } from "../../entities/props/pagamento.props";
import { IPagamentoGateway } from "../../interfaces/gateway/pagamento.gateway.interface";

export class PagamentoRepositoryInMemory implements IPagamentoGateway {
	private pagamentos: Pagamento[] = [];

	constructor() {}

	async CriarPagamento(pagamentoProps: PagamentoProps): Promise<PagamentoOutput> {
		const pagamento = new Pagamento(pagamentoProps);
		pagamento.id = this.pagamentos.length.toString() + 1;
		this.pagamentos.push(pagamento);
		return pagamento.object;
	}

	async BuscarPagamentoPorID(pagamentoID: string): Promise<PagamentoOutput | null> {
		const pagamentoEncontrado = this.pagamentos.find(
			(pagamento) => pagamento.id === pagamentoID
		);

		if (!pagamentoEncontrado) {
			throw new Error("Pagamento não encontrado");
		}

		return pagamentoEncontrado.object;
	}

	async EditarPagamento(editarPagamentoDTO: PagamentoProps): Promise<PagamentoOutput> {
		if (!editarPagamentoDTO.id) {
			throw new Error("ID do Pagamento não informado");
		}

		this.pagamentos.map((pagamento) => {
			if (pagamento.id === editarPagamentoDTO.id) {
				pagamento.statusPagamento = editarPagamentoDTO.statusPagamento || StatusPagamentoEnum.PENDENTE;
			}
		});

		return editarPagamentoDTO;
	}

	async DeletaPagamentoPorID(pagamentoID: string): Promise<any> {
		const pagamentoEncontrado = this.pagamentos.find(
			(pagamento) => pagamento.id === pagamentoID
		);

		if (!pagamentoEncontrado) {
			throw new Error("Pagamento não encontrado");
		}

		this.pagamentos = this.pagamentos.filter(
			(pagamento) => pagamento.id !== pagamentoID
		);

		return true;
	}
}
