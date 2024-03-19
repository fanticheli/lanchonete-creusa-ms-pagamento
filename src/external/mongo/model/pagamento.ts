const mongoose = require("mongoose");

const PagamentoSchema = new mongoose.Schema(
	{
		valorTotal: Number,
		numeroPedido: Number,
		statusPagamento: String,
		codigoPix: String,
	},
	{
		timestamps: true,
	}
);

export const PagamentoMongo = mongoose.model("Pagamento", PagamentoSchema);
