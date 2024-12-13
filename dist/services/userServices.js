"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProf = exports.defaultGuest = exports.defaultAdm = void 0;
const uuid_1 = require("uuid");
const roleServices_1 = require("./../services/roleServices");
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
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        let nameRegex = /^[\s\S]{3,25}$/;
        let error = [];
        let role = roles.toLocaleLowerCase();
        if (this.role.regisrterPerm) {
            if (!nameRegex.test(name)) {
                error.push("Digite o nome do usuário, com no mínimo 3 e no maximo 25 caracteres");
            }
            /* ------- */
            if (!emailRegex.test(email)) {
                error.push("Digite um email válido para o usuário");
            }
            /* ------- */
            if (!passwordRegex.test(password)) {
                error.push("Digite uma senha com no mínimo 8 caracteres, letras maiúsculas, letras minúsculas");
            }
            if (role !== "adm" && role !== "guest" && role !== "prof") {
                error.push("Selecione entre os niveis de acesso existente! 'adm', 'guest' ou 'prof'");
            }
            if (error.length <= 0) {
                let userRole;
                if (role === "adm") {
                    userRole = roleServices_1.admRole;
                }
                else if (role === "guest") {
                    userRole = roleServices_1.guestRole;
                }
                else {
                    userRole = roleServices_1.profRole;
                }
                const newUser = new Users(name, email, password, userRole);
                users.push(newUser);
                console.log("Usuário criado com Sucesso");
                console.log(users);
            }
            else {
                console.clear();
                console.log("----- TENTE NOVAMENTE -----");
                error.forEach((error) => {
                    console.log(error);
                });
            }
        }
        else {
            console.log("Você não tem a permissão necessaria para realizar essa ação");
        }
    }
}
exports.defaultAdm = new Users("defaultAdm", "teste@gmail.com", "'123", roleServices_1.admRole);
exports.defaultGuest = new Users("defaultGuest", "teste@gmail.com", "'123", roleServices_1.guestRole);
exports.defaultProf = new Users("defaultProf", "teste@gmail.com", "'123", roleServices_1.profRole);
let users = [];
