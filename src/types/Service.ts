export type Service = {
    name?: string,
    title?: string,
    domain: string,
    /**
     * Тип сервиса
     */
    type?: string,
    brand?: string,
    model?: string,
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
        male: number,
        photo: File,
        description: string
    }
}
