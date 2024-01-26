import axios from "axios";
import { StatusPagamentoEnum } from "../../src/common/enum/status-pagamento-enum";
import { PagamentoProps } from "../../src/entities/props/pagamento.props";
import { PagamentoRepositoryInMemory } from "../../src/external/memory/pagamento.repository";
import { PagamentoUseCases } from "../../src/usecases/pagamento";
jest.mock('axios');
describe("Pagamento", () => {
	let pagamentoRepository = new PagamentoRepositoryInMemory();

	beforeEach(async () => {
		pagamentoRepository = new PagamentoRepositoryInMemory();
		process.env.MS_PEDIDO_URL = 'http://localhost:3000';
	})

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
		const pagamentoProps: PagamentoProps = {
			valorTotal: 0,
			statusPagamento: StatusPagamentoEnum.PENDENTE
		};

		await PagamentoUseCases.CriarPagamento(
			pagamentoRepository,
			pagamentoProps
		);

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

	test("Deve buscar um pagamento por ID, error: Pagamento não encontrado", async () => {
		try {
			await PagamentoUseCases.BuscarPagamentoPorID(
				pagamentoRepository,
				"01"
			);
		} catch (error: any) {
			expect(error.message).toBe("Pagamento não encontrado");
		}
	});

	test("Deve aprovar o pagamento", async () => {
		const pagamentoProps: PagamentoProps = {
			valorTotal: 0,
			statusPagamento: StatusPagamentoEnum.PENDENTE
		};

		await PagamentoUseCases.CriarPagamento(
			pagamentoRepository,
			pagamentoProps
		);

		const mockResponse = {
			data: {
				"statusPagamento": "aprovado"
			},
		};

		(axios.put as jest.Mock).mockImplementation(() => Promise.resolve(mockResponse));

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

	test("Deve aprovar o pagamento, Status de pagamento inválido", async () => {
		try {
			await PagamentoUseCases.AlterarStatusPagamento(
				pagamentoRepository,
				"01",
				"" as any
			);
		} catch (error: any) {
			expect(error.message).toBe("Status de pagamento inválido");
		}
		
	});

	test("Deve aprovar o pagamento, Pagamento não encontrado", async () => {
		try {
			await PagamentoUseCases.AlterarStatusPagamento(
				pagamentoRepository,
				"01",
				StatusPagamentoEnum.NEGADO
			);
		} catch (error: any) {
			expect(error.message).toBe("Pagamento não encontrado");
		}
	});

	test("Deve alterar o status de um pagamento", async () => {
		const pagamentoProps: PagamentoProps = {
			valorTotal: 0,
			statusPagamento: StatusPagamentoEnum.PENDENTE
		};

		await PagamentoUseCases.CriarPagamento(
			pagamentoRepository,
			pagamentoProps
		);
		
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

	test("Deve alterar o status de um pagamento, Webhook de pedidos não configurado", async () => {
		process.env.MS_PEDIDO_URL = '';
		const pagamentoProps: PagamentoProps = {
			valorTotal: 0,
			statusPagamento: StatusPagamentoEnum.PENDENTE
		};

		await PagamentoUseCases.CriarPagamento(
			pagamentoRepository,
			pagamentoProps
		);
		
		try {
			await PagamentoUseCases.AlterarStatusPagamento(
				pagamentoRepository,
				"01",
				StatusPagamentoEnum.NEGADO
			);
		} catch (error: any) {
			expect(error.message).toBe('Webhook de pedidos não configurado');
		}
	})

	test("Deve alterar o status de um pagamento, Não foi possível chamar o webhook de pedido", async () => {
		const pagamentoProps: PagamentoProps = {
			valorTotal: 0,
			statusPagamento: StatusPagamentoEnum.PENDENTE
		};

		await PagamentoUseCases.CriarPagamento(
			pagamentoRepository,
			pagamentoProps
		);
		
		try {
			await PagamentoUseCases.AlterarStatusPagamento(
				pagamentoRepository,
				"01",
				StatusPagamentoEnum.NEGADO
			);
		} catch (error: any) {
			expect(error.message).toBe('Não foi possível chamar o webhook de pedido');
		}
	})

});
