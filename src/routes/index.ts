import { lazy } from 'react';
import { redirect } from 'react-router-dom';

const FormServiceInit = lazy(() => import('../pages/Form/FormServiceInit'));
const FormServiceConfig = lazy(() => import('../pages/Form/FormServiceConfig'));
const Managers = lazy(() => import('../pages/Managers'));
const AddManager = lazy(() => import('../pages/AddManager'));
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
    component: AddManager,
  }
];

const routes = [...coreRoutes];
export default routes;
