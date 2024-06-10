import axios, { AxiosError, Method } from "axios";
import { Manager } from "../types/Manager";
import { Service } from "../types/Service";
import { Activate } from "../types/Activate";
import { User } from "../types/User";
import { ResponseData } from "../types/ResponseData";
import AdmAva from '../images/avatars/adm.png';
import MngAva from '../images/avatars/mng.png';
import { Role } from "../enums/Role";

/**
 * Роут API
 */
const API_URL = 'http://localhost:3000/';

const user: User = JSON.parse(window.localStorage.getItem('user') || '');

    /**
     * Хелпер для запросов к Api
     * @param url 
     * @param method 
     * @param data 
     * @param headersExt 
     * @returns 
     */
    const request = async (url: string, method: Method, data?: any, headersExt?: Headers): Promise<any> => {
        
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
                headers,
                withCredentials: true
            });
            
            return response.data;
        } catch (error) {
            // Если нет авторизации сообщаем об этом.
            if ((error as AxiosError)?.response?.status === 401) {
                const { data }  = await request('refreshToken', 'get');
                const { user, tokens } = data;
                window.localStorage.setItem('user', JSON.stringify({
                    id: user.id,
                    avatar: user.role !== Role.admin ? AdmAva : MngAva,
                    fio: user.fio,
                    role: user.role,
                    token: tokens.token.key
                })); 
                return request(url, method);
            }
            
            return  (error as AxiosError)?.response?.data;
        }    
    }
axios.interceptors.request.use(
    (config) => {
        if (user) {
            config.headers['Authorization'] = `Bearer ${user?.token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);
/**
 * Класс для взаимодействия с API
 */
export class APIHelper {

    public static refreshToken() {
        return request('refreshToken', 'get');
    }
   
    public static login(authData: Manager) {
        return request('login', 'post', authData);
    }

    public static logout() {
        return request('logout', 'get');
    }

    /**
     * Получиь сервис по id
     * @param serviceId 
     * @returns 
     */
    public static async getService(serviceId: number): Promise<Service> { 
        return await request(String(serviceId), 'get');
    }

    /**
     * Настройка сервиса
     * @param service 
     * @returns 
     */
    public static async setService(service: Service): Promise<boolean> { 
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
    public static getServices(): Promise<ResponseData> { 
        return request('getServices', 'get');
    }

    /**
     * Активировать/деективировать сервис
     * @param params 
     * @returns 
     */
    public static async setActivateService(params: Activate): Promise<boolean> { 
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
    public static async getManager(managerId: number): Promise<ResponseData> {
        return request('users/' + managerId, 'get');
    }
    /**
     * Метод добавления менеджера
     * @param manager 
     */
    public static async SetManager(manager: Manager): Promise<boolean> {
        return request('users/' + manager.id, 'put');
    }

    /**
     * Получить списко менеджеров
     * @returns 
     */
    public static async getManagers(): Promise<Manager[]> {
        const { data } = await axios.get(API_URL);
        return data;
    }

    /**
     * Активировать/деактивировать менеджера
     * @param params 
     * @returns 
     */
    public static async setAcivateManager(params: Activate) { 
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
    public static async removeManager(managerId: number) { 
        const { data } = await axios.delete(API_URL + managerId);
        return data;
    }
}