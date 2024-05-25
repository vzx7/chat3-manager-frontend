import axios from "axios";
import { Manager } from "../types/Manager";
import { Service } from "../types/Service";
import { Activate } from "../types/Activate";

/**
 * Класс для взаимодействия с API
 */
export class APIHelper {
    readonly API_URL = '';

    /**
     * Получиь сервис по id
     * @param serviceId 
     * @returns 
     */
    static async getService(serviceId: number): Promise<Service> { 
        const { data } = await axios.get(API_URL + serviceId);
        return data;
    }

    /**
     * Настройка сервиса
     * @param service 
     * @returns 
     */
    static async setService(service: Service): Promise<boolean> { 
        const { data } = await axios.patch(
            API_URL,
            service,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        console.log(data)
        return true;
    }

    /**
     * Получить все сервисы
     * @returns 
     */
    static async getServices(): Promise<Service[]> { 
        const { data } = await axios.get(API_URL);
        return data;
    }

    /**
     * Активировать/деективировать сервис
     * @param params 
     * @returns 
     */
    static async setActivateDomain(params: Activate): Promise<boolean> { 
        const { data } = await axios.patch(
            API_URL,
            params,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        console.log(data)
        return true;
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
    static async addManager(manager: Manager): Promise<boolean> {
        const { data } = await axios.post(
            API_URL,
            manager,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        console.log(data)
        return true;
    }

    /**
     * Получить списко менеджеров
     * @returns 
     */
    static async getManagers(): Promise<Manager[]> {
        const { data } = await axios.get(API_URL);
        return data;
    }

    /**
     * Активировать/деактивировать менеджера
     * @param params 
     * @returns 
     */
    static async setAcivateManager(params: Activate) { 
        const { data } = await axios.patch(
            API_URL,
            params,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        console.log(data)
        return true;
    }

    /**
     * Удалить менеджера
     * @param managerId 
     * @returns 
     */
    static async removeManager(managerId: number) { 
        const { data } = await axios.delete(API_URL + managerId);
        return data;
    }
}

const API_URL = ''