import { useSelector } from "react-redux";
import { globalSelector } from "../../../redux/selector";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../../../components/Layout";


const UserRoutes = () => {
  const global = useSelector(globalSelector);

  return (
    <>
      {
        !global?.user?.is_admin && !!localStorage.getItem('token') ?
          <Layout>
            <Outlet />
          </Layout>
          :
          <Navigate to={'/guest'} />
      }
    </>
  );
}

export default UserRoutes;