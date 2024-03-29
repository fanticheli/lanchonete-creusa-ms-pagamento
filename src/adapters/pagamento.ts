import { StatusPagamentoEnum } from "../common/enum/status-pagamento-enum";

export interface PagamentoOutput {
    id?: string;
    valorTotal: number;
    numeroPedido: number;
    statusPagamento?: StatusPagamentoEnum;
    codigoPix?: string;
}