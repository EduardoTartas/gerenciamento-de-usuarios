# CLI de Gerenciamento de Usuários

Este projeto é uma interface de linha de comando (CLI) desenvolvida em Typescript para gerenciar usuários. Ele permite adicionar, listar, editar e remover usuários, além de alterar o papel do usuário ativo no sistema.

## ⚙️ Funcionalidades

- **Adicionar usuário:** Cria um novo usuário com nome, e-mail, senha e papel (role), as opções de `role` são: `adm`, `prof` ou `guest`.
- **Listar usuários:** Exibe todos os usuários cadastrados.
- **Listar usuário por ID:** Mostra as informações de um usuário específico.
- **Remover usuário:** Exclui um usuário pelo seu ID.
- **Editar informações do usuário:** Permite alterar campos específicos de um usuário.
- **Alterar papel do usuário ativo:** Modifica o papel (role) do usuário atualmente utilizando o sistema.

## 📋 Comandos Disponíveis

| Comando                                  | Descrição                                         |
|------------------------------------------|---------------------------------------------------|
| `newUser "nome" "email" "senha" "papel"`  | Adiciona um novo usuário.                        |
| `listUsers`                               | Lista todos os usuários cadastrados.             |
| `listUser "ID"`                           | Lista o usuário pelo seu ID.                     |
| `deleteUser "ID"`                         | Remove o usuário pelo seu ID.                    |
| `editUser "ID" "campo" "novo_dado"`       | Altera as informações de um usuário.             |
| `changeUser "papel"`                      | Troca o papel do usuário ativo no sistema.       |
| `help`                                    | Exibe ajuda sobre os comandos disponíveis.       |

## 🚀 Como Executar o Projeto

### 1. Clonar o Repositório

Primeiro, clone o repositório para sua máquina local:

  ```
  git clone https:https://github.com/EduardoTartas/gerenciamento-de-usuarios.git
  ```
### 2. Instalar Dependências
Certifique-se de ter o Node.js e o npm instalados. Em seguida, instale as dependências do projeto executando:

  ```
  npm install
  ```

### 3. Fazer o Build do Código
O código deve ser compilado antes de ser executado. Use o comando:

```
npm run build
```

### 4. Navegar para a Pasta de Distribuição
Após a compilação, vá para a pasta dist:

```
cd dist
```

### 5. Executar o Programa
Execute o programa com o comando:

```
node index.js
```

## ⛳️ Exemplos de Uso

Aqui estão alguns exemplos práticos para testar os comandos disponíveis no programa:

1. **Adicionar um novo usuário**  
   Para adicionar um novo usuário, execute o seguinte comando:  

   ```
   node index.js newUser "Eduardo Tartas" "Eduardo@example.com" "mypassword" "admin"
   ```

2. **Listar todos os usuários**  
   Para listar todos os usuários cadastrados, use:  

   ```
   node index.js listUsers
   ```

 3. **Listar um usuário específico por ID**  
   Para exibir as informações de um usuário específico, forneça o ID:  

     ```
     node index.js listUser "123"
     ```

4. **Remover um usuário pelo ID**  
   Para excluir um usuário pelo ID:  

   ```
   node index.js deleteUser "123"
   ```

5. **Editar as informações de um usuário**  
   Para alterar um campo específico de um usuário, forneça o ID, o campo e o novo valor:  

   ```
   node index.js editUser "123" "email" "new_email@example.com"
   ```

6. **Alterar o papel (role) do usuário ativo**  
   Para modificar o papel do usuário atualmente ativo no sistema:  

   ```
   node index.js changeUser "admin"
   ```
