import { useLocation } from "react-router-dom";
import Header from "../../../components/Header";
import { useSelector } from "react-redux";
import { globalSelector } from "../../../redux/selector";
import { useState } from "react";
import { ContentStyled } from "../../ANONYMOUS/HomePage/styled";
import { TitleStyled } from "../PlaylistDetail/styled";
import { CgMoreAlt } from "react-icons/cg";
import { Dropdown } from "antd";
import ModalUpdateProfile from "./components/ModalUpdateProfile";
import ModalChangePassword from "./components/ModalChangePassword";

const ProfileUser = () => {

  const global = useSelector(globalSelector);
  const location = useLocation();
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const menu = [
    {
      label: 'Chỉnh sửa hồ sơ',
      key: '1',
      onClick: () => setOpenUpdateProfile(true)
    },
    {
      label: 'Đổi mật khẩu',
      key: '2',
      onClick: () => setOpenChangePassword(true)
    },
  ]

  return (
    <>
      <div className={location.pathname.includes('search') ? "backgroundBlack" : ""}>
        <Header />
      </div>
      <ContentStyled className=" text">
        <div className='d-flex'>
          <div className='image mr-24' onClick={() => setOpenUpdateProfile(true)}>
            <img style={{ width: '230px', height: '230px' }} src={global?.user?.avatarPath} alt='' />
          </div>
          <div className='infor d-flex flex-column justify-content-center'>
            <div>Hồ sơ</div>
            <div
              className='fs-80 fw-800 mb-16 mt-16'
              onClick={() => setOpenUpdateProfile(true)}
              style={{ cursor: 'default' }}
            >
              <TitleStyled>
                {global?.user?.fullname}
              </TitleStyled>
            </div>
            <div
              className='fw-700 fs-18'
              onClick={() => setOpenUpdateProfile(true)}
              style={{ cursor: 'default' }}
            >
              <span className="mr-4">{global?.user?.playlists?.length}</span>
              <span>danh sách phát</span>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <Dropdown menu={{ items: menu }} trigger={['click']}>
            <CgMoreAlt style={{ cursor: 'pointer' }} className="fs-30" />
          </Dropdown>
        </div>
        <hr></hr>
        <div>

        </div>
      </ContentStyled>

      {
        !!openUpdateProfile &&
        <ModalUpdateProfile
          open={openUpdateProfile}
          onCancel={() => setOpenUpdateProfile(false)}
        />
      }
      {
        !!openChangePassword &&
        <ModalChangePassword
          open={openChangePassword}
          onCancel={() => setOpenChangePassword(false)}
        />
      }
    </>
  );
}

export default ProfileUser;