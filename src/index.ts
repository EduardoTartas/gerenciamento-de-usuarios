//import * as roleServices from '../src/services/roleServices';
//import * as userServices from '../src/services/userServices';
//import { Role } from './models/roles';
//import defaultGuest from './services/userServices';

//apenas para sincronizar o seeds com o index
import { changeUserRole, clear } from './utils/functions';
import { defaultUser} from './services/userServices';

import { Command } from "commander";
import chalk from 'chalk';
//import { loadDefaultUser } from './services/csvServices';

const program = new Command();


//add a new user
program
  .command("newUser")
  .description(chalk.bold("Adiciona um novo usuário."))
  .argument("<name>", "User name")
  .argument("<email>", "User email")
  .argument("<password>", "User password")
  .argument("<role>", "User role")
  .action((name, email, password, role) => {
    if (!defaultUser.role.regisrterPerm) {
      clear();
      console.log(chalk.bold("----- TENTE NOVAMENTE -----"))
      console.log("Você não tem a permissão necessaria para realizar essa ação!");
    } else {
      try {
        defaultUser.registerUser(name, email, password, role);
      } catch (error) {
        clear();
        console.log(error, "Não foi possivel cadastrar o novo usuário.")
      }
    }
  });

//list users
program
  .command("listUsers")
  .description(chalk.bold("Lista todos os usuários cadastrados."))
  .action(() => {
    if (!defaultUser.role.listAllPerm) {
      clear();
      console.log(chalk.bold("----- TENTE NOVAMENTE -----"))
      console.log("Você não tem a permissão necessaria para realizar essa ação!");
    } else {
      try {
        clear();
        defaultUser.listUsers();
      } catch (error) {
        clear();
        console.log(error, "Não foi possivel listar os usuários.")
      }
    }
  });

//list users by id
program
  .command("listUser")
  .description(chalk.bold("Lista o usuário pelo seu ID."))
  .argument("<ID>", "User ID")
  .action((ID) => {
    if (!defaultUser.role.listByIdPerm) {
      clear();
      console.log(chalk.bold("----- TENTE NOVAMENTE -----"))
      console.log("Você não tem a permissão necessaria para realizar essa ação!");
    } else {
      try {
        clear();
        defaultUser.listUserByID(ID);
      } catch (error) {
        clear();
        console.log(error, "Não foi possivel listar os usuários.")
      }
    }
  });

//delete user by id
program
  .command("deleteUser")
  .description(chalk.bold("Remove o usuário pelo seu ID."))
  .argument("<ID>", "User ID")
  .action((ID) => {
    if (!defaultUser.role.deletePerm) {
      clear();
      console.log(chalk.bold("----- TENTE NOVAMENTE -----"))
      console.log("Você não tem a permissão necessaria para realizar essa ação!");
    } else {
      try {
        clear();
        defaultUser.deleteUser(ID);
      } catch (error) {
        clear();
        console.log(error, "Não foi possivel excluir o usuário.")
      }
    }
  });

//edit user infos
program
  .command("editUser")
  .description(chalk.bold("Altera as informações do usuario."))
  .argument("<ID>", "User ID")
  .argument("<field>", "field that you want to change")
  .argument("<info>", "New info for the field")
  .action((ID, field, info) => {
    if (!defaultUser.role.updatePerm) {
      clear();
      console.log(chalk.bold("----- TENTE NOVAMENTE -----"))
      console.log("Você não tem a permissão necessaria para realizar essa ação!");
    } else {
      try {
        defaultUser.editUser(ID, field, info);
      } catch (error) {
        clear();
        console.log(error, "Não foi possivel cadastrar o novo usuário.")
      }
    }
  });

//change user
program
  .command("changeUser")
  .description(chalk.bold("Troca o usuário que está operando o sistema"))
  .argument("<role>", "novo nivel de acesso")
  .action((role) => {
    try {
      clear();
      changeUserRole(role);
    } catch (error) {
      clear();
      console.log(error, "Não foi possivel trocar o nivel de acesso")
    }
  });

program.parse();

/* PARA FAZER
1. Terminar funções principais
3. Salvar no aquivo csv
*/