"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as roleServices from '../src/services/roleServices';
//import * as userServices from '../src/services/userServices';
//import { Role } from './models/roles';
//import defaultGuest from './services/userServices';
const userServices_1 = require("./services/userServices");
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .command("newuser")
    .description("Add a new user")
    .argument("<name>", "User name")
    .argument("<email>", "User email")
    .argument("<password>", "User password")
    .argument("<role>", "User role")
    .action((name, email, password, role) => {
    userServices_1.defaultAdm.registerUser(name, email, password, role);
});
program.parse();
//  registerUser(name:string, email:string, password:string, age:number, role:Roles):void{
