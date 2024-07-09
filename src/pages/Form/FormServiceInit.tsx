import Breadcrumb from '../../components/Breadcrumb';
import CheckboxTwo from '../../components/CheckboxTwo';
import { useForm } from "react-hook-form";
import { APIHelper } from '../../logic/APIHelper';
import { useContext, useState } from 'react';
import { AuthContext } from '../../logic/Context';
import { ResponseStatus } from '../../types/ResponseStatus';
import TextFieldError from '../../common/TextFieldError/TextFieldError';
import Alerts from '../../UiElements/Alerts';
import { FormHelper } from '../../logic/FormHelper';

const FormServiceInit = () => {
  const [alertProps, setAlertProps ] = useState<{ isResponseResult: boolean, responseResultMsg: string, responseResultStatus: ResponseStatus }>({
    isResponseResult: false,
    responseResultMsg: '',
    responseResultStatus: ''
  });
  //@ts-ignore
  const { currentUser, setCurrentUser } = useContext(AuthContext); 
  const [isSSL, setSSL] = useState(false)
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = async (data: any) => {

    const formData = {
      isSSL,
      domain: data.domain,
      userId: currentUser.id
    };

    APIHelper.createService(formData).then(res => {
      if (res.is) {
        reset();
        setSSL(false);
        const msgPart = res.data?.isConfigured 
        ? 'Данный домен подключен к конфигурации, вы закончили свою работу с этим доменом. Спасибо!'
        : 'Вы можете перейти к списку сервисов и создать конфигурацию для этого домена.';
        setAlertProps({
          responseResultStatus: 'ok',
          isResponseResult: true,
          responseResultMsg: `${data.domain}, успешно добавлен. ${msgPart}`
        })
      } else {
        setAlertProps({
          responseResultStatus: 'error',
          isResponseResult: true,
          responseResultMsg: res.error as string
        });
      }
    }).catch(err => {
      setAlertProps({
        responseResultStatus: 'error',
        isResponseResult: true,
        responseResultMsg: err.message as string
      });
    });
    return;

  }

  return (
    <>
      <Breadcrumb pageName="Создание сервиса" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Данные сервиса --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Данные сервиса
              </h3>
            </div>
            <Alerts active={alertProps.isResponseResult} msg={alertProps.responseResultMsg} type={alertProps.responseResultStatus} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Domain <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {
                      ...register('domain', {
                        required: 'Поле обязательно к заполнению!',
                        pattern: {
                          value: FormHelper.REGEXP.domain,
                          message: 'Введите корректный domain. Он может содержать только буквы латинского алфавита, цифры, дефис (не может содержать два дефиса подряд и начинаться на дефис)'
                        }
                      })
                      }
                      type="text"
                      placeholder="Enter service domain"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <TextFieldError errors={errors} error={errors['domain']?.message} />
                  </div>


                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Enable SSL <span className="text-meta-1">*</span>
                  </label>
                  <CheckboxTwo text="Использовать SSL для этого домена" is={isSSL} idRequired={true} name="isSSL" doCheck={setSSL} />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Разместить домен
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormServiceInit;
