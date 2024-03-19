import amqp from 'amqplib';
import { IPagamentoGateway } from '../../interfaces';
import { PagamentoProps } from '../../entities/props/pagamento.props';
import { PagamentoOutput } from '../../adapters/pagamento';
import { PagamentoUseCases } from '../../usecases/pagamento';
import { PagamentoRepositoryInMongo } from '../mongo/repositories/pagamento.repository';

export class RabbitMQManager {
    private pagamentoRepositoryInMongo = new PagamentoRepositoryInMongo();

    constructor() { }

    async consumerQueuePedidos() {
        try {
            const queueName = process.env.QUEUE_PEDIDOS_NAME || '';
            const connection = await amqp.connect(process.env.QUEUE_HOST || '');
            const channel = await connection.createChannel();
            await channel.assertQueue(queueName, { durable: true });
            channel.consume(queueName, (msg) => {
                if (msg !== null) {
                    RabbitMQManager.CriarPagamento(this.pagamentoRepositoryInMongo, JSON.parse(msg.content.toString()))
                        .then(() => {
                            channel.ack(msg);
                        })
                        .catch((error) => {
                            console.error('Erro ao criar pagamento:', error);
                        });
                }
            });

        } catch (error) {
            console.error('Erro ao criar consumidor:', error);
        }
    }

    static async CriarPagamento(
        pagamentoGatewayInterface: IPagamentoGateway,
        pagamentoProps: PagamentoProps
    ): Promise<PagamentoOutput> {
        try {
            return await PagamentoUseCases.CriarPagamento(
                pagamentoGatewayInterface,
                pagamentoProps
            );
        } catch (error) {
            throw error;
        }
    }
}