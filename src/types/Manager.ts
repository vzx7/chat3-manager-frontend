import { Role } from "../enums/Role"

export type Manager = {
    email: string,
    password: string,
    fio?: string,
    photo?: string,
    phone?: number,
    bio?: string,
    role?: Role
}