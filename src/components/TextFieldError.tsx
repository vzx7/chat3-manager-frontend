/**
 * Компонент для отображения ошибок на формах
 * @param param0 
 * @returns 
 */
const TextFieldError = function ({ error, errors }: { error?: any, errors: any }) {
    console.log(errors)
    return error ? (
        <p className="text-danger mt-2 text-sm" >
            {error}
        </p>
    ) : null;
}

export default TextFieldError;