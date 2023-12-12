import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { globalSelector } from "../../../redux/selector";
import ForbiddenPage from '../../ErrorPage/ForbiddenPage';


const AdminRoutes = () => {

  const global = useSelector(globalSelector);

  return (
    <>
      {
        global?.user?.is_admin && !!localStorage.getItem('token') ?
          <Outlet /> :
          <ForbiddenPage />
      }
    </>
  );
}

export default AdminRoutes;