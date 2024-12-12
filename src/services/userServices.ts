import { User } from './../models/user';
import { v4 as uuid } from 'uuid';
import { admRole, guestRole, profRole, Roles } from './../services/roleServices';

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

    registerUser(name:string, email:string, password:string, age:number, roles:string):void{
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        let nameRegex = /^[\s\S]{3,25}$/;
        let error:string[] = [];
        let role = roles.toLocaleLowerCase();
        if(this.role.regisrterPerm){
            
                if(!nameRegex.test(name)){
                    error.push("Digite o nome do usuário, com no mínimo 3 e no maximo 25 caracteres");
                }

                /* ------- */

                if(!emailRegex.test(email)){
                    error.push("Digite um email válido para o usuário");
                }

                /* ------- */

                if(!passwordRegex.test(password)){
                    error.push("Digite uma senha com no mínimo 8 caracteres, letras maiúsculas, letras minúsculas")
                }

                if(age<=0 || age>=120){
                    error.push("Digite uma idade valida")
                }

                if(role !== "adm" && role !== "guest" && role !== "prof" ){
                    error.push("Selecione entre os niveis de acesso existente! 'adm', 'guest' ou 'prof'")
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

                const newUser = new Users(name, email, password, age, userRole);
                users.push(newUser);
                console.log("Usuário criado com Sucesso");
                console.log(users)
                }

                else{
                    console.clear();
                    console.log("----- TENTE NOVAMENTE -----")
                    error.forEach((error) =>{
                        console.log(error)
                    })
                }
        }
        else{
            console.log("Você não tem a permissão necessaria para realizar essa ação")
        }
    }    
}
export const defaultAdm  = new Users("defaultAdm","teste@gmail.com","'123",18, admRole);
export const defaultGuest = new Users("defaultGuest","teste@gmail.com","'123",18, guestRole);
export const defaultProf = new  Users("defaultProf","teste@gmail.com","'123",18, profRole);

let users:Users[] = [];