import { Role } from "../models/roles";

 export class Roles implements Role {
    name:string
    regisrterPerm: boolean;
    listAllPerm: boolean;
    listByIdPerm: boolean;
    deletePerm: boolean;
    updatePerm: boolean;

    constructor(
        name:string,
        regisrterPerm: boolean,
        listAllPerm: boolean,
        listByIdPerm: boolean,
        deletePerm: boolean,
        updatePerm: boolean
    ) {
        this.name = name;
        this.regisrterPerm = regisrterPerm;
        this.listAllPerm = listAllPerm;
        this.listByIdPerm = listByIdPerm;
        this.deletePerm = deletePerm;
        this.updatePerm = updatePerm;
    }
}

export const admRole = new Roles("adm", true, true, true, true, true);
export const guestRole = new Roles("guest", false, true, true, false, false);
export const profRole = new Roles("prof",true, true, true, false, true);