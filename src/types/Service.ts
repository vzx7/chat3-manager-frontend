export type Service = {
    name: string,
    title: string,
    domain: string,
    type: string,
    brand: string,
    model: string,
    description: string,
    personalPolice: string,
    redirect?: {
        url: string,
        timezone: string
    }
    autoCenter: {
        name: string,
        phone: number,
        address: string,
        email: string
    }
    consultant: {
        name: string,
        male: number,
        photo: File,
        description: string
    }
}
