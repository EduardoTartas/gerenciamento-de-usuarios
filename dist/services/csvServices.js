"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.defaultUser = void 0;
exports.saveAsCsv = saveAsCsv;
exports.loadUsers = loadUsers;
const fs_1 = __importDefault(require("fs"));
const userServices_1 = require("./userServices");
const functions_1 = require("../utils/functions");
const chalk_1 = __importDefault(require("chalk"));
const roleServices_1 = require("./roleServices");
const usersFilePath = '/home/eduardotartas/Documents/gerencimento-de-usuarios/data/users.csv';
exports.users = [];
loadUsers();
// save users to CSV
function saveAsCsv() {
    const row = exports.users.map(user => {
        return `${user.id},${user.name},${user.email},${user.password},${user.role.name},${user.registerDate.toISOString()},${user.lastEdit.toISOString()},${user.status}`;
    }).join('\n');
    fs_1.default.writeFile(usersFilePath, row, 'utf-8', (error) => {
        if (error) {
            (0, functions_1.clear)();
            console.log(`${chalk_1.default.bold("ERROR!009: ")}Erro ao salvar usuários.`);
        }
    });
}
// load users
function loadUsers() {
    const csvData = fs_1.default.readFileSync(usersFilePath, 'utf-8');
    const lines = csvData.split('\n');
    exports.users = lines.filter(line => line.trim() !== "").map(line => {
        const values = line.split(',');
        let role;
        if (values[4] === "Administrador") {
            role = roleServices_1.admRole;
        }
        else if (values[4] === "Visitante") {
            role = roleServices_1.guestRole;
        }
        else
            role = roleServices_1.profRole;
        //build a new Users object
        const user = new userServices_1.Users(values[1], values[2], values[3], role);
        user.id = values[0];
        user.registerDate = new Date(values[5]);
        user.lastEdit = new Date(values[6]);
        user.status = values[7] === "true";
        return user;
    });
    for (let i = 0; i < exports.users.length; i++) {
        if (exports.users[i].id === "1122334455") {
            exports.defaultUser = exports.users[i];
            break;
        }
    }
    if (!exports.defaultUser) {
        exports.defaultUser = new userServices_1.Users("DefaultUser", "default@user.com", "Def4ult!", roleServices_1.admRole);
        exports.defaultUser.status = false;
        exports.defaultUser.id = "1122334455";
        exports.users.push(exports.defaultUser);
        saveAsCsv();
    }
}
