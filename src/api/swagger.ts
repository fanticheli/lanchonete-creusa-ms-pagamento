const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MicroService pagamento lanchonete da Creusa',
      version: '1.0.0',
      description: 'Sistema de pagamentos para lanchonetes. Desenvolvido em Nodejs e MongoDB utilizando Clean Arch. Melhore o atendimento e satisfação dos clientes.',
    }
  },
  apis: ['./src/api/routes/*.ts', './src/api/routes/*.js', './dist/src/api/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
