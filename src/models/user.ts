import { Role } from "./roles";

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    role: Role,
    registerDate: Date,
    lastEdit: Date,
    status: boolean
 }