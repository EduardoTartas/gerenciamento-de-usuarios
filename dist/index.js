"use strict";
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
//import * as roleServices from '../src/services/roleServices';
//import * as userServices from '../src/services/userServices';
//import { Role } from './models/roles';
//import defaultGuest from './services/userServices';
const seeds = __importStar(require("./seeds/userSeeds"));
console.log(seeds.teste1);
const userServices_1 = require("./services/userServices");
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const program = new commander_1.Command();
let currentUser = userServices_1.defaultAdm;
//add a new user
program
    .command("newUser")
    .description(chalk_1.default.bold("Adiciona um novo usuário."))
    .argument("<name>", "User name")
    .argument("<email>", "User email")
    .argument("<password>", "User password")
    .argument("<role>", "User role")
    .action((name, email, password, role) => {
    if (!currentUser.role.regisrterPerm) {
        (0, userServices_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            currentUser.registerUser(name, email, password, role);
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
    if (!currentUser.role.listAllPerm) {
        (0, userServices_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            (0, userServices_1.clear)();
            currentUser.listUsers();
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
    .description(chalk_1.default.bold("Lista o usuário pelo o seu ID."))
    .argument("<ID>", "User ID")
    .action((ID) => {
    if (!currentUser.role.listByIdPerm) {
        (0, userServices_1.clear)();
        console.log(chalk_1.default.bold("----- TENTE NOVAMENTE -----"));
        console.log("Você não tem a permissão necessaria para realizar essa ação!");
    }
    else {
        try {
            (0, userServices_1.clear)();
            currentUser.listUserByID(ID);
        }
        catch (error) {
            (0, userServices_1.clear)();
            console.log(error, "Não foi possivel listar os usuários.");
        }
    }
});
program.parse();
/* PARA FAZER
1. Terminar funções principais
    1.1. exluir
    1.2. editar
    1.3. trocar função
2. Criptografia da senha
3. Salvar no aquivo csv
*/ 
