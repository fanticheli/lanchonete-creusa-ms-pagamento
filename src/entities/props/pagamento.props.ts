import { StatusPagamentoEnum } from "../../common/enum/status-pagamento-enum";

export type PagamentoProps = {
    id?: string;
    valorTotal: number;
    statusPagamento: StatusPagamentoEnum;
};