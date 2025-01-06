import { User } from './../models/user';
import { v4 as uuid } from 'uuid';
import { admRole, guestRole, profRole, Roles } from './../services/roleServices';
import { saveAsCsv, users } from '../services/csvServices';
import { verifyName, verifyEmail, verifyPassword, verifyRole, encrypt, error, showErrors, clear } from '../utils/functions';
import chalk from 'chalk';

export class Users implements User {

    id: string;
    name: string;
    email: string;
    password: string;
    role: Roles;
    registerDate: Date;
    lastEdit: Date;
    status: boolean;

    constructor(name: string, email: string, password: string, role: Roles) {
        this.id = uuid();
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.registerDate = new Date();
        this.lastEdit = new Date();
        this.status = true;
    }

    registerUser(name: string, email: string, password: string, roles: string): void {
        let role = roles.toLocaleLowerCase();

        verifyName(name);
        verifyEmail(email);
        verifyPassword(password);
        verifyRole(role);

        if (error.length <= 0) {
            let userRole: Roles;

            if (role === "adm") {
                userRole = admRole;
            }
            else if (role === "guest") {
                userRole = guestRole;
            }
            else userRole = profRole;


            const newUser = new Users(name, email, encrypt(password), userRole);
            users.push(newUser);
            console.log(users);
            saveAsCsv();
            clear();
            console.log("Usuário criado com Sucesso");
        }
        else {
            clear();
            console.log(`${chalk.bold(`----- TENTE NOVAMENTE -----`)}`);
            showErrors();
        }
    }

    listUsers(): void {
        if (users.length <= 0) {
            clear();
            console.log(`${chalk.bold("ERROR!004: ")}Nenhum usuário encontrado`);
        }
        else {
            clear();
            console.log(`${chalk.bold(`----- USUÁRIOS CADASTRADOS -----`)}`);
            users.forEach(user => {
                console.log(`\nID: ${chalk.bold.green(user.id)}\nNome: ${user.name}\nE-mail: ${user.email}\nNivel de acesso: ${user.role.name}`);
                if (this.role == admRole) {
                    console.log(`Senha: ${user.password}\nCriação: ${user.registerDate.toLocaleDateString}\nÚltima alteração: ${user.lastEdit.toLocaleDateString()}`);
                }
            })
        }
    }

    //list user by ID
    listUserByID(id: string): void {
        let filterdUsers: User[] = users.filter(user => user.id === id);

        if (filterdUsers.length <= 0) {
            clear();
            console.log(`${chalk.bold("ERROR!005: ")}Nenhum usuário encontrado`);
        }
        else {
            clear();
            console.log(`${chalk.bold(`----- USUÁRIO FILTRADO -----`)}`);
            filterdUsers.forEach(user => {
                console.log(`\nID: ${chalk.bold.green(user.id)}\nNome: ${user.name}\nE-mail: ${user.email}\nNivel de acesso: ${user.role.name}`);
                if (this.role == admRole) {
                    console.log(`Senha: ${user.password}\nCriação: ${user.registerDate.toLocaleDateString()}\nÚltima alteração: ${user.lastEdit.toLocaleDateString()}`);
                }
            })
        }
    }

    //delete user by id
    deleteUser(id: string): void {
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            clear();
            console.log(`${chalk.bold("ERROR!006: ")}Nenhum usuário encontrado`);
        }
        else {
            clear();
            console.log(`${chalk.bold(`----- USUÁRIO DELETADO -----`)}`);
            console.log(`\nID: ${chalk.bold.green(users[userIndex].id)}\nNome: ${users[userIndex].name}\nE-mail: ${users[userIndex].email}\nNivel de acesso: ${users[userIndex].role.name}`);
            console.log(`\nUsuário ${chalk.bold('DELETADO')} com sucesso da lista de usuários!`);
            users.splice(userIndex, 1);
            saveAsCsv();
        }
    }

    editUser(id: string, field: string, info: string): void {
        let userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            clear();
            console.log(`${chalk.bold("ERROR!007: ")}Nenhum usuário encontrado`);
        }
        else {
            switch (field) {

                case "name":
                    verifyName(info);
                    if (error.length <= 0) {
                        users[userIndex].name = info;
                    }
                    else showErrors();

                    break;

                case "email":
                    verifyEmail(info);
                    if (error.length <= 0) {
                        users[userIndex].email = info;
                    }
                    else showErrors();
                    break;

                case "password":
                    verifyPassword(info);
                    if (error.length <= 0) {
                        users[userIndex].password = encrypt(info);
                    }
                    else showErrors();
                    break;

                case "role":
                    verifyRole(info);
                    if (error.length <= 0) {
                        let userRole: Roles;

                        if (info === "adm") {
                            userRole = admRole;
                        }
                        else if (info === "guest") {
                            userRole = guestRole;
                        }
                        else userRole = profRole;

                        users[userIndex].role = userRole;
                    }
                    else showErrors();
                    break;

                default:
                    clear();
                    error.push(`${chalk.bold("ERROR!008: ")}Campo inválido!`);
                    showErrors();
                    break
            }

            if (error.length <= 0) {
                saveAsCsv();
                users[userIndex].lastEdit = new Date();
                clear();
                console.log(`${chalk.bold(`----- USUÁRIO EDITADO -----`)}`);
                console.log(`\nID: ${chalk.bold.green(users[userIndex].id)}\nNome: ${users[userIndex].name}\nE-mail: ${users[userIndex].email}\nNivel de acesso: ${users[userIndex].role.name}`);
                console.log(`\nCampo ${chalk.bold(field)} alterado com sucesso!`);
            }

        }
    }
}

export const defaultUser = new Users("defaultAdm", "default@gmail.com", "123", admRole);
users.push(defaultUser);


