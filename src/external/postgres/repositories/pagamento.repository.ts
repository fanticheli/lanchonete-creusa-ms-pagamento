import { Pagamento } from '../model/pagamento';
import { PagamentoOutput } from '../../../adapters/pagamento';
import { PagamentoProps } from '../../../entities/props/pagamento.props';
import { IPagamentoGateway } from '../../../interfaces/gateway/pagamento.gateway.interface';

export class PagamentoRepositoryWithSequelize implements IPagamentoGateway {
    async CriarPagamento(pagamentoProps: PagamentoProps): Promise<PagamentoOutput> {
        const pagamentoCriado = await Pagamento.create(pagamentoProps);
        return pagamentoCriado.toJSON() as PagamentoOutput;
    }

    async BuscarPagamentoPorID(pagamentoID: string): Promise<PagamentoOutput | null> {
        const pagamentoEncontrado = await Pagamento.findByPk(pagamentoID);

        if (!pagamentoEncontrado) {
            return null;
        }

        return pagamentoEncontrado.toJSON() as PagamentoOutput;
    }

    async EditarPagamento(pagamentoEditar: PagamentoProps): Promise<PagamentoOutput> {
        const { id, ...rest } = pagamentoEditar;

        const [numRowsUpdated] = await Pagamento.update(rest, {
            where: { id },
            returning: true,
        });

        if (numRowsUpdated === 0) {
            throw new Error('Pagamento não encontrado');
        }

        // Busca novamente o pagamento após a atualização
        const updatedPagamento = await Pagamento.findByPk(id);

        if (!updatedPagamento) {
            throw new Error('Pagamento não encontrado após a atualização');
        }

        return updatedPagamento.toJSON() as  PagamentoOutput;
    }
}