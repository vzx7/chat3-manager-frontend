import axios from "axios";
import { Manager } from "../types/Manager";

/**
 * Класс для взаимодействия с API
 */
export class APIHelper {
    readonly API_URL = '';


    static getDomain() { }
    static setDomain() { }
    static getDomains() { }
    static setActivateDomain(domainId: number) { 
        
    }

    /**
     * Метод получения менеджера
     * @param managerId 
     * @returns 
     */
    static async getManager(managerId: number): Promise<Manager> {
        const { data } = await axios.get(API_URL + managerId);
        return data;
    }
    /**
     * Метод добавления менеджера
     * @param manager 
     */
    static async addManager(manager: Manager) {
        const { data } = await axios.post(
            API_URL,
            manager,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        console.log(data)
    }

    /**
     * Получить списко менеджеров
     * @returns 
     */
    static async getManagers(): Promise<Manager[]> {
        const { data } = await axios.get(API_URL);
        return data;
    }

    static setAcivateManager(is: boolean) { }
    static removeManager(managerId: number) { }
}

const API_URL = ''