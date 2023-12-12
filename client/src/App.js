import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { getProfileUser } from "./services/UserService";
import { useDispatch } from "react-redux";
import globalSlice from "./redux/globalSlice";
import { jwtDecode } from "jwt-decode";
import SpinCustom from "./components/SpinCustom";
import PlaylistDetail from "./pages/USER/PlaylistDetail";
import NotFoundPage from "./pages/ErrorPage/NotFoundPage";
import { getAllAlbumByUser } from "./services/AlbumService";


// ANONYMOUS
const AnonymousRoutes = React.lazy(() => import('./pages/ANONYMOUS/AnonymousRoutes'));
const HomeAnonymous = React.lazy(() => import('./pages/ANONYMOUS/HomePage'));
const LoginPage = React.lazy(() => import('./pages/ANONYMOUS/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/ANONYMOUS/SignupPage'));

// USER
const UserRoutes = React.lazy(() => import('./pages/USER/UserRoutes'));
const HomeUser = React.lazy(() => import('./pages/USER/HomeUser'));

// ADMIN
const AdminRoutes = React.lazy(() => import('./pages/ADMIN/AdminRoutes'))


function LazyLoadingComponent({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
          <SpinCustom />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}

const routes = [
  // USER
  {
    element: (
      <LazyLoadingComponent>
        <UserRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: '/',
        element: (
          <LazyLoadingComponent>
            <HomeUser />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/playlist/:id',
        element: (
          <LazyLoadingComponent>
            <PlaylistDetail />
          </LazyLoadingComponent>
        )
      },
    ]
  },
  // ADMIN
  {
    element: (
      <LazyLoadingComponent>
        <AdminRoutes />
      </LazyLoadingComponent>
    ),
    children: []
  },
  // ANONYMOUS
  {
    element: (
      <LazyLoadingComponent>
        <AnonymousRoutes />
      </LazyLoadingComponent>
    ),
    children: [
      {
        path: '/',
        element: (
          <LazyLoadingComponent>
            <HomeAnonymous />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/search',
        element: (
          <LazyLoadingComponent>
            <HomeAnonymous />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/login',
        element: (
          <LazyLoadingComponent>
            <LoginPage />
          </LazyLoadingComponent>
        )
      },
      {
        path: '/signup',
        element: (
          <LazyLoadingComponent>
            <SignupPage />
          </LazyLoadingComponent>
        )
      },
    ]
  },
  {
    path: "*",
    element: (
      <LazyLoadingComponent>
        <NotFoundPage />
      </LazyLoadingComponent>
    ),
  },
]

function App() {

  const appRoutes = useRoutes(routes);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const user = jwtDecode(localStorage.getItem('token'));
      getProfile(user.payload.id);
      getAlbumByUser(user.payload.id);
    }
  }, [])

  const getProfile = async (id) => {
    try {
      setLoading(true);
      const res = await getProfileUser(id);
      dispatch(globalSlice.actions.setUser(res?.data));
    } finally {
      setLoading(false);
    }
  }

  const getAlbumByUser = async (id) => {
    try {
      setLoading(true);
      const res = await getAllAlbumByUser(id);
      if (res?.isError) return toast.error(res?.msg);
      dispatch(globalSlice.actions.setAlbums(res?.data));
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <ToastContainer />
      <div>{appRoutes}</div>
    </>
  );
}

export default App;
