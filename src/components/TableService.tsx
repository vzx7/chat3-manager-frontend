import { useNavigate } from "react-router-dom";
import { APIHelper } from "../logic/APIHelper";
import { useContext, useEffect, useState } from "react";
import { ResponseData } from "../types/ResponseData";
import { Domain } from "../types/Domain";
import { Role } from "../enums/Role";
import { AuthContext } from "../logic/Context";
import { ResponseStatus } from "../types/ResponseStatus";
import Alerts from "../UiElements/Alerts";

const TableService = () => {
  const [alertProps, setAlertProps] = useState<{ isResponseResult: boolean, responseResultMsg: string, responseResultStatus: ResponseStatus }>({
    isResponseResult: false,
    responseResultMsg: '',
    responseResultStatus: ''
  });
  //@ts-ignore
  const { currentUser } = useContext(AuthContext);

  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const onClick = (ev: any) => {
    const { isconfigured, id, active } = ev.currentTarget.dataset;
    if (isconfigured === 'false') {
      navigate('/service-config/' + id);
      return;
    }

    const is = active === 'true' ? false : true;
    APIHelper.setActivateService({ id: Number(id), active: is }).then(res => {
      if (res.is) {
        setAlertProps({
          responseResultStatus: 'ok',
          isResponseResult: true,
          responseResultMsg: `Сервис ${is ? 'активирован' : 'деактивирован'}...`
        });
        getServices();
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

  const getServices = () => {
    APIHelper.getServices().then((res: ResponseData) => {
      if (res.is) {
        setServices(res.data || []);
      }
    }).catch(err => {
      setAlertProps({
        responseResultStatus: 'error',
        isResponseResult: true,
        responseResultMsg: err.message as string
      });
    })
  }

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <Alerts active={alertProps.isResponseResult} msg={alertProps.responseResultMsg} type={alertProps.responseResultStatus} />
        {services.length ?
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 font-cyrilicBold">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Поддомен
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Дата добавления сервиса
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Инициализация
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Статус
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service: Domain) => (
                <tr key={service.id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      { service.isConfigured && service.active && service.isInitialization ?
                      <a className="text-primary text-blue-600 dark:text-blue-500 hover:underline" target="_blank" href={`https://${service.subdomain}.${service.domain}`}>{service.subdomain}.{service.domain}</a>
                      : 
                      <p>{service.subdomain}.{service.domain}</p>
                      }
                     
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">Jan 13,2023</p>
                  </td>
                  <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className={"inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium " + (!service.isInitialization ? 'text-meta-6 bg-meta-6' : ' text-success bg-success')}>
                      {!service.isInitialization ? 'Ожидает инициализации' : 'Проинициализирован'}
                    </p>
                  </td>
                  <td className=" border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className={"inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium " + (!service.isConfigured ? 'text-meta-6 bg-meta-6' : !service.active ? ' bg-meta-7 text-meta-1' : ' text-success bg-success')}>
                      {!service.isConfigured ? 'Ожидает настройки' : !service.active ? 'Деактивирован' : 'Активен'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {!service.isConfigured ?
                        <button title="Настроить" onClick={onClick} data-isconfigured={service.isConfigured} data-active={service.active} data-id={service.id} className="hover:text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                          </svg>
                        </button>
                        : !service.active && currentUser?.role === Role.admin ?
                          <button title="Активировать" onClick={onClick} data-isconfigured={service.isConfigured} data-active={service.active} data-id={service.id} className="hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                            </svg>
                          </button>
                          : currentUser?.role === Role.admin ?
                            <button title="Деактивировать" onClick={onClick} data-isconfigured={service.isConfigured} data-active={service.active} data-id={service.id} className="hover:text-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                            </button>
                            : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <p>Нет ни одного сервиса...</p>
        }
      </div>
    </div>
  );
};

export default TableService;
