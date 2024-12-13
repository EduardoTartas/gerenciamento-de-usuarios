export interface Role {
    readonly name: string,
    readonly regisrterPerm: boolean,
    listAllPerm: boolean,
    listByIdPerm: boolean,
    deletePerm: boolean,
    updatePerm: boolean,
}
