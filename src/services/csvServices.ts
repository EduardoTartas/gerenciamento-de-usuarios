import fs from 'fs';
import { Users } from './userServices';
import { clear } from '../utils/functions';
import chalk from 'chalk';
import { admRole, guestRole, profRole} from './roleServices';

const usersFilePath = '../data/users.csv';
export let defaultUser: Users;
export let users: Users[] = [];
loadUsers();

// save users to CSV
export function saveAsCsv(): void {
    const row = users.map(user => {
        return `${user.id},${user.name},${user.email},${user.password},${user.role.name},${user.registerDate.toISOString()},${user.lastEdit.toISOString()},${user.status}`;
    }).join('\n');

    fs.writeFile(usersFilePath, row, 'utf-8', (error) => {
        if (error) {
            clear();
            console.log(`${chalk.bold("ERROR!009: ")}Erro ao salvar usuários.`);
        }
    });
}

// load users
export function loadUsers(): void {
    const csvData = fs.readFileSync(usersFilePath, 'utf-8');
    const lines = csvData.split('\n');
    users = lines.filter(line => line.trim() !== "").map(line => {
        const values = line.split(',');

        let role;
        if (values[4] === "Administrador") {
            role = admRole;
        } else if (values[4] === "Visitante") {
            role = guestRole;
        } else role = profRole;

        //build a new Users object
        const user = new Users(
            values[1],
            values[2],
            values[3],
            role
        );

        user.id = values[0];
        user.registerDate = new Date(values[5]);
        user.lastEdit = new Date(values[6]);
        user.status = values[7] === "true";

        return user;
    });


    for (let i = 0; i < users.length; i++) {
        if (users[i].id === "1122334455"){
            defaultUser = users[i];
            break;
        }
    }

    if (!defaultUser) {
        defaultUser = new Users("DefaultUser", "default@user.com", "Def4ult!", admRole);
        defaultUser.status = false;
        defaultUser.id = "1122334455";
        users.push(defaultUser);
        saveAsCsv();
    }
}