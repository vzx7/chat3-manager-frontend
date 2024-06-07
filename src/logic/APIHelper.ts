import axios, { AxiosError, Method } from "axios";
import { Manager } from "../types/Manager";
import { Service } from "../types/Service";
import { Activate } from "../types/Activate";
import { User } from "../types/User";
import { ResponseData } from "../types/ResponseData";

/**
 * Роут API
 */
const API_URL = 'http://localhost:3000/';
/**
 * Хелпер для запросов к Api
 * @param url 
 * @param method 
 * @param data 
 * @param headersExt 
 * @returns 
 */
const request = async (url: string, method: Method, data?: any, headersExt?: Headers) => {
        
    let headers = {
        'Content-Type': 'application/json'
    };

    try {

        if (headersExt) {
            headers = {...headers, ...headersExt};
        }

        const response = await axios({
            url: API_URL + url,
            method,
            data,
            headers
        });
        
        return response.data;
    } catch (error) {
        // Если нет авторизации сообщаем об этом.
        if ((error as AxiosError)?.status === 401) {
            return { status: 401, ...((error as AxiosError)?.response?.data || {})}
        }
        
        return  (error as AxiosError)?.response?.data;
    }    
}
/**
 * Класс для взаимодействия с API
 */
export class APIHelper {
    //#user: User | null;

    constructor(user: User | null) {
        //this.#user = user;
        axios.interceptors.request.use(
            (config) => {
        
                if (user) {
                    config.headers['Authorization'] = `Bearer ${user.token}`;
                }
        
                return config;
            },
        
            (error) => {
                return Promise.reject(error);
            }
        );
    }
   
    public login(authData: Manager) {
        return request('login', 'post', authData);
    }

    /**
     * Получиь сервис по id
     * @param serviceId 
     * @returns 
     */
    public async getService(serviceId: number): Promise<Service> { 
        return await request(String(serviceId), 'get');
    }

    /**
     * Настройка сервиса
     * @param service 
     * @returns 
     */
    public async setService(service: Service): Promise<boolean> { 
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
    async getServices(): Promise<ResponseData> { 
        return request('getServices', 'get');
    }

    /**
     * Активировать/деективировать сервис
     * @param params 
     * @returns 
     */
    public async setActivateService(params: Activate): Promise<boolean> { 
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
    public async getManager(managerId: number): Promise<Manager> {
        const { data } = await axios.get(API_URL + managerId);
        return data;
    }
    /**
     * Метод добавления менеджера
     * @param manager 
     */
    public async SetManager(manager: Manager): Promise<boolean> {
        const { data } = await axios.post(
            API_URL + '/users/createUser',
            manager);
        console.log(data)
        return true;
    }

    /**
     * Получить списко менеджеров
     * @returns 
     */
    public async getManagers(): Promise<Manager[]> {
        const { data } = await axios.get(API_URL);
        return data;
    }

    /**
     * Активировать/деактивировать менеджера
     * @param params 
     * @returns 
     */
    public async setAcivateManager(params: Activate) { 
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
    public async removeManager(managerId: number) { 
        const { data } = await axios.delete(API_URL + managerId);
        return data;
    }
}