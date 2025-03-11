# Event API Test

## Uma api para gerenciamento de eventos e um micro-service de captura de ações dos eventos

Descrição do Projeto

- API RESTful
  Desenvolver uma API RESTful para gerenciar um CRUD de eventos a serem disparados.
  A API deve permitir as seguintes operações:
  - Criar um evento
  - Listar todos os eventos
  - Buscar um evento por ID
  - Atualizar um evento
  - Deletar um evento
  A Tabela de eventos pode conter os campos que achar necessário.

- A cada operação de criação, atualização ou exclusão, o sistema deve publicar uma mensagem em uma fila, para que seja lida pelo serviço consumidor.

- Criar um serviço que consuma os eventos da fila e gere um log com os dados da mensagem.

### Rodar

```sh
docker compose up -d
```

### Parar

```sh
docker compose down
```

### Ver os logs dos eventos

```sh
docker logs -f event-api-test-logger-1
```

### Documentação

1. [Página da Documentação da API](http://localhost:3000/docs){:target="_blank"}

2. Exemplos de uso da API:
   1. Criando um evento:

      ```sh
      curl -X POST 'localhost:3000/events' \
        -H "Content-Type: application/json" \
        -d '{"owner":"Vinicius","text":"New User Registred","type":"alert"}'
      ```

   2. Consultando todos eventos:

      ```sh
      curl 'localhost:3000/events/?limit=10&page=1'
      ```

   3. Consultando um evento:

      ```sh
      curl 'localhost:3000/events/b0d545d2-dd95-4dd3-91e9-acd43bb0268f'
      ```

   4. Atualizando um evento:

      ```sh
      curl -X PUT 'localhost:3000/events/b0d545d2-dd95-4dd3-91e9-acd43bb0268f' \
        -H "Content-Type: application/json" \
        -d '{"text":"New User Registred"}'
      ```

   5. Removendo um evento:

      ```sh
      curl -X DELETE 'localhost:3000/events/b0d545d2-dd95-4dd3-91e9-acd43bb0268f'
      ```

### Descrição do formato dos dados para a comunicação entre os serviços

1. Explicação
   1. id: ID do evento
   2. date: Data de criação da mensagem na fila
   3. action: Tipo de ação tomada referente ao evento
      1. Somente três tipos: add | update | delete
   4. content: Conteúdo do evento
      1. Por exemplo: Novo lead na plataforma
   5. type: Tipo do evento
      1. Por exemplo: alert, notification, warning, error, etc...
   6. event: Descrição da ação referente ao evento
      1. Por exemplo: Um novo evento foi criado!
2. Schema

```ts
interface Message {
  id: string
  date: string
  action: 'add' | 'update' | 'delete'
  content: string
  type: string
  event: string
}
```

### Decisões Técnicas

1. Como design pattern/boas práticas tomei a liberdade de usar o SOLID para organização do projeto de separação de responsabilidades.
2. Não criei bancos de dados pois foquei no objetivo do projeto que seria a comunicação com fila usando RabbitMQ
3. Configurei todos os arquivos do Kubernetes para o deploy. Juntamente com as configurações de CICD usando o Github Action
4. Usando o padrão API RESTful aplique também o padrão HATEOAS, onde a API possui o recurso de paginação, limitação por página e links para as próximas
