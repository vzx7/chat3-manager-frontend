import Breadcrumb from '../components/Breadcrumb';
import TableManagers from '../components/TableManagers';

const Managers = () => {
  return (
    <>
      <Breadcrumb pageName="Менеджеры" />

      <div className="flex flex-col gap-10">
        <TableManagers />
      </div>
    </>
  );
};

export default Managers;
