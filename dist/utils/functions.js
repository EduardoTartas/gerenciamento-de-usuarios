"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.currentUser = void 0;
exports.changeUserRole = changeUserRole;
exports.verifyName = verifyName;
exports.verifyEmail = verifyEmail;
exports.verifyPassword = verifyPassword;
exports.verifyRole = verifyRole;
exports.encrypt = encrypt;
exports.showErrors = showErrors;
const bcrypt_1 = require("bcrypt");
const chalk_1 = __importDefault(require("chalk"));
const userServices_1 = require("../services/userServices");
exports.currentUser = userServices_1.defaultAdm;
exports.error = [];
//change user
function changeUserRole(role) {
    if (role !== "adm" && role !== "guest" && role !== "prof") {
        exports.error.push(`${chalk_1.default.bold("ERROR!009: ")}Selecione entre os niveis de acesso existente! 'adm', 'guest' ou 'prof'`);
        exports.error.forEach((error) => {
            console.log(error);
        });
    }
    else {
        if (role === "adm") {
            exports.currentUser = userServices_1.defaultAdm;
        }
        else if (role === "guest") {
            exports.currentUser = userServices_1.defaultGuest;
        }
        else
            exports.currentUser = userServices_1.defaultProf;
        console.log(`Nivel de acesso da sessão atual atualizada para ${chalk_1.default.bold(role)}`);
    }
}
function verifyName(name) {
    let nameRegex = /^[\s\S]{3,25}$/;
    if (!nameRegex.test(name)) {
        exports.error.push(`${chalk_1.default.bold("ERROR!000: ")}Digite o nome do usuário, com no mínimo 3 e no maximo 25 caracteres`);
    }
}
function verifyEmail(email) {
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        exports.error.push(`${chalk_1.default.bold("ERROR!001: ")}Digite um email válido para o usuário`);
    }
}
function verifyPassword(password) {
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!passwordRegex.test(password)) {
        exports.error.push(`${chalk_1.default.bold("ERROR!002: ")}Digite uma senha com no mínimo 8 caracteres, letras maiúsculas, letras minúsculas e um caracter especial`);
    }
}
function verifyRole(role) {
    if (role !== "adm" && role !== "guest" && role !== "prof") {
        exports.error.push(`${chalk_1.default.bold("ERROR!003: ")}Selecione entre os niveis de acesso existente! 'adm', 'guest' ou 'prof'`);
    }
}
function encrypt(password) {
    const passwordHash = (0, bcrypt_1.hashSync)(password, 8);
    return passwordHash;
}
//show errors
function showErrors() {
    exports.error.forEach((error) => {
        console.log(error);
    });
}
