import { Role } from "../enums/Role"

export type Manager = {
    fio: string,
    photo: File,
    phone: number,
    email: string,
    bio?: string,
    role?: Role
}