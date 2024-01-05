import { useDispatch, useSelector } from "react-redux";
import { globalSelector } from "../../redux/selector";
import { SearchOutlined, CloseOutlined, ArrowDownOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { HeaderStyled, InputHeaderStyled } from "./styled";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonCustom from "../ButtonCustom/MyButton";
import { Dropdown, Tooltip } from "antd";
import ButtonCircle from "../ButtonCustom/ButtonCircle";
import { useState } from "react";
import globalSlice from "../../redux/globalSlice";

const Header = () => {

  const global = useSelector(globalSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [openTooltip, setOpenTooltip] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentSong');
    localStorage.removeItem('currentTime');
    localStorage.removeItem('currentSlider');
    dispatch(globalSlice.actions.setUser({}));
    navigate('/login');
  }

  const menuUser = [
    {
      label: 'Hồ sơ',
      key: '1',
      onClick: () => navigate(`/user/${global?.user?._id}`)
    },
    {
      label: 'Nâng cấp lên Premium',
      key: '2',
    },
    {
      label: 'Hỗ trợ',
      key: '3',
    },
    {
      label: 'Tải xuống',
      key: '4',
    },
    {
      label: 'Cài đặt',
      key: '5',
    },
    {
      label: 'Đăng xuất',
      key: '6',
      onClick: () => handleLogout()
    },
  ]


  return (
    <HeaderStyled className="d-flex-sb">
      {
        location.pathname.includes('search') ?
          <div className="search">
            <InputHeaderStyled
              allowClear={{ clearIcon: <CloseOutlined className="text" /> }}
              prefix={<SearchOutlined className="text" />}
              placeholder='Bạn muốn nghe gì?'
              size="large"
            />
          </div>
          :
          <div></div>
      }

      {
        !localStorage.getItem('token') ?
          <div className="navigator justify-content-flex-end">
            <ButtonCustom
              className='noBackgroundColor fs-16 fw-600'
              onClick={() => navigate('/signup')}
            >
              Đăng ký
            </ButtonCustom>
            <ButtonCustom
              className='haflLarge normal fs-15 fw-700 ml-25'
              onClick={() => navigate('/login')}
            >
              Đăng nhập
            </ButtonCustom>
          </div>
          :
          <div className="navigator d-flex-sb">
            {
              !location.pathname.includes('search') ?
                <ButtonCustom
                  className='noBackgroundColor fs-16 fw-600'
                  onClick={() => navigate('/signup')}
                >
                  Khám phá Premium
                </ButtonCustom> :
                <div></div>
            }

            <ButtonCustom
              className='medium blackBackgroundColor fs-13 fw-700'
              icon={<ArrowDownOutlined />}
            >
              Cài đặt Ứng dụng
            </ButtonCustom>
            <Tooltip arrow={false} color='rgb(46, 43, 43)' title={`Thông tin mới`}>
              <ButtonCircle
                className="backgroundBlack"
                icon={< BellOutlined className="fs-18 text-gray-than" />}
              />
            </Tooltip>
            <Tooltip arrow={false} color='rgb(46, 43, 43)' title={global?.user?.fullname} trigger="hover" open={openTooltip}>
              <Dropdown menu={{ items: menuUser }} trigger={['click']}>
                <ButtonCircle
                  className="backgroundBlack"
                  icon={<UserOutlined className="fs-18 text" />}
                  onMouseOver={() => setOpenTooltip(true)}
                  onMouseOut={() => setOpenTooltip(false)}
                  onClick={() => setOpenTooltip(false)}
                />
              </Dropdown>
            </Tooltip>
          </div>
      }
    </HeaderStyled >
  );
}

export default Header;