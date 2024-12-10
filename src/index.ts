//import * as roleServices from '../src/services/roleServices';
//import * as userServices from '../src/services/userServices';
//import { Role } from './models/roles';
import { defaultAdm } from './services/userServices';


import { Command } from "commander";

const program = new Command();

program
  .command("newuser")
  .description("Add a new user")
  .argument("<name>", "User name")
  .argument("<email>", "User email")
  .argument("<password>", "User password")
  .argument("<age>", "User age")
  .argument("<role>", "User role")
  .action((name, email, password, age, role) => {
   defaultAdm.registerUser(name, email, password, age, role);
  });

  


program.parse();



//  registerUser(name:string, email:string, password:string, age:number, role:Roles):void{