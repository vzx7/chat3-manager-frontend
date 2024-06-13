import axios, { AxiosError, Method } from "axios";
import { Manager } from "../types/Manager";
import { Service } from "../types/Service";
import { Activate } from "../types/Activate";
import { User } from "../types/User";
import { ResponseData } from "../types/ResponseData";

// Настраиваем интерсептор для авторизации
axios.interceptors.request.use(
    (config) => {
        const user = getUser();
        if (user) {
            config.headers['Authorization'] = `Bearer ${user?.token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

const getUser = () => {
    let user: User | null;

    try {
        user = JSON.parse(localStorage.getItem('user') || '');
    } catch (error) {
        user = null;
    }
    return user;
}

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
const request = async (url: string, method: Method, data?: any, headersExt?: Headers, isRepeatedRequest?: boolean): Promise<any> => {

    let headers = {
        'Content-Type': 'application/json'
    };

    try {

        if (headersExt) {
            headers = { ...headers, ...headersExt };
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
        // Если вернулась ошибка авторизации, пробуем обновить токен
        if ((error as AxiosError)?.response?.status === 401) {
            if (isRepeatedRequest) {
                // в случае исключения обновления рефреш токена жесткий редирект на страницу авторизации
                localStorage.setItem('user', '');
                location.replace(location.origin + '/auth/signin');
                return;
            }

            const { data: respData } = await request('refreshToken', 'get', {}, undefined, true);
            const { token } = respData;
            const user = getUser();
            localStorage.setItem('user', JSON.stringify({ ...user, token }));
            return request(url, method, data, headersExt, true);
        }

        const errorResponse  = (error as AxiosError)?.response?.data;
        if (errorResponse) return errorResponse;

        throw new Error((error  as Error).message || 'Неидентифицированное исключение');       
    }
};

/**
 * Класс для взаимодействия с API
 */
export class APIHelper {
    /**
     * Обновить токен jwt
     * @returns 
     */
    public static refreshToken() {
        return request('refreshToken', 'get');
    }

    /**
     * Авторизоваться
     * @param authData 
     * @returns 
     */
    public static login(authData: Manager) {
        return request('login', 'post', authData);
    }

    /**
     * Выйти из сервиса
     * @returns 
     */
    public static logout() {
        return request('logout', 'get');
    }

    /**
     * Создать сервис
     * @param serviceId 
     * @returns 
     */
    public static createService(formData: object): Promise<ResponseData> {
        return request('createService', 'post', formData);
    }

    /**
     * Получиь сервис по id
     * @param serviceId 
     * @returns 
     */
    public static async getService(serviceId: number): Promise<ResponseData> {
        return request(`getService/${serviceId}`, 'get');
    }

    /**
     * Настройка сервиса
     * @param service 
     * @returns 
     */
    public static async setService(service: Service): Promise<ResponseData> {
        return request('updateService', 'put', service);
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
    public static async setActivateService(params: Activate): Promise<ResponseData> {
        return request('configureServiceActivity', 'put', params);
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
    public static async createManager(manager: Manager): Promise<ResponseData> {
        return request('users/createUser', 'post', manager);
    }

    /**
     * Метод обновления менеджера
     * @param manager 
     */
    public static async updateManager(manager: Manager): Promise<ResponseData> {
        return request('users/' + manager.id, 'put', manager);
    }

    /**
     * Получить списко менеджеров
     * @returns 
     */
    public static async getManagers(): Promise<ResponseData> {
        return request('users', 'get');
    }

    /**
     * Активировать/деактивировать менеджера
     * @param params 
     * @returns 
     */
    public static async setActivateManager(params: Activate) {
        return request('users/setActive', 'put', params);
    }

    /**
     * Удалить менеджера
     * @param managerId 
     * @returns 
     */
    public static async removeManager(managerId: number) {
        return request('users/' + managerId, 'delete');
    }
}