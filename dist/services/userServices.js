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
exports.defaultProf = exports.defaultGuest = exports.defaultAdm = exports.Users = exports.users = void 0;
exports.clear = clear;
const uuid_1 = require("uuid");
const roleServices_1 = require("./../services/roleServices");
const index_1 = require("../index");
const chalk_1 = __importDefault(require("chalk"));
const verify = __importStar(require("../utils/verificacao"));
exports.users = [];
class Users {
    constructor(name, email, password, role) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.registerDate = new Date();
        this.lastEdit = new Date();
        this.status = true;
    }
    registerUser(name, email, password, roles) {
        let role = roles.toLocaleLowerCase();
        verify.verifyName(name);
        verify.verifyEmail(email);
        verify.verifyPassword(password);
        verify.verifyRole(role);
        if (verify.error.length <= 0) {
            let userRole;
            if (role === "adm") {
                userRole = roleServices_1.admRole;
            }
            else if (role === "guest") {
                userRole = roleServices_1.guestRole;
            }
            else
                userRole = roleServices_1.profRole;
            const newUser = new Users(name, email, password, userRole);
            exports.users.push(newUser);
            clear();
            console.log("Usuário criado com Sucesso");
            console.log(exports.users);
        }
        else {
            clear();
            console.log(`${chalk_1.default.bold(`----- TENTE NOVAMENTE -----`)}`);
            verify.error.forEach((error) => {
                console.log(error);
            });
        }
    }
    listUsers() {
        if (exports.users.length <= 0) {
            clear();
            console.log(`${chalk_1.default.bold("ERROR!004: ")}Nenhum usuário encontrado`);
        }
        else {
            clear();
            console.log(`${chalk_1.default.bold(`----- USUÁRIOS CADASTRADOS -----`)}`);
            exports.users.forEach(user => {
                console.log(`\nID: ${chalk_1.default.bold.green(user.id)}\nNome: ${user.name}\nE-mail: ${user.email}\nNivel de acesso: ${user.role.name}`);
                if (index_1.currentUser == exports.defaultAdm) {
                    console.log(`Senha: ${user.password}`);
                }
            });
        }
    }
    //list user by ID
    listUserByID(id) {
        let filterdUsers = exports.users.filter(user => user.id === id);
        if (filterdUsers.length <= 0) {
            clear();
            console.log(`${chalk_1.default.bold("ERROR!005: ")}Nenhum usuário encontrado`);
        }
        else {
            clear();
            console.log(`${chalk_1.default.bold(`----- USUÁRIO FILTRADO -----`)}`);
            filterdUsers.forEach(user => {
                console.log(`\nID: ${chalk_1.default.bold.green(user.id)}\nNome: ${user.name}\nE-mail: ${user.email}\nNivel de acesso: ${user.role.name}`);
                if (index_1.currentUser == exports.defaultAdm) {
                    console.log(`Senha: ${user.password}`);
                }
            });
        }
    }
    //delete user by id (verificar depois com o csv)
    deleteUser(id) {
        const userIndex = exports.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            clear();
            console.log(`${chalk_1.default.bold("ERROR!006: ")}Nenhum usuário encontrado`);
        }
        else {
            clear();
            console.log(`${chalk_1.default.bold(`----- USUÁRIO DELETADO -----`)}`);
            console.log(`\nID: ${chalk_1.default.bold.green(exports.users[userIndex].id)}\nNome: ${exports.users[userIndex].name}\nE-mail: ${exports.users[userIndex].email}\nNivel de acesso: ${exports.users[userIndex].role.name}`);
            console.log(`\nUsuário ${chalk_1.default.bold('DELETADO')} com sucesso da lista de usuários!`);
            exports.users.splice(userIndex, 1);
        }
    }
    editUser(id, field, info) {
        let userIndex = exports.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            clear();
            console.log(`${chalk_1.default.bold("ERROR!007: ")}Nenhum usuário encontrado`);
        }
        else {
            switch (field) {
                case "name":
                    verify.verifyName(info);
                    if (verify.error.length <= 0) {
                        exports.users[userIndex].name = info;
                    }
                    break;
                case "email":
                    verify.verifyEmail(info);
                    if (verify.error.length <= 0) {
                        exports.users[userIndex].email = info;
                    }
                    break;
                case "password":
                    verify.verifyPassword(info);
                    if (verify.error.length <= 0) {
                        exports.users[userIndex].password = info;
                    }
                    break;
                case "role":
                    verify.verifyRole(info);
                    if (verify.error.length <= 0) {
                        let userRole;
                        if (info === "adm") {
                            userRole = roleServices_1.admRole;
                        }
                        else if (info === "guest") {
                            userRole = roleServices_1.guestRole;
                        }
                        else
                            userRole = roleServices_1.profRole;
                        exports.users[userIndex].role = userRole;
                    }
                    break;
                default:
                    clear();
                    verify.error.push(`${chalk_1.default.bold("ERROR!008: ")}Campo inválido!`);
                    verify.error.forEach((error) => {
                        console.log(error);
                    });
                    break;
            }
            if (verify.error.length <= 0) {
                clear();
                console.log(`${chalk_1.default.bold(`----- USUÁRIO EDITADO -----`)}`);
                console.log(`\nID: ${chalk_1.default.bold.green(exports.users[userIndex].id)}\nNome: ${exports.users[userIndex].name}\nE-mail: ${exports.users[userIndex].email}\nNivel de acesso: ${exports.users[userIndex].role.name}`);
                console.log(`\nCampo ${chalk_1.default.bold(field)} alterado com sucesso!`);
            }
        }
    }
}
exports.Users = Users;
function clear() {
    console.log('\x1Bc');
}
exports.defaultAdm = new Users("defaultAdm", "teste@gmail.com", "'123", roleServices_1.admRole);
exports.defaultGuest = new Users("defaultGuest", "teste@gmail.com", "'123", roleServices_1.guestRole);
exports.defaultProf = new Users("defaultProf", "teste@gmail.com", "'123", roleServices_1.profRole);
