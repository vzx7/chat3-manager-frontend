import TableService from '../../components/TableService.tsx';
import { User } from '../../types/User.ts';

const Main = () => {
  return (
    <>
      <div className="col-span-12 xl:col-span-8">
        <TableService />
      </div>
    </>
  );
};

export default Main;
