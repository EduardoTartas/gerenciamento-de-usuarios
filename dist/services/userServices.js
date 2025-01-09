"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const uuid_1 = require("uuid");
const roleServices_1 = require("./../services/roleServices");
const csvServices_1 = require("../services/csvServices");
const functions_1 = require("../utils/functions");
const chalk_1 = __importDefault(require("chalk"));
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
    //register new users
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
            csvServices_1.users.push(newUser);
            (0, csvServices_1.saveAsCsv)();
            (0, functions_1.clear)();
            console.log("Usuário criado com Sucesso");
        }
        else {
            (0, functions_1.clear)();
            console.log(`${chalk_1.default.bold(`----- TENTE NOVAMENTE -----`)}`);
            (0, functions_1.showErrors)();
        }
    }
    //list all users
    listUsers() {
        if (csvServices_1.users.length <= 0 || csvServices_1.users.length == 1 && this.status == false) {
            (0, functions_1.clear)();
            console.log(`${chalk_1.default.bold("ERROR!004: ")}Nenhum usuário encontrado`);
        }
        else {
            (0, functions_1.clear)();
            console.log(`${chalk_1.default.bold(`----- USUÁRIOS CADASTRADOS -----`)}`);
            csvServices_1.users.forEach(user => {
                //do not show the default user
                if (user.status == false) {
                }
                //list users
                else {
                    console.log(`\nID: ${chalk_1.default.bold.green(user.id)}\nNome: ${user.name}\nE-mail: ${user.email}\nNivel de acesso: ${user.role.name}`);
                    if (this.role === roleServices_1.admRole) {
                        console.log(`Senha: ${user.password}\nCriação: ${user.registerDate.toLocaleDateString("pt-BR")}\nÚltima alteração: ${user.lastEdit.toLocaleDateString("pt-BR")}`);
                    }
                }
            });
        }
    }
    //list user by ID
    listUserByID(id) {
        let filterdUsers = csvServices_1.users.filter(user => user.id === id);
        if (filterdUsers.length <= 0) {
            (0, functions_1.clear)();
            console.log(`${chalk_1.default.bold("ERROR!005: ")}Nenhum usuário encontrado`);
        }
        else {
            (0, functions_1.clear)();
            console.log(`${chalk_1.default.bold(`----- USUÁRIO FILTRADO -----`)}`);
            filterdUsers.forEach(user => {
                console.log(`\nID: ${chalk_1.default.bold.green(user.id)}\nNome: ${user.name}\nE-mail: ${user.email}\nNivel de acesso: ${user.role.name}`);
                if (this.role === roleServices_1.admRole) {
                    console.log(`Senha: ${user.password}\nCriação: ${user.registerDate.toLocaleDateString("pt-BR")}\nÚltima alteração: ${user.lastEdit.toLocaleDateString("pt-BR")}`);
                }
            });
        }
    }
    //delete user by id
    deleteUser(id) {
        const userIndex = csvServices_1.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            (0, functions_1.clear)();
            console.log(`${chalk_1.default.bold("ERROR!006: ")}Nenhum usuário encontrado`);
        }
        else {
            (0, functions_1.clear)();
            console.log(`${chalk_1.default.bold(`----- USUÁRIO DELETADO -----`)}`);
            console.log(`\nID: ${chalk_1.default.bold.green(csvServices_1.users[userIndex].id)}\nNome: ${csvServices_1.users[userIndex].name}\nE-mail: ${csvServices_1.users[userIndex].email}\nNivel de acesso: ${csvServices_1.users[userIndex].role.name}`);
            console.log(`\nUsuário ${chalk_1.default.bold('DELETADO')} com sucesso da lista de usuários!`);
            csvServices_1.users.splice(userIndex, 1);
            (0, csvServices_1.saveAsCsv)();
        }
    }
    //edit user fields
    editUser(id, field, info) {
        let userIndex = csvServices_1.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            (0, functions_1.clear)();
            console.log(`${chalk_1.default.bold("ERROR!007: ")}Nenhum usuário encontrado`);
        }
        else {
            switch (field) {
                case "name":
                    (0, functions_1.verifyName)(info);
                    if (functions_1.error.length <= 0) {
                        csvServices_1.users[userIndex].name = info;
                    }
                    else
                        (0, functions_1.showErrors)();
                    break;
                case "email":
                    (0, functions_1.verifyEmail)(info);
                    if (functions_1.error.length <= 0) {
                        csvServices_1.users[userIndex].email = info;
                    }
                    else
                        (0, functions_1.showErrors)();
                    break;
                case "password":
                    (0, functions_1.verifyPassword)(info);
                    if (functions_1.error.length <= 0) {
                        csvServices_1.users[userIndex].password = (0, functions_1.encrypt)(info);
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
                        csvServices_1.users[userIndex].role = userRole;
                    }
                    else
                        (0, functions_1.showErrors)();
                    break;
                default:
                    (0, functions_1.clear)();
                    functions_1.error.push(`${chalk_1.default.bold("ERROR!008: ")}Campo inválido!`);
                    (0, functions_1.showErrors)();
                    break;
            }
            if (functions_1.error.length <= 0) {
                (0, csvServices_1.saveAsCsv)();
                csvServices_1.users[userIndex].lastEdit = new Date();
                (0, functions_1.clear)();
                console.log(`${chalk_1.default.bold(`----- USUÁRIO EDITADO -----`)}`);
                console.log(`\nID: ${chalk_1.default.bold.green(csvServices_1.users[userIndex].id)}\nNome: ${csvServices_1.users[userIndex].name}\nE-mail: ${csvServices_1.users[userIndex].email}\nNivel de acesso: ${csvServices_1.users[userIndex].role.name}`);
                console.log(`\nCampo ${chalk_1.default.bold(field)} alterado com sucesso!`);
                console.log(csvServices_1.users[userIndex].lastEdit);
                (0, csvServices_1.saveAsCsv)();
            }
        }
    }
}
exports.Users = Users;
