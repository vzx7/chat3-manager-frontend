import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "../types/User";

type Props = {
  currentUser: User | null
}
const Page404 = ({ currentUser } : Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if(!currentUser) navigate('/auth/signin');
  }, [currentUser])
  return (
    <>
      <div className="col-span-12 xl:col-span-8">
        <p>Такой страницы нет...</p>
        <p> <NavLink
          to="/"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline text-primary"
        >
          Перейти на главную.
        </NavLink> </p>
      </div>
    </>
  );
};

export default Page404;
