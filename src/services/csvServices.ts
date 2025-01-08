import fs from 'fs';
import { Users } from './userServices';
import { clear } from '../utils/functions';
import chalk from 'chalk';
import { admRole, guestRole, profRole} from './roleServices';

const usersFilePath = '/home/eduardotartas/Documents/Gerencimento-de-usuarios/src/data/users.csv';
export let defaultUser: Users;
export let users: Users[] = [];

// Carregar usuários do CSV
loadUsers();

// Definir usuário padrão

if (users.length > 0) {
    
} else {
    console.log(`${chalk.bold("ERROR!010: ")}Nenhum usuário padrão encontrado`);
}

// Salvar usuários no CSV
export function saveAsCsv(): void {
    const row = users.map(user => {
        const role = user.role;
        return `${user.id},${user.name},${user.email},${user.password},${role.name},${role.regisrterPerm},${role.listAllPerm},${role.listByIdPerm},${role.deletePerm},${role.updatePerm},${user.registerDate.toISOString()},${user.lastEdit.toISOString()},${user.status}`;
    }).join('\n');

    fs.writeFile(usersFilePath, row, 'utf-8', (error) => {
        if (error) {
            clear();
            console.log(`${chalk.bold("ERROR!009: ")}Erro ao salvar usuários.`);
        }
    });
}

// Carregar usuários do CSV
export function loadUsers(): void {
    const csvData = fs.readFileSync(usersFilePath, 'utf-8');
    const lines = csvData.split('\n');
    users = lines.filter(line => line.trim() !== "").map(line => {
        const values = line.split(',');

        //cria atribui as permissões a uma variavel
        let role;
        if (values[4] === "Administrador") {
            role = admRole;
        }
        else if (values[4] === "Visitante") {
            role = guestRole;
        }
        else role = profRole;

        //constroi um novo objeto com base nas informaçoes do csv
        const user = new Users(
            values[1],
            values[2], 
            values[3],
            role
        );

        //como o construtor do objeto atribui sozinho esses valores temos que editar depois do objeto ja criado
        user.id = values[0];
        user.registerDate = new Date(values[10]);
        user.lastEdit = new Date(values[11]);
        user.status = values[12] === "true";

        return user;
    });


for (let i = 0; i < users.length; i++) {
    if (users[i].id === "1122334455") { // Check if user ID matches
        defaultUser = users[i]; // Set default user // Mark as found
        break; // Exit loop
    }
}

if (!defaultUser) {
    defaultUser = new Users("DefaultUser", "default@user.com", "Def4ult!", admRole);
    defaultUser.id = "1122334455";
    users.push(defaultUser); // Add new default user
}

}