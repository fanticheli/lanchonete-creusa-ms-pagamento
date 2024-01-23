import crypto from 'crypto';

import { StatusPagamentoEnum } from "../common/enum/status-pagamento-enum";
import { PagamentoProps } from "./props/pagamento.props";


export class Pagamento {
	private _id?: string | undefined;
	private _valorTotal: number;
	private _statusPagamento: StatusPagamentoEnum;
	private _codigoPix: string;

	constructor(pagamentoProps: PagamentoProps) {
		this._id = pagamentoProps.id || undefined;
		this._valorTotal = pagamentoProps.valorTotal || 0;
		this._statusPagamento =
			pagamentoProps.statusPagamento || StatusPagamentoEnum.PENDENTE;
		this._codigoPix = crypto.randomBytes(20).toString('hex');
	}

	get id(): string | undefined {
		return this._id;
	}

	get valorTotal(): number {
		return this._valorTotal;
	}

	get statusPagamento(): StatusPagamentoEnum {
		return this._statusPagamento;
	}

	get codigoPix(): string {
		return this._codigoPix;
	}

	set id(id: string) {
		this._id = id;
	}

	set valorTotal(valorTotal: number) {
		this._valorTotal = valorTotal;
	}

	set statusPagamento(statusPagamento: StatusPagamentoEnum) {
		this._statusPagamento = statusPagamento;
	}

	set codigoPix(codigoPix: string) {
		this._codigoPix = codigoPix;
	}

	get object() {
		return {
			id: this._id,
			valorTotal: this._valorTotal,
			statusPagamento: this._statusPagamento,
			codigoPix: this._codigoPix,
		};
	}
}
