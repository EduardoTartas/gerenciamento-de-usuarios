import * as roleServices from '../src/services/roleServices';
import { Role } from './models/roles';
import { defaultAdm } from './services/userServices';

const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function actions() {
  rl.question('Is this example useful? [y/n/q] ', (answer: string) => {
    switch (answer.toLowerCase()) {
      case 'y':
        console.log("----- Cadastrar novo usuário -----");

        rl.question('\nDigite o nome do usuário: ', (name: string) => {
          rl.question('\nDigite o email: ', (email: string) => {
            rl.question('\nDigite a senha: ', (password: string) => {
              rl.question('\nDigite a idade: ', (ageStr: string) => {
                const age = parseInt(ageStr, 10);

                console.log("1 - Administrador\n2 - Professor\n3 - Visitante");
                rl.question('\nSelecione o nível de acesso do usuário: ', (roleAnswer: string) => {
                  let role: Role;
                  if (roleAnswer === '1' || roleAnswer.toLowerCase() === 'administrador') {
                    role = roleServices.admRole;
                  } else if (roleAnswer === '2' || roleAnswer.toLowerCase() === 'professor') {
                    role = roleServices.profRole;
                  } else if (roleAnswer === '3' || roleAnswer.toLowerCase() === 'visitante') {
                    role = roleServices.guestRole;
                  } else {
                    console.log('Opção inválida! Usando "Visitante" como padrão.');
                    role = roleServices.guestRole;
                  }

                  // Chamar o método de registro
                  defaultAdm.registerUser(name, email, password, age, role);
                  console.log("Usuário registrado com sucesso!");
                  actions(); // Volta ao menu inicial
                });
              });
            });
          });
        });
        break;

      case 'n':
        console.log('Exemplo não é útil.');
        actions(); // Volta ao menu inicial
        break;

      case 'q':
        console.log('Saindo do programa.');
        rl.close(); // Encerra o programa
        break;

      default:
        console.log('Resposta inválida!');
        actions(); // Volta ao menu inicial
    }
  });
}

actions();
