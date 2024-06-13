/**
 * Данные ответа
 */
export type ResponseData = {
    /**
     * Упех или нет.
     */
    is: boolean,
    /**
     * Данные ответа
     */
    data?: any | Array<any>,
    /**
     * Сообщение ошибки
     */
    error?: string
}