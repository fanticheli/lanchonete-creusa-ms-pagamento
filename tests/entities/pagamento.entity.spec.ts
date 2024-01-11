import { StatusPagamentoEnum } from "../../src/common/enum/status-pagamento-enum";
import { Pagamento } from "../../src/entities/pagamento.entity";
import { PagamentoProps } from "../../src/entities/props/pagamento.props";

describe("Pagamento", () => {
	it("should be defined", () => {
		expect(true).toBeDefined();
	});

	it("Create a new Pagamento", () => {
		const pagamentoProps: PagamentoProps = {
      id: "01",
			valorTotal: 0,
			statusPagamento: StatusPagamentoEnum.PENDENTE
		};

		const pagamento = new Pagamento(pagamentoProps);
		expect(pagamento).toBeInstanceOf(Pagamento);
		expect(pagamento.id).toBe("01");
		expect(pagamento.valorTotal).toBe(0);
	});
});
