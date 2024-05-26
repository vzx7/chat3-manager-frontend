import TableService from '../../components/TableService.tsx';
import { User } from '../../types/User.ts';
type Props = {
  currentUser: User | null
}
const Main = ({ currentUser } : Props) => {
  return (
    <>
      <div className="col-span-12 xl:col-span-8">
        <TableService currentUser={currentUser} />
      </div>
    </>
  );
};

export default Main;
