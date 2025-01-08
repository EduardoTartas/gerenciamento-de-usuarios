"use strict";
//import * as roleServices from '../src/services/roleServices';
//import * as userServices from '../src/services/userServices';
//import { Role } from './models/roles';
//import defaultGuest from './services/userServices';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//apenas para sincronizar o seeds com o index
const functions_1 = require("./utils/functions");
const csvServices_1 = require("./services/csvServices");
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
//import { loadDefaultUser } from './services/csvServices';
const program = new commander_1.Command();
console.log(csvServices_1.defaultUser); // Log defaultUser to verify initialization
//add a new user
program
    .command("newUser")
    .description(chalk_1.default.bold("Adiciona um novo usuário."))
    .argument("<name>", "User name")
    .argument("<email>", "User email")
    .argument("<password>", "User password")
    .argument("<role>", "User role")
    .action((name, email, password, role) => {
    if (!csvServices_1.defaultUser.role.regisrterPerm) {
        (0, functions_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            csvServices_1.defaultUser.registerUser(name, email, password, role);
        }
        catch (error) {
            (0, functions_1.clear)();
            console.log(error, "Não foi possivel cadastrar o novo usuário.");
        }
    }
});
//list users
program
    .command("listUsers")
    .description(chalk_1.default.bold("Lista todos os usuários cadastrados."))
    .action(() => {
    if (!csvServices_1.defaultUser.role.listAllPerm) {
        (0, functions_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            (0, functions_1.clear)();
            csvServices_1.defaultUser.listUsers();
        }
        catch (error) {
            (0, functions_1.clear)();
            console.log(error, "Não foi possivel listar os usuários.");
        }
    }
});
//list users by id
program
    .command("listUser")
    .description(chalk_1.default.bold("Lista o usuário pelo seu ID."))
    .argument("<ID>", "User ID")
    .action((ID) => {
    if (!csvServices_1.defaultUser.role.listByIdPerm) {
        (0, functions_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            (0, functions_1.clear)();
            csvServices_1.defaultUser.listUserByID(ID);
        }
        catch (error) {
            (0, functions_1.clear)();
            console.log(error, "Não foi possivel listar os usuários.");
        }
    }
});
//delete user by id
program
    .command("deleteUser")
    .description(chalk_1.default.bold("Remove o usuário pelo seu ID."))
    .argument("<ID>", "User ID")
    .action((ID) => {
    if (!csvServices_1.defaultUser.role.deletePerm) {
        (0, functions_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            (0, functions_1.clear)();
            csvServices_1.defaultUser.deleteUser(ID);
        }
        catch (error) {
            (0, functions_1.clear)();
            console.log(error, "Não foi possivel excluir o usuário.");
        }
    }
});
//edit user infos
program
    .command("editUser")
    .description(chalk_1.default.bold("Altera as informações do usuario."))
    .argument("<ID>", "User ID")
    .argument("<field>", "field that you want to change")
    .argument("<info>", "New info for the field")
    .action((ID, field, info) => {
    if (!csvServices_1.defaultUser.role.updatePerm) {
        (0, functions_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            csvServices_1.defaultUser.editUser(ID, field, info);
        }
        catch (error) {
            (0, functions_1.clear)();
            console.log(error, "Não foi possivel cadastrar o novo usuário.");
        }
    }
});
//change user
program
    .command("changeUser")
    .description(chalk_1.default.bold("Troca o usuário que está operando o sistema"))
    .argument("<role>", "novo nivel de acesso")
    .action((role) => {
    try {
        (0, functions_1.clear)();
        (0, functions_1.changeUserRole)(role);
    }
    catch (error) {
        (0, functions_1.clear)();
        console.log(error, "Não foi possivel trocar o nivel de acesso");
    }
});
program.parse();
/* PARA FAZER
1. Terminar funções principais
3. Salvar no aquivo csv
*/ 
