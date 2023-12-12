import { Navigate, Outlet } from "react-router-dom";

const AnonymousRoutes = () => {

  return (
    <>
      {
        !!localStorage.getItem('token') ?
          <Navigate to="/" />
          :
          <Outlet />
      }
    </>
  );
}

export default AnonymousRoutes;