Este é um projeto basico, nele contem 1 API gateway e 1 microserviço(user-consumer) que se comunica a um banco de dados Mongodb, a comunicação é realizada atraves do RabbitMQ.

No docker network possui uma rede docker configurada.
Na pasta utils possui um arquivo docker-compose com a configuração do RabbitMQ e do banco de dado MongoDb

## Como instalar:

- 1 - Execute o arquivo docker-compose da pasta "docker-network"
- 2 - Execute o arquivo docker compose da pasta "utils"
- 3 - Execute o arquivo docker-compose da pasta "producer"
- 4 - Execute o arquivo docker-compose da pasta "user-consumer"

obs: Os arquivos precisam ser executados nessa ordem por causa das dependencias deles na rede Docker.

Feito isso a API gateway estará rodando na porta 3000.
