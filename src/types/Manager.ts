import { Role } from "../enums/Role"

export type Manager = {
    id?: number,
    email: string,
    password?: string,
    fio?: string,
    photo?: string,
    phone?: number,
    bio?: string,
    role?: Role,
    active?: boolean
}