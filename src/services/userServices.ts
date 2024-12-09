import { User } from './../models/user';
import { v4 as uuid } from 'uuid';
import { admRole, guestRole, profRole, Roles } from './../services/roleServices';

const readline = require('readline');
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

class Users implements User{
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    role: Roles;
    registerDate: Date;
    lastEdit: Date;
    status: boolean;

    constructor(name: string, email: string, password: string, age: number, role: Roles){
        this.id           = uuid();
        this.name         = name;
        this.email        = email;
        this.password     = password;
        this.age          = age;
        this.role         = role
        this.registerDate = new Date();
        this.lastEdit     = new Date();
        this.status       = true;
    }

    registerUser(name:string, email:string, password:string, age:number, role:Roles):void{
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        let nameRegex = /^[\s\S]{3,25}$/;

        if(this.role.regisrterPerm){
            while (true){

                if(!nameRegex.test(name)){
                    rl.question('\nDigite o nome do usuário, com no mínimo 3 e no maximo 25 caracteres', (answer: string) => {
                        name = answer; 
                     });
                }

                /* ------- */

                else if(!emailRegex.test(email)){
                    rl.question('\nDigite um email válido para o usuário', (answer: string) => {
                        email = answer; 
                     });
                }

                /* ------- */

                else if(!passwordRegex.test(password)){
                    rl.question('\nDigite uma senha com no mínimo 8 caracteres, letras maiúsculas, letras minúsculas', (answer: string) => {
                        password = answer; 
                     });
                }

                else if(age<=0 || age>=120){
                    rl.question('\nDigite a idade do usuário', (answer: number) => {
                        age = answer; 
                     });
                }
                else break;
            }
            const newUser = new Users(name, email, password, age, role)
            users.push(newUser);
            console.log("Usuário criado com Sucesso");
            
        }
    }    

}

export const defaultAdm  = new Users("defaultAdm","teste@gmail.com","'123",18, admRole);
export const defaultGuest = new Users("defaultGuest","teste@gmail.com","'123",18, guestRole);
export const defaultProf = new  Users("defaultProf","teste@gmail.com","'123",18, profRole);

let users:Users[] = [];