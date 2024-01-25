import { Sequelize, QueryTypes  } from 'sequelize';


export class PostgreSQLConnection {
    private sequelize: Sequelize;
  
    constructor() {
      this.sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.PG_HOST || 'localhost',
        port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432,
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
      });
    }
  
    async start() {
      console.info('Iniciando conexão com o PostgreSQL');
      try {
        // Conecta ao banco de dados
        await this.sequelize.authenticate();
        console.log('Conexão com o PostgreSQL estabelecida');
      } catch (error) {
        console.error('Erro ao conectar ao PostgreSQL:', error);
      }
    }
  
    async query(sql: string) {
      try {
        // Executa uma consulta SQL
        const result = await this.sequelize.query(sql, { type: QueryTypes.SELECT });
        return result;
      } catch (error) {
        console.error('Erro ao executar consulta SQL:', error);
        throw error;
      }
    }
  
    async stop() {
      try {
        // Certifique-se de fechar a conexão
        await this.sequelize.close();
        console.log('Conexão com o PostgreSQL encerrada');
      } catch (error) {
        console.error('Erro ao encerrar a conexão com o PostgreSQL:', error);
      }
    }
}
