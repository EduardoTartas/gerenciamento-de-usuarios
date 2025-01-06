import fs from 'fs';
import { Users, /*defaultUser*/ } from './userServices';
import { clear } from '../utils/functions';
import chalk from 'chalk';
import { /*admRole,*/ Roles } from './roleServices';

const usersFilePath = '/home/eduardotartas/Documents/Gerencimento-de-usuarios/src/data/users.csv';

export let users: Users[] = [];
loadUsers();
//save users to csv
export function saveAsCsv(): void {
    const row = users.map(user => {
        const role = user.role;
        return `${user.id},${user.name},${user.email},${user.password},${role.name},${role.regisrterPerm},${role.listAllPerm},${role.listByIdPerm},${role.deletePerm},${role.updatePerm},${user.registerDate.toISOString()},${user.lastEdit.toISOString()},${user.status}`;
    }).join('\n');

    fs.writeFile(usersFilePath, row, 'utf-8', (error) => {
        if (error) {
            clear();
            console.log(`${chalk.bold("ERROR!009: ")}Nenhum usuário encontrado`);
        }
    });
}

//load users
export function loadUsers(): void {
    const csvData = fs.readFileSync(usersFilePath, 'utf-8');
    const lines = csvData.split('\n');
    const usersCSV = lines.filter(line => line.trim() !== "").map(line => {
        const values = line.split(',');

        const user: Users = {
            id: values[0],
            name: values[1],
            email: values[2],
            password: values[3],
            role: new Roles(
                values[4],
                values[5] === "true",
                values[6] === "true",
                values[7] === "true",
                values[8] === "true",
                values[9] === "true"
            ),
            registerDate: new Date(values[10]),
            lastEdit: new Date(values[11]),
            status: values[12] === "true",
            registerUser: () => { },
            listUsers: () => { },
            listUserByID: () => { },
            deleteUser: () => { },
            editUser: () => { }
        };
        return user;
    });
    users = usersCSV;
}

