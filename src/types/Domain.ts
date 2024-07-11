export type Domain = {
    id: number,
    subdomain: string,
    domain: string,
    active?: boolean;
    isConfigured?: boolean;
    userId?: number;
    isInitialization?: boolean,
}