import { StatusPagamentoEnum } from "../../src/common/enum/status-pagamento-enum";
import { PagamentoProps } from "../../src/entities/props/pagamento.props";
import { PagamentoRepositoryInMemory } from "../../src/external/memory/pagamento.repository";
import { PagamentoUseCases } from "../../src/usecases/pagamento";

describe("Pagamento", () => {
	const pagamentoRepository = new PagamentoRepositoryInMemory();

	test("Deve criar um pagamento", async () => {
		const pagamentoProps: PagamentoProps = {
			valorTotal: 0,
			statusPagamento: StatusPagamentoEnum.PENDENTE
		};

		const novoPagamento = await PagamentoUseCases.CriarPagamento(
			pagamentoRepository,
			pagamentoProps
		);

		expect(novoPagamento).toBeDefined();
		expect(novoPagamento.id).toBe("01");
		expect(novoPagamento.valorTotal).toBe(0);
		expect(novoPagamento.statusPagamento).toBe(StatusPagamentoEnum.PENDENTE);
	});

	test("Deve buscar um pagamento por ID", async () => {
		const pagamentoEncontrado = await PagamentoUseCases.BuscarPagamentoPorID(
			pagamentoRepository,
			"01"
		);

		expect(pagamentoEncontrado).toBeDefined();
		expect(pagamentoEncontrado?.id).toBe("01");
		expect(pagamentoEncontrado?.valorTotal).toBe(0);
		expect(pagamentoEncontrado?.statusPagamento).toBe(
			StatusPagamentoEnum.PENDENTE
		);
	});

	test("Deve aprovar o pagamento", async () => {
		const pagamentoAprovado = await PagamentoUseCases.AlterarStatusPagamento(
			pagamentoRepository,
			"01",
			StatusPagamentoEnum.NEGADO
		);

		expect(pagamentoAprovado).toBeDefined();
		expect(pagamentoAprovado?.id).toBe("01");
		expect(pagamentoAprovado?.valorTotal).toBe(0);
		expect(pagamentoAprovado?.statusPagamento).toBe(
			StatusPagamentoEnum.NEGADO
		);
	});

	test("Deve alterar o status de um pagamento", async () => {
		const pagamentoEmPreparo = await PagamentoUseCases.AlterarStatusPagamento(
			pagamentoRepository,
			"01",
			StatusPagamentoEnum.NEGADO
		);

		expect(pagamentoEmPreparo).toBeDefined();
		expect(pagamentoEmPreparo?.id).toBe("01");
		expect(pagamentoEmPreparo?.valorTotal).toBe(0);
		expect(pagamentoEmPreparo?.statusPagamento).toBe(
			StatusPagamentoEnum.NEGADO
		);
	})

});
