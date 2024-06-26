export type Domain = {
    id: number,
    domain: string,
    active?: boolean;
    isConfigured?: boolean;
    userId?: number;
    isInitialization?: boolean,
}