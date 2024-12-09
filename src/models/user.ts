import { Role } from "./roles";

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    age: number,
    role: Role,
    registerDate: Date,
    lastEdit: Date,
    status: boolean
 }