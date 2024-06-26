import Breadcrumb from '../components/Breadcrumb';
import fireToast from '../hooks/fireToast';
import { useForm } from "react-hook-form";
import { FormHelper } from '../logic/FormHelper';
import { Manager } from '../types/Manager';
import { APIHelper } from '../logic/APIHelper';
import TextFieldError from '../common/TextFieldError/TextFieldError';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../logic/Context';
import { ResponseStatus } from '../types/ResponseStatus';

import PasswordGenerator from '../common/PasswordGenerator/PasswordGenerator';
import Switcher from '../components/Switcher';
import Alerts from '../UiElements/Alerts';


const SetManager = () => {
  const [alertProps, setAlertProps ] = useState<{ isResponseResult: boolean, responseResultMsg: string, responseResultStatus: ResponseStatus }>({
    isResponseResult: false,
    responseResultMsg: '',
    responseResultStatus: ''
  }); 

  const [password, setPassword] = useState('');
  const [isPasswordUpdate, setPasswordUpdate] = useState(false);
  //@ts-ignore
  const { currentUser, setCurrentUser } = useContext(AuthContext); 
  
  const { id } = useParams();
  const [manager, setManager] = useState<Manager>();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });
  
  const setEnablePassword = (is: boolean) => setPasswordUpdate(is);

  useEffect(() => {
    if (id) {
      APIHelper.getManager(+id).then((response) => {
        if (response.is) {
          setManager(response.data as Manager);
          reset();
        } 
      }).catch();
    }
  }, []);

  const onSubmit = async (data: any) => {
    console.log(data);

    const formData: Manager = {
      id: manager?.id,
      fio: data.fullName,
      phone: Number(data.phoneNumber),
      email: data.emailAddress,
      password
    };

    const { bio } = data;

    if (bio) {
      formData.bio = bio
    }

    if (manager) {
      if (!isPasswordUpdate) delete formData.password;

      APIHelper.updateManager(formData).then(res => {
        if (res.is) {
          setManager(undefined);
          reset();
          setAlertProps({
            responseResultStatus: 'ok',
            isResponseResult: true,
            responseResultMsg: `Данные менеджера - ${formData.fio} успешно обновлены...`
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
      })
    } else {
      APIHelper.createManager(formData).then(res => {
        if (res.is) {
          reset();
          setAlertProps({
            responseResultStatus: 'ok',
            isResponseResult: true,
            responseResultMsg: `Менеджер ${formData.fio} успешно создан...
            Не забудьте сохранить учетный данные для входа: login: ${formData.email}, password: ${formData.password}
            `
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
      })
    }

  }

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName={`${id ? 'Редактировать' : 'Добавить'} менеджера`} />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Персональная информация
                </h3>
              </div>
              <Alerts active={alertProps.isResponseResult} msg={alertProps.responseResultMsg} type={alertProps.responseResultStatus} />
              <PasswordGenerator cl={setPassword}/>
              <div className="p-7">
                <form  onSubmit={handleSubmit(onSubmit)} action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="fullName"
                      >
                        Полное имя <span className="text-meta-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="fullName"
                          placeholder="ФИО"
                          {
                            ...register('fullName', {
                              required: 'Поле обязательно к заполнению!',
                              value: manager?.fio,
                              pattern: {
                                value: FormHelper.REGEXP.FIO,
                                message: 'Поле должно содержать ФИО - Иван Иванович Иванов (на кириллице)'
                              }
                            })
                          }
                        />
                        <TextFieldError errors={errors} error={errors['fullName']?.message} />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Телефон <span className="text-meta-1">*</span>
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        id="phoneNumber"
                        placeholder="9000000000"
                        {
                          ...register('phoneNumber', {
                            required: 'Поле обязательно к заполнению!',
                            value: manager?.phone,
                            pattern: {
                              value: FormHelper.REGEXP.phone,
                              message: 'Поле должно содержать телефонный номер - 10 цифр (без 8/+7)'
                            }
                          })
                        }
                      />
                      <TextFieldError errors={errors} error={errors['phoneNumber']?.message} />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        id="emailAddress"
                        placeholder="devidjond45@gmail.com"
                        {
                          ...register('emailAddress', {
                            required: 'Поле обязательно к заполнению!',
                            value: manager?.email,
                            pattern: {
                              value: FormHelper.REGEXP.email,
                              message: 'Введите корректный email'
                            }
                          })
                        }
                      />
                      <TextFieldError errors={errors} error={errors['emailAddress']?.message} />
                    </div>
                  </div>


                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Комментарий
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>

                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        id="bio"
                        rows={6}
                        placeholder="Добавить комментарий о менеджере"
                        {...register("bio", {
                          required: false,
                          value: manager?.bio
                        })}
                        ></textarea>
                    </div>
                  </div>
                  {manager ? 
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Нужно ли обновить пароль
                      </label>
                      <Switcher name='r_is' cb={setEnablePassword} />
                    </div>
                  </div>
                  
                  : null}

                  <div className="flex justify-end gap-4.5">

                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                      onClick={fireToast}
                    >
                      Сохранить
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetManager;
