import { Role } from "../models/roles";

export const adm:Role = {
    regisrterPerm: true,
    listAllPerm:   true,
    listByIdPerm:  true,
    deletePerm:    true,
    updatePerm:    true,
}

export const guest:Role = {
    regisrterPerm: false,
    listAllPerm:   true,
    listByIdPerm:  true,
    deletePerm:    false,
    updatePerm:    false,
}

export const prof:Role = {
    regisrterPerm: true,
    listAllPerm:   true,
    listByIdPerm:  true,
    deletePerm:    false,
    updatePerm:    true,
}