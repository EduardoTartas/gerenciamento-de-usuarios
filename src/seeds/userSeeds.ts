import * as role from '../services/roleServices';
import * as users from './../services/userServices';

/*export const teste1 = new users.Users("teste", "teste@teste.com", "123teste" , role.admRole);
export const teste2 = new users.Users("teste", "teste@teste.com", "123teste" , role.admRole);
export const teste3 = new users.Users("teste", "teste@teste.com", "123teste" , role.guestRole);
export const teste4 = new users.Users("teste", "teste@teste.com", "123teste" , role.guestRole);
export const teste5 = new users.Users("teste", "teste@teste.com", "123teste" , role.guestRole);
export const teste6 = new users.Users("teste", "teste@teste.com", "123teste" , role.guestRole);
export const teste7 = new users.Users("teste", "teste@teste.com", "123teste" , role.profRole);
export const teste8 = new users.Users("teste", "teste@teste.com", "123teste" , role.profRole);
export const teste9 = new users.Users("teste", "teste@teste.com", "123teste" , role.profRole);

users.users.push(teste1)*/


export const teste1 = new users.Users("teste", "teste@teste.com", "123teste" , role.admRole);
export const teste2 = new users.Users("teste2", "teste@teste.com", "123teste" ,role.guestRole);
export const teste3 = new users.Users("teste3", "teste@teste.com", "123teste" ,role.profRole);
teste1.id = "123";

users.users.push(teste1, teste2, teste3);