"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profRole = exports.guestRole = exports.admRole = exports.Roles = void 0;
class Roles {
    constructor(name, regisrterPerm, listAllPerm, listByIdPerm, deletePerm, updatePerm) {
        this.name = name;
        this.regisrterPerm = regisrterPerm;
        this.listAllPerm = listAllPerm;
        this.listByIdPerm = listByIdPerm;
        this.deletePerm = deletePerm;
        this.updatePerm = updatePerm;
    }
}
exports.Roles = Roles;
exports.admRole = new Roles("Administrador", true, true, true, true, true);
exports.guestRole = new Roles("Visitante", false, true, true, false, false);
exports.profRole = new Roles("Professor", true, true, true, false, true);
