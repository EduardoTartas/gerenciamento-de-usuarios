import { Role } from "../models/roles";

 export class Roles implements Role {
    regisrterPerm: boolean;
    listAllPerm: boolean;
    listByIdPerm: boolean;
    deletePerm: boolean;
    updatePerm: boolean;

    constructor(
        regisrterPerm: boolean,
        listAllPerm: boolean,
        listByIdPerm: boolean,
        deletePerm: boolean,
        updatePerm: boolean
    ) {
        this.regisrterPerm = regisrterPerm;
        this.listAllPerm = listAllPerm;
        this.listByIdPerm = listByIdPerm;
        this.deletePerm = deletePerm;
        this.updatePerm = updatePerm;
    }
}

export const admRole = new Roles(true, true, true, true, true);
export const guestRole = new Roles(false, true, true, false, false);
export const profRole = new Roles(true, true, true, false, true);