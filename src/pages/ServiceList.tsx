import Breadcrumb from '../components/Breadcrumb';
import Main from './Dashboard/Main';

const ServiceList = () => {
  return (
    <>
      <Breadcrumb pageName="Список сервисов" />

      <div className="flex flex-col gap-10">
        <Main />
      </div>
    </>
  );
};

export default ServiceList;