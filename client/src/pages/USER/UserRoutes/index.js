import { useSelector } from "react-redux";
import { globalSelector } from "../../../redux/selector";
import { Outlet } from "react-router-dom";
import ForbiddenPage from "../../ErrorPage/ForbiddenPage";
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
          <ForbiddenPage />
      }
    </>
  );
}

export default UserRoutes;