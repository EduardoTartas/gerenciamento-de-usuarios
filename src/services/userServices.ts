
import { v4 as uuid } from 'uuid';

import * as roleServices from '../services/roleServices';
import * as userServices from '../models/users';

export let user:userServices.User = {
    id: uuid(),
    name: "teste",
    email: "teste",
    password: "teste",
    age: 18,
    role: roleServices.adm,
    registerDate: new Date(),
    lastEdit: new Date(),
    status: true
}


