"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProf = exports.defaultGuest = exports.defaultAdm = exports.Users = exports.users = void 0;
exports.clear = clear;
const uuid_1 = require("uuid");
const roleServices_1 = require("./../services/roleServices");
const functions_1 = require("../utils/functions");
const chalk_1 = __importDefault(require("chalk"));
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
        (0, functions_1.verifyName)(name);
        (0, functions_1.verifyEmail)(email);
        (0, functions_1.verifyPassword)(password);
        (0, functions_1.verifyRole)(role);
        if (functions_1.error.length <= 0) {
            let userRole;
            if (role === "adm") {
                userRole = roleServices_1.admRole;
            }
            else if (role === "guest") {
                userRole = roleServices_1.guestRole;
            }
            else
                userRole = roleServices_1.profRole;
            const newUser = new Users(name, email, (0, functions_1.encrypt)(password), userRole);
            exports.users.push(newUser);
            clear();
            console.log("Usuário criado com Sucesso");
            console.log(newUser);
        }
        else {
            clear();
            console.log(`${chalk_1.default.bold(`----- TENTE NOVAMENTE -----`)}`);
            (0, functions_1.showErrors)();
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
                if (functions_1.currentUser == exports.defaultAdm) {
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
                if (functions_1.currentUser == exports.defaultAdm) {
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
                    (0, functions_1.verifyName)(info);
                    if (functions_1.error.length <= 0) {
                        exports.users[userIndex].name = info;
                    }
                    else
                        (0, functions_1.showErrors)();
                    break;
                case "email":
                    (0, functions_1.verifyEmail)(info);
                    if (functions_1.error.length <= 0) {
                        exports.users[userIndex].email = info;
                    }
                    else
                        (0, functions_1.showErrors)();
                    break;
                case "password":
                    (0, functions_1.verifyPassword)(info);
                    if (functions_1.error.length <= 0) {
                        exports.users[userIndex].password = (0, functions_1.encrypt)(info);
                    }
                    else
                        (0, functions_1.showErrors)();
                    break;
                case "role":
                    (0, functions_1.verifyRole)(info);
                    if (functions_1.error.length <= 0) {
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
                    else
                        (0, functions_1.showErrors)();
                    break;
                default:
                    clear();
                    functions_1.error.push(`${chalk_1.default.bold("ERROR!008: ")}Campo inválido!`);
                    (0, functions_1.showErrors)();
                    break;
            }
            if (functions_1.error.length <= 0) {
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
