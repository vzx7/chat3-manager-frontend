import { lazy } from 'react';

const FormServiceInit = lazy(() => import('../pages/Form/FormServiceInit'));
const FormServiceConfig = lazy(() => import('../pages/Form/FormServiceConfig'));
const Managers = lazy(() => import('../pages/Managers'));
const SetManager = lazy(() => import('../pages/SetManager'));
const ServiceList = lazy(() => import('../pages/ServiceList'));

const coreRoutes = [
  {
    path: '/service-create',
    title: 'Инициализация сервиса',
    component: FormServiceInit,
  },
  {
    path: '/service-config/:id',
    title: 'Настройка сервиса',
    component: FormServiceConfig,
  },
  {
    path: '/service-list',
    title: 'Список сервисов',
    component: ServiceList,
  },
  {
    path: '/managers',
    title: 'Список менеджеров',
    component: Managers,
  },
  {
    path: '/add-manager',
    title: 'Добавить менеджера',
    component: SetManager,
  },
  {
    path: '/edit-manager/:id',
    title: 'Редактировать менеджера',
    component: SetManager,
  }
];

const routes = [...coreRoutes];
export default routes;
