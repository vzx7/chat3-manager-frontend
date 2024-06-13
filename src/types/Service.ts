export type Service = {
    id?: number,
    name?: string,
    title?: string,
    domain: string,
    /**
     * Тип сервиса
     */
    type?: number,
    brand?: number,
    model?: number,
    description?: string,
    personalPolice?: string,
    url?: string,
    autoCenter?: {
        name: string,
        phone: number,
        address: string,
        email: string,
        timezone: string
    }
    consultant?: {
        name: string,
        male: boolean,
        photo: File,
        description: string
    }
}
