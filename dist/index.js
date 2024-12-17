"use strict";
//import * as roleServices from '../src/services/roleServices';
//import * as userServices from '../src/services/userServices';
//import { Role } from './models/roles';
//import defaultGuest from './services/userServices';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//apenas para sincronizar o seeds com o index
const functions_1 = require("./utils/functions");
const userServices_1 = require("./services/userServices");
const seeds = __importStar(require("./seeds/userSeeds"));
console.log(seeds.teste1);
(0, userServices_1.clear)();
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const program = new commander_1.Command();
//add a new user
program
    .command("newUser")
    .description(chalk_1.default.bold("Adiciona um novo usuário."))
    .argument("<name>", "User name")
    .argument("<email>", "User email")
    .argument("<password>", "User password")
    .argument("<role>", "User role")
    .action((name, email, password, role) => {
    if (!functions_1.currentUser.role.regisrterPerm) {
        (0, userServices_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            functions_1.currentUser.registerUser(name, email, password, role);
        }
        catch (error) {
            (0, userServices_1.clear)();
            console.log(error, "Não foi possivel cadastrar o novo usuário.");
        }
    }
});
//list users
program
    .command("listUsers")
    .description(chalk_1.default.bold("Lista todos os usuários cadastrados."))
    .action(() => {
    if (!functions_1.currentUser.role.listAllPerm) {
        (0, userServices_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            (0, userServices_1.clear)();
            functions_1.currentUser.listUsers();
        }
        catch (error) {
            (0, userServices_1.clear)();
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
    if (!functions_1.currentUser.role.listByIdPerm) {
        (0, userServices_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            (0, userServices_1.clear)();
            functions_1.currentUser.listUserByID(ID);
        }
        catch (error) {
            (0, userServices_1.clear)();
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
    if (!functions_1.currentUser.role.deletePerm) {
        (0, userServices_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            (0, userServices_1.clear)();
            functions_1.currentUser.deleteUser(ID);
        }
        catch (error) {
            (0, userServices_1.clear)();
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
    if (!functions_1.currentUser.role.updatePerm) {
        (0, userServices_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            functions_1.currentUser.editUser(ID, field, info);
        }
        catch (error) {
            (0, userServices_1.clear)();
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
        (0, userServices_1.clear)();
        (0, functions_1.changeUserRole)(role);
    }
    catch (error) {
        (0, userServices_1.clear)();
        console.log(error, "Não foi possivel trocar o nivel de acesso");
    }
});
program.parse();
/* PARA FAZER
1. Terminar funções principais
    1.2. editar
    1.3. trocar função
2. Criptografia da senha
3. Salvar no aquivo csv
*/ 
