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
    data?: object | Array<any>,
    /**
     * Сообщение ошибки
     */
    error?: string
}