import { ErrorValidateType } from "../types/ErrorValidateType";

export class FormHelper {
    /**
     * Регулярные выражения для валидации
     */
    public static readonly REGEXP = {
        /**
         * Фамилия Имя Отчество (кириллица)
         */
        FIO: new RegExp("^(?=.{1,40}$)[а-яёА-ЯЁ]+(?:[-' ][а-яёА-ЯЁ]+)*$"),
        email: new RegExp('^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'),
        url: new RegExp('(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?\/[a-zA-Z0-9]{2,}'),
        phone: new RegExp('(?=(^([^\d]*?\d){10}$))')
    }

    public static validateImg(file: File): ErrorValidateType {
        const accessImgTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
        const error = {
            is: false,
            msg: ''
        }

        if (!accessImgTypes.includes(file.type)) {
            error.is = true;
            error.msg = "Допустима загрузка только изображений в формате (png, svg, jpeg, gif)";
        } else if (file.size > 500000) {
            error.is = true;
            error.msg = "Изображение слишком тяжелое. Допустимо изображение весом не более 500кб.";
        }

        return error;
    }
}