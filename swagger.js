import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Usuários",
    version: "1.0.0",
    description: "Documentação da API de Usuários"
  },
  servers: [
    {
      url: "http://3.227.173.202",  // Substitua pelo IP ou domínio público do seu EC2
      description: "API banco de dados"
    }
  ],
  paths: {
    "/usuarios": {
      get: {
        summary: "Listar todos os usuários",
        responses: {
          "200": {
            description: "Sucesso!",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      cpf: {
                        type: "integer",
                        description: "O CPF do usuário"
                      },
                      nome: {
                        type: "string",
                        description: "O nome do usuário"
                      },
                      data_nascimento: {
                        type: "string",
                        format: "date",
                        description: "A data de nascimento do usuário"
                      }
                    }
                  }
                }
              }
            }
          },
          "500": {
            description: "Erro no servidor"
          }
        }
      },
      post: {
        summary: "Cria um novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  cpf: {
                    type: "integer",
                    description: "O CPF do usuário"
                  },
                  nome: {
                    type: "string",
                    description: "O nome do usuário"
                  },
                  data_nascimento: {
                    type: "string",
                    format: "date",
                    description: "A data de nascimento do usuário"
                  }
                },
                required: ["cpf", "nome", "data_nascimento"]
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Usuário criado com sucesso"
          },
          "400": {
            description: "Formato de usuário inválido"
          },
          "500": {
            description: "Erro no servidor"
          }
        }
      }
    },
    "/usuarios/cpf": {
      get: {
        summary: "Busca um usuário pelo CPF",
        parameters: [
          {
            name: "cpf",
            in: "query",
            required: true,
            schema: {
              type: "integer",
              description: "O CPF do usuário"
            }
          }
        ],
        responses: {
          "200": {
            description: "Usuário encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cpf: {
                      type: "integer",
                      description: "O CPF do usuário"
                    },
                    nome: {
                      type: "string",
                      description: "O nome do usuário"
                    },
                    data_nascimento: {
                      type: "string",
                      format: "date",
                      description: "A data de nascimento do usuário"
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "CPF inválido"
          },
          "404": {
            description: "Usuário não encontrado"
          },
          "500": {
            description: "Erro no servidor"
          }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./index.js'],
};

const swaggerSpec = swaggerJsDoc(options);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
