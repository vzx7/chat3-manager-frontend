import { NavLink } from "react-router-dom";

const Page404 = () => {
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
