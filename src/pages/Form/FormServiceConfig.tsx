import Breadcrumb from '../../components/Breadcrumb';
import Switcher from '../../components/Switcher';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import { FormHelper } from '../../logic/FormHelper';
import TextFieldError from '../../common/TextFieldError/TextFieldError';
import { Service } from '../../types/Service';
import { APIHelper } from '../../logic/APIHelper';
import 'react-quill/dist/quill.snow.css';
import './FormServiceConfig.css'
import { useNavigate, useParams } from 'react-router-dom';
import { ResponseStatus } from '../../types/ResponseStatus';
import Alerts from '../../UiElements/Alerts';

/**
 * Настройка сервиса
 * @returns 
 */
const FormServiceConfig = () => {
  const [personalPoliceValue, setPersonalPoiiceValue] = useState('');
  const [hiddenPersonalPoiiceError, setHiddenPersonalPoiiceError] = useState('hidden');
  const [isRedirect, setRedirect] = useState(false);
  const [service, setService] = useState<Service>();
  const params = useParams();
  const [alertProps, setAlertProps] = useState<{ isResponseResult: boolean, responseResultMsg: string, responseResultStatus: ResponseStatus }>({
    isResponseResult: false,
    responseResultMsg: '',
    responseResultStatus: ''
  });

  const TZexclude = [
    new RegExp('Africa'),
    new RegExp('America'),
    new RegExp('Antarctica'),
    new RegExp('Atlantic'),
    new RegExp('Australia'),
    new RegExp('Arctic'),
    new RegExp('Pacific'),
    new RegExp('Indian')
  ]
  const timeZoneArr = Intl.supportedValuesOf('timeZone').filter(v => TZexclude.every(x => !x.test(v)));

  useEffect(() => {
    APIHelper.getService(Number(params.id)).then(res => {
      if (res.is) {
        setService(res.data);
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
  }, []);


  const {
    register,
    setError,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': ['black'] }, { 'background': [] }],          // dropdown with defaults from theme
      [{
        'font': [
          { 'color': 'White' }
        ]
      }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ]
  };

  const setURL = (is: boolean) => setRedirect(is);

  const onSubmit = async (data: any) => {
    const file = data.c_photo[0];
    if (file) {
      const error = FormHelper.validateImg(file);

      if (error.is) {
        setError("c_photo", {
          type: "filetype",
          message: error.msg
        });

        return;
      }
    } else {
      setError("c_photo", {
        type: "filetype",
        message: "Файл не найден!"
      });

      return;
    }


    if (!personalPoliceValue || personalPoliceValue.length < 10) {
      setHiddenPersonalPoiiceError('');
      return;
    } else {
      setHiddenPersonalPoiiceError('hidden');
    }

    const formData: Service = {
      id: service?.id,
      name: data.name,
      type: Number(data.type),
      subdomain: service?.subdomain || '',
      title: data.title,
      brand: Number(data.brand),
      //TODO временно отключено
      //model: Number(data.model),
      description: data.description,
      personalPolice: personalPoliceValue,
      autoCenter: {
        name: data.ac_name,
        phone: Number(data.ac_phone),
        address: data.ac_address,
        email: data.ac_email,
        timezone: data.ac_timezone,
      },
      consultant: {
        name: data.c_name,
        male: Number(data.c_male) === 1 ? true : false,
        photo: file,
        description: data.c_description
      }
    }

    if (isRedirect && data.url) {
      formData.url = data.url
    }

    APIHelper.setService(formData).then(res => {
      if (res.is) {
        setAlertProps({
          responseResultStatus: 'ok',
          isResponseResult: true,
          responseResultMsg: `${service?.subdomain}, успешно отконфигурирован.`
        });
        reset();
        setPersonalPoiiceValue('');
        setRedirect(false);

        const navigate = useNavigate();
        const tId = setTimeout(() => {
          navigate('/service-list');
          clearTimeout(tId);
        }, 3000);
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
  }

  return (
    <>
      <Breadcrumb pageName="Конфигурация сервиса" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <Alerts active={alertProps.isResponseResult} msg={alertProps.responseResultMsg} type={alertProps.responseResultStatus} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="border-b border-stroke py-4 dark:border-strokedark">
                  <h3 className="text-black dark:text-white font-bold text-lg">
                    Данные сервиса для поддомена "{service?.subdomain}"
                  </h3>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Тип сервиса <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      {
                      ...register('type', {
                        required: 'Тип сервиса должен быть выбран!',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Выберите тип сервиса</option>
                      <option value="1">Авто</option>
                      <option value="2">Кузовной</option>
                      <option value="3">Сервис</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <TextFieldError errors={errors} error={errors['type']?.message} />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Бренд <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      {
                      ...register('brand', {
                        required: 'Бренд должен быть выбран!',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Выберите бренд</option>
                      <option value="1">BMW</option>
                      <option value="2">Chevrolet</option>
                      <option value="3">Ford</option>
                      <option value="4">Hyundai</option>
                      <option value="5">KIA</option>
                      <option value="6">Mazda</option>
                      <option value="7">Mercedes</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <TextFieldError errors={errors} error={errors['brand']?.message} />
                </div>
                {/* <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Модели <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      {
                      ...register('model', {
                        required: 'Бренд должен быть выбран!',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Выберите модель</option>
                      <option value="i3">i3</option>
                      <option value="i8">i8</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <TextFieldError errors={errors} error={errors['model']?.message} />
                </div> */}
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Название сервиса<span className="text-meta-1">*</span>
                  </label>
                  <input
                    {
                    ...register('name', {
                      required: 'Имя для сервиса обязательно!',
                    })
                    }
                    type="text"
                    placeholder="Введите название сервиса"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <TextFieldError errors={errors} error={errors['name']?.message} />
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Заголовок для title сервиса<span className="text-meta-1">*</span>
                  </label>
                  <input
                    {
                    ...register('title', {
                      required: 'Title для сервиса обязателен!',
                    })
                    }
                    type="text"
                    placeholder="Введите загаловок title сервиса"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <TextFieldError errors={errors} error={errors['title']?.message} />
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Описание сервиса<span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    {
                    ...register('description', {
                      required: 'Описание сервиса обязателено',
                    })
                    }
                    rows={6}
                    placeholder="Введите описание сервиса"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  <TextFieldError errors={errors} error={errors['description']?.message} />
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Текст политики обработки персональных данных<span className="text-meta-1">*</span>
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={personalPoliceValue}
                    onChange={setPersonalPoiiceValue}
                    modules={editorModules}

                  />
                  <p className={"text-danger mt-2 text-sm " + hiddenPersonalPoiiceError} >Политики обработки персональных данных должна быть заполнена!</p>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-2/12">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Редирект
                    </label>
                    <Switcher name='r_is' cb={setURL} />
                  </div>

                  <div className="w-full xl:w-11/12">
                    <label className="mb-3 block text-black dark:text-white">
                      URL
                    </label>
                    <input
                      {
                      ...register('url', {
                        pattern: {
                          value: FormHelper.REGEXP.url,
                          message: 'URL должен быть формата https://example.org/news'
                        }
                      })
                      }
                      disabled={!isRedirect}
                      type="text"
                      placeholder="Введите URL для перенаправления"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <TextFieldError errors={errors} error={errors['url']?.message} />
                </div>
                <div className=" border-stroke py-4 dark:border-strokedark border-t-2 border-b-2 mt-7">
                  <h3 className="text-black dark:text-white font-bold text-lg">
                    Данные автоцентра
                  </h3>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-5">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Название <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {
                      ...register('ac_name', {
                        required: 'Введите название АЦ',
                      })
                      }
                      type="text"
                      placeholder="Введите название АЦ"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <TextFieldError errors={errors} error={errors['ac_name']?.message} />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-black dark:text-white">
                      Телефон <span className="text-meta-1">*</span>
                    </label>
                    <input
                      placeholder="9000000000"
                      {
                      ...register('ac_phone', {
                        required: 'Поле обязательно к заполнению!',
                        pattern: {
                          value: FormHelper.REGEXP.phone,
                          message: 'Поле должно содержать телефонный номер - 10 цифр (без 8/+7)'
                        }
                      })
                      }
                      type="text"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                  <TextFieldError errors={errors} error={errors['ac_phone']?.message} />
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Адрес <span className="text-meta-1">*</span>
                  </label>
                  <input
                    {
                    ...register('ac_address', {
                      required: 'Введите название АЦ',
                    })
                    }
                    type="text"
                    placeholder="Введите адрес АЦ"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <TextFieldError errors={errors} error={errors['ac_address']?.message} />
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email<span className="text-meta-1">*</span>
                  </label>
                  <input
                    {
                    ...register('ac_email', {
                      required: 'Поле обязательно к заполнению!',
                      pattern: {
                        value: FormHelper.REGEXP.email,
                        message: 'Введите корректный email'
                      }
                    })
                    }
                    type="text"
                    placeholder="Введите Email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <TextFieldError errors={errors} error={errors['ac_email']?.message} />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Таймзона <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      {
                      ...register('ac_timezone', {
                        required: 'Выбирете таймзону',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Выбирете таймзону</option>
                      {timeZoneArr.map((tz) => (<option key={tz} value={tz}>{tz}</option>))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                  <TextFieldError errors={errors} error={errors['ac_timezone']?.message} />
                </div>
                <div className=" border-stroke py-4 dark:border-strokedark border-t-2 border-b-2 mt-7">
                  <h3 className="text-black dark:text-white font-bold text-lg">
                    Данные констультанта
                  </h3>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-5">
                  <div className="w-full xl:w-2/5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Имя <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {
                      ...register('c_name', {
                        required: 'Введите имя консультанта',
                      })
                      }
                      type="text"
                      placeholder="Введите имя констультанта"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    <TextFieldError errors={errors} error={errors['c_name']?.message} />
                  </div>
                  <div className="w-full xl:w-1/5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Пол <span className="text-meta-1">*</span>
                    </label>
                    <select
                      {
                      ...register('c_male', {
                        required: 'Уыкажите пол консультанта',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Выбирете пол</option>
                      <option value="1">Мужской</option>
                      <option value="0">Женский</option>
                    </select>
                    <TextFieldError errors={errors} error={errors['c_male']?.message} />
                  </div>

                  <div className="w-full xl:w-2/5">
                    <label className="mb-3 block text-black dark:text-white">
                      Фото <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="file"
                      {...register("c_photo", {
                        required: false
                      })}
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                  </div>
                  <TextFieldError errors={errors} error={errors['c_photo']?.message} />
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Должность и характеристики
                  </label>
                  <textarea

                    {
                    ...register('c_description', {
                      required: 'Введите должность и характеристики',
                    })
                    }
                    rows={6}
                    placeholder="Введите должность и характеристики"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                  <TextFieldError errors={errors} error={errors['c_description']?.message} />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Сохранить конфигурацию
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormServiceConfig;
