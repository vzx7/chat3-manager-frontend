import { Role } from "../enums/Role"

export type User = {
    id: string,
    fio: string,
    avatar: string,
    role: Role,
    token: string
}