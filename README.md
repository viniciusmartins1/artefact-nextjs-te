# Gerenciador de Tarefas

  

Aplicação web para gerenciamento de tarefas, desenvolvida com **Next.js, TypeScript, tRPC e Tailwind CSS**. O projeto permite cadastrar, visualizar, editar e excluir tarefas por meio de uma interface simples e intuitiva.

  

### Funcionalidades

  

- Listagem de tarefas cadastradas.

- Cadastro de novas tarefas.

- Edição de tarefas existentes.

- Exclusão de tarefas com confirmação.

- Validação dos dados enviados ao servidor.

- Renderização inicial da listagem utilizando Server-Side Rendering (SSR).


  

### Comunicação e operações

  

A comunicação entre frontend e backend é realizada utilizando tRPC, com procedimentos organizados no `taskRouter`.

  

| Procedimento | Tipo | Descrição |

| -------------- | -------- | ------------------------------------ |

| `task.getAll` | Query | Retorna todas as tarefas. |

| `task.getById` | Query | Busca uma tarefa pelo identificador. |

| `task.create` | Mutation | Cadastra uma nova tarefa. |

| `task.update` | Mutation | Atualiza uma tarefa existente. |

| `task.delete` | Mutation | Exclui uma tarefa. |

  

As entradas são validadas utilizando Zod.

  

## Server-Side Rendering (SSR)

  

A página inicial utiliza `getServerSideProps` para buscar as tarefas diretamente pelo caller do App Router do tRPC.

  

Os dados são disponibilizados inicialmente à página por meio de `initialData` no React Query, evitando uma requisição inicial redundante no cliente.

  

Como objetos `Date` não são serializados diretamente pelo Next.js, a data de criação é convertida para ISO string durante a transferência e reconstruída no frontend.

  

### Como executar o projeto

  

#### Pré-requisitos

  

- Node.js

- npm

  

#### Instalação

  

Clone o repositório:

  

```bash

git  clone  https://github.com/viniciusmartins1/artefact-nextjs-te.git

```

  

Acesse a pasta do projeto:

  

```bash

cd  artefact-nextjs-te

```

  

Instale as dependências:

  

```bash

npm  install

```

  

Inicie o servidor de desenvolvimento:

  

```bash

npm  run  dev

```

  

Acesse a aplicação:

  

```text

http://localhost:3000

```

  

### Persistência dos dados

 
  

**Importante:** os dados não possuem persistência em banco de dados e são perdidos quando o processo do servidor é reiniciado. 

