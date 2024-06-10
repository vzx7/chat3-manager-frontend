import { Suspense, lazy, useEffect, useState, createContext, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/Authentication/SignIn';
import Loader from './common/Loader';
import routes from './routes';
import Main from './pages/Dashboard/Main';
import Page404 from './pages/404';
import { User } from './types/User';
import useLocalStorage from './hooks/useLocalStorage';
import { AuthContext } from './logic/context';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [user, saveUser] = useLocalStorage<User | null>('user', null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    saveUser(currentUser);
  }, [currentUser])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <AuthContext.Provider value={{
        currentUser,
        setCurrentUser
      }}>
        <Routes>
          <Route path="/auth/signin" element={<SignIn doAuth={((user) => setCurrentUser(user))} />} />
          <Route path="/" element={<DefaultLayout currentUser={currentUser} logout={() => setCurrentUser(null)} />}>
            {currentUser ? <>
              <Route index element={<Main currentUser={currentUser} />} />
              {routes.map((routes, index) => {
                const { path, component: Component } = routes;
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      <Suspense fallback={<Loader />}>
                        <Component />
                      </Suspense>
                    }
                  />
                );
              })}
            </>
              : undefined}
            <Route path="*" element={<Page404 currentUser={currentUser} />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
