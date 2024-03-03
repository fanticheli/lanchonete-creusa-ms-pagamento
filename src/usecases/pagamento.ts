import axios from 'axios';
import amqp from 'amqplib';
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

		const wasPublished = await PagamentoUseCases.EnviarAprovacaoPagamento(pagamentoEncontrado.numeroPedido, statusPagamento);

		if (!wasPublished) {
			throw new Error("Erro ao enviar pagamento aprovado");
		}

		pagamentoEncontrado.statusPagamento = statusPagamento;

		return pagamentoGatewayInterface.EditarPagamento(pagamentoEncontrado);;
	}

	static async EnviarAprovacaoPagamento(
		numeroPedido: number,
		statusPagamento: StatusPagamentoEnum
	): Promise<boolean> {
		try {
			const connection = await amqp.connect(process.env.QUEUE_HOST || '');
			const channel = await connection.createConfirmChannel();
			const queueName = process.env.QUEUE_PAGAMENTOS_NAME || '';
			await channel.assertQueue(queueName, { durable: true });
			const messageContent = JSON.stringify({ numeroPedido, statusPagamento });
			await channel.sendToQueue(queueName, Buffer.from(messageContent), undefined, (err) => {
				if (err !== null) throw err;
				connection.close();
			});
			return true;
		}
		catch (error) {
			throw error;
		}
	}
}
