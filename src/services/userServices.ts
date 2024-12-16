import { User } from './../models/user';
import { v4 as uuid } from 'uuid';
import { admRole, guestRole, profRole, Roles } from './../services/roleServices';
import {currentUser} from '../index';
import chalk from 'chalk';
export let users:Users[] = [];
export class Users implements User{

    id: string;
    name: string;
    email: string;
    password: string;
    role: Roles;
    registerDate: Date;
    lastEdit: Date;
    status: boolean;

    constructor(name: string, email: string, password: string, role: Roles){
        this.id           = uuid();
        this.name         = name;
        this.email        = email;
        this.password     = password;
        this.role         = role;
        this.registerDate = new Date();
        this.lastEdit     = new Date();
        this.status       = true;
    }

    registerUser(name:string, email:string, password:string, roles:string):void{
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        let nameRegex = /^[\s\S]{3,25}$/;
        let error:string[] = [];
        let role = roles.toLocaleLowerCase();
            
                if(!nameRegex.test(name)){
                    error.push(`${chalk.bold("ERROR!000: ")}Digite o nome do usuário, com no mínimo 3 e no maximo 25 caracteres`);
                }
                /* ------- */

                if(!emailRegex.test(email)){
                    error.push(`${chalk.bold("ERROR!001: ")}Digite um email válido para o usuário`);
                }
                /* ------- */

                if(!passwordRegex.test(password)){
                    error.push(`${chalk.bold("ERROR!002: ")}Digite uma senha com no mínimo 8 caracteres, letras maiúsculas, letras minúsculas e um caracter especial`);
                }

                if(role !== "adm" && role !== "guest" && role !== "prof" ){
                    error.push(`${chalk.bold("ERROR!003: ")}Selecione entre os niveis de acesso existente! 'adm', 'guest' ou 'prof'`);
                }

                if(error.length<=0){

                let userRole: Roles;
                if (role === "adm") {
                    userRole = admRole;
                } else if (role === "guest") {
                    userRole = guestRole;
                } else {
                    userRole = profRole;
                }

                const newUser = new Users(name, email, password, userRole);
                users.push(newUser);
                clear();
                console.log("Usuário criado com Sucesso");
                console.log(users);
                }

                else{
                    clear();
                    console.log(`${chalk.bold(`----- TENTE NOVAMENTE -----`)}`);
                    error.forEach((error) =>{
                        console.log(error);
                    })
                }
    }

    listUsers():void{
        if(users.length <= 0){
            clear();
            console.log(`${chalk.bold("ERROR!004: ")}Nenhum usuário encontrado`);
        }
        else{
            clear();
            console.log(`${chalk.bold(`----- USUÁRIOS CADASTRADOS -----`)}`);
            users.forEach(user =>{
                console.log(`\nID: ${chalk.bold.green(user.id)}\nNome: ${user.name}\nE-mail: ${user.email}\nNivel de acesso: ${user.role.name}`);
                if(currentUser == defaultAdm){
                    console.log(`Senha: ${user.password}`);   
                }
            })
        }
    }

    //list user by ID
    listUserByID(id:string):void{
        let filterdUsers:User[] = users.filter(user => user.id === id);

        if(filterdUsers.length <= 0){
            clear();
            console.log(`${chalk.bold("ERROR!005: ")}Nenhum usuário encontrado`);
        }
        else{
            clear();
            console.log(`${chalk.bold(`----- USUÁRIO FILTRADO -----`)}`);
            filterdUsers.forEach(user =>{
                console.log(`\nID: ${chalk.bold.green(user.id)}\nNome: ${user.name}\nE-mail: ${user.email}\nNivel de acesso: ${user.role.name}`);
                if(currentUser == defaultAdm){
                    console.log(`Senha: ${user.password}`);   
                }
            })
        }
    }
    
    //delete user by id (verificar depois com o csv)
    deleteUser(id: string): void {
        const userIndex = users.findIndex(user => user.id === id);
    
        if (userIndex === -1) {
            clear();
            console.log(`${chalk.bold("ERROR!006: ")}Nenhum usuário encontrado`);
        } else {
            clear();
            console.log(`${chalk.bold(`----- USUÁRIO DELETADO -----`)}`);
            console.log(`\nID: ${chalk.bold.green(users[userIndex].id)}\nNome: ${users[userIndex].name}\nE-mail: ${users[userIndex].email}\nNivel de acesso: ${users[userIndex].role.name}`);
            console.log(`\nUsuário ${chalk.bold('DELETADO')} com sucesso da lista de usuários!`);
            users.splice(userIndex, 1);
        }
    }

    editUser(id:string, field:string, info:string):void {
        //editUser(ID, field, info);
        
    }


}

export function clear():void{
    console.log('\x1Bc');
}

export const defaultAdm  = new Users("defaultAdm","teste@gmail.com","'123", admRole);
export const defaultGuest = new Users("defaultGuest","teste@gmail.com","'123", guestRole);
export const defaultProf = new  Users("defaultProf","teste@gmail.com","'123", profRole);


