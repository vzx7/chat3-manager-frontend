import Breadcrumb from '../../components/Breadcrumb';
import SwitcherTwo from '../../components/SwitcherTwo';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './FormServiceConfig.css'
import { FormHelper } from '../../logic/FormHelper';

/**
 * todo
 * Поля: 
 * - Тип приложения - селект (сервисные или кузовные)
 * - Марка авто - селект
 * - Список моделей, в зависимости от марки авто
 * - имя и фот консультанта
 * 
 * @returns 
 */
const FormServiceConfig = () => {
  const [personalPoliceValue, setPersonalPoiiceValue] = useState('');
  const [isRedirect, setRedirect] = useState(true);
  const {
    register,
    setError,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const setURL = (is: boolean) => setRedirect(is);

  const onSubmit = async (data: any) => {
    console.log(data);

    const file = data.c_photo[0];
    const error = FormHelper.validateImg(file);

    if (error.is) {
      setError("selectedfile", {
        type: "filetype",
        message: error.msg
      });

      return;
    }
    
    const formData = new FormData();
    formData.append("selectedfile", data.selectedfile[0]);
    formData.append("fullName", data.fullName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("emailAddress", data.emailAddress);
    formData.append("bio", data.fullName);
    
    reset();

    const requestOptions = {
      method: "POST",
      // headers: { 'Content-Type': 'application/json' },
      body: formData
    };
    return;

  }
  function TextFieldError({ error, errors }: { error?: any, errors: any }) {
    console.log(errors)
    return error ? (
      <p className="text-danger mt-2 text-sm" >
        {error}
      </p>
    ) : null;
  }
  const modules =  {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
    
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
    
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
      [{ 'color': ['black'] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [
        { 'color': 'White' }
      ] }],
      [{ 'align': [] }],
    
      ['clean']                                         // remove formatting button
    ]
  };
  return (
    <>
      <Breadcrumb pageName="Конфигурация сервиса" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="border-b border-stroke py-4 dark:border-strokedark">
                  <h3 className="text-black dark:text-white font-bold text-lg">
                    Данные сервиса
                  </h3>
                </div>
                <div className="mb-4.5 mt-2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Domain <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      {
                      ...register('s_domain', {
                        required: 'Домен должен быть выбран!',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">

                      <option value="0">Выберите домен сервиса </option>
                      <option value="14">kia-the-best</option>
                      <option value="17">bmw-cool</option>
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
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Тип сервиса <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      {
                      ...register('s_type', {
                        required: 'Домен должен быть выбран!',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="0">Выберите тип сервиса</option>
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
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Бренд <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      {
                      ...register('s_brand', {
                        required: 'Бренд должен быть выбран!',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="0">Выберите бренд</option>
                      <option value="">BMW</option>
                      <option value="">Chevrolet</option>
                      <option value="">Ford</option>
                      <option value="">Hyundai</option>
                      <option value="">KIA</option>
                      <option value="">Mazda</option>
                      <option value="">Mercedes</option>
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
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Модели <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      {
                      ...register('s_model', {
                        required: 'Бренд должен быть выбран!',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="0">Выберите модель</option>
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
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Название сервиса<span className="text-meta-1">*</span>
                  </label>
                  <input
                    {
                    ...register('s_name', {
                      required: 'Имя для сервиса обязательно!',
                    })
                    }
                    type="text"
                    placeholder="Введите название сервиса"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Заголовок для title сервиса<span className="text-meta-1">*</span>
                  </label>
                  <input
                    {
                    ...register('s_title', {
                      required: 'Title для сервиса обязателен!',
                    })
                    }
                    type="text"
                    placeholder="Введите загаловок title сервиса"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Описание сервиса<span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    {
                    ...register('s_description', {
                      required: 'Описание сервиса обязателено',
                    })
                    }
                    rows={6}
                    placeholder="Введите описание сервиса"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Текст политики обработки персональных данных<span className="text-meta-1">*</span>
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={personalPoliceValue}
                    onChange={setPersonalPoiiceValue}
                    modules={modules}
                    
                  />
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-2/12">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Редирект  <span className="text-meta-1">*</span>
                    </label>
                    <SwitcherTwo name='r_is' cb={setURL} />
                  </div>

                  <div className="w-full xl:w-11/12">
                    <label className="mb-3 block text-black dark:text-white">
                      URL <span className="text-meta-1">*</span>
                    </label>
                    <input
                      {
                      ...register('r_url', {
                        pattern: {
                          value: FormHelper.REGEXP.url,
                          message: 'URL должен быть формата https://example.org/news'
                        }
                      })
                      }
                      disabled={isRedirect}
                      type="text"
                      placeholder="Введите URL для перенаправления"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Таймзона <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      {
                      ...register('r_timezone', {
                        required: 'Выбирете таймзону',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Выбирете таймзону</option>
                      <option value="">Europa/Moscow</option>
                      <option value="">Europa/Berlin</option>
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
                  </div>
                  <div className="w-full xl:w-1/5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Пол <span className="text-meta-1">*</span>
                    </label>
                    <select
                      {
                      ...register('c_male', {
                        required: 'Введите имя консультанта',
                      })
                      }
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="1">Выбирете пол</option>
                      <option value="1">Мужской</option>
                      <option value="0">Женский</option>
                    </select>
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
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    BIO<span className="text-meta-1">*</span>
                  </label>
                  <textarea

                    {
                    ...register('c_desc', {
                      required: 'Введите имя консультанта',
                    })
                    }
                    rows={6}
                    placeholder="Введите BIO"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  ></textarea>
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
