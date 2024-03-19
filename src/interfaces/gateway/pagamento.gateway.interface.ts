import { PagamentoOutput } from "../../adapters/pagamento";
import { PagamentoProps } from "../../entities/props/pagamento.props";

export interface IPagamentoGateway {
    CriarPagamento(pagamentoProps: PagamentoProps): Promise<PagamentoOutput>;
    BuscarPagamentoPorID(pagamentoID: string): Promise<PagamentoOutput | null>;
    EditarPagamento(pagamentoEditar: PagamentoProps): Promise<PagamentoOutput>;
    DeletaPagamentoPorID(pagamentoID: string): Promise<any>;
}