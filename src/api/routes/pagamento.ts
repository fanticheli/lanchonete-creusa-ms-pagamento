import express, { Request, Response } from "express";
import { PagamentoController } from "../../controllers/pagamento.controller";
import { PagamentoRepositoryInMongo } from "../../external/mongo/repositories/pagamento.repository";
import { PagamentoOutput } from "../../adapters/pagamento";

const router = express.Router();
const pagamentoRepositoryInMongo = new PagamentoRepositoryInMongo();

/**
 * @swagger
 * tags:
 *   name: Pagamento
 */

/**
 * @swagger
 * /api/pagamentos:
 *   post:
 *     summary: Cria um novo Pagamento.
 *     tags: [Pagamento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *             example:
 *               valorTotal: 50.00
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso.
 */
router.post("/", async (req: Request, res: Response) => {
	await PagamentoController.CriarPagamento(
		pagamentoRepositoryInMongo,
		req.body
	)
		.then((response: any) => {
			res.status(201).send(response);
		})
		.catch((err: any) => {
			res.status(400).send({ message: err?.message });
		});
});

/**
 * @swagger
 * /api/pagamentos/{id}:
 *   get:
 *     summary: Lista Pagamento por id
 *     tags: [Pagamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do Pagamento a ser retornado.
 *     description: Retorna Pagamento com o id informado.
 *     responses:
 *       200:
 *         description: Pagamento encontrado
 */
router.get("/:id", async (req: Request, res: Response) => {
	await PagamentoController.BuscarPagamentoPorID(
		pagamentoRepositoryInMongo,
		req.params.id
	)
		.then((response: PagamentoOutput | null) => {
			res.status(200).send(response);
		})
		.catch((err: any) => {
			res.status(400).send({ message: err?.message });
		});
});

/**
 * @swagger
 * /api/pagamentos/{id}:
 *   put:
 *     summary: Altera status do Pagamento por id
 *     tags: [Pagamento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do Pagamento a ser alterado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusPagamento:
 *                 type: string
 *             example:
 *               statusPagamento: "aprovado"
 *     responses:
 *       200:
 *         description: Status de pagamento do Pagamento alterado com sucesso.
 */
router.put("/:id", async (req: Request, res: Response) => {
	const statusPagamento = req.body.statusPagamento;

	await PagamentoController.AlterarStatusPagamento(
		pagamentoRepositoryInMongo,
		req.params.id,
		statusPagamento
	)
		.then((response: any) => {
			res.status(200).send({ statusPagamento: response.statusPagamento });
		})
		.catch((err: any) => {
			res.status(400).send({ message: err?.message });
		});
});

module.exports = router;
