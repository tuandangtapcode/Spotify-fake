import { HomeOutlined, SearchOutlined, BarsOutlined, ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import { PiMusicNotesPlus } from "react-icons/pi";
import { AiFillFolder } from "react-icons/ai";
import { ContentPoperLoginStyled, ContentPoperStyled, ContentSidebarStyled, LogoStyled, SidebarStyled } from './styled';
import { Button, Popover, Tabs, Tooltip } from 'antd';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ButtonCustom from '../ButtonCustom/MyButton';
import { createPlaylist } from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { globalSelector } from '../../redux/selector';
import { toast } from 'react-toastify';
import MyAlbum from './components/MyAlbum';
import MyLibrary from './components/MyLibrary';
import globalSlice from '../../redux/globalSlice';
import ModalInsertUpdateAlbum from '../../pages/ANONYMOUS/AlbumDetail/components/ModalInsertUpdateAlbum';

const Sidebar = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [openPoperCreatePlaylist, setOpenPoperCreatePlaylist] = useState(false);
  const [openPoperLogin, setOpenPoperLogin] = useState(false);
  const global = useSelector(globalSelector);
  const [activeKey, setActiveKey] = useState(1);
  const [openModalCreateAlbum, setOpenModalCreateAlbum] = useState(false);
  const dispatch = useDispatch();

  const handleCreatePlaylist = async () => {
    try {
      setLoading(true);
      const res = await createPlaylist(global?.user?._id);
      if (res?.isError) return toast.error(res?.msg);
      dispatch(globalSlice.actions.setUser({ ...global?.user, playlists: [...global?.user?.playlists, res?.data] }));
      setOpenPoperCreatePlaylist(false);
      navigate(`/playlist/${res?.data?._id}`);
    } finally {
      setLoading(false);
    }
  }


  const items = [
    {
      key: 1,
      label: 'Thư viện',
      children: (
        <MyLibrary handleCreatePlaylist={handleCreatePlaylist} />
      ),
    },
    {
      key: 2,
      label: 'Album của tôi',
      children: (
        <MyAlbum />
      ),
    },
  ]

  const contentPoperLogin = (
    <ContentPoperLoginStyled>
      <p className='text m-0 fs-20 fw-700'>Tạo danh sách phát</p>
      <p className='text mt-8 mb-24 fw-600'>Đăng nhập để tạo và chia sẻ playlist</p>
      <div className='d-flex-end'>
        <ButtonCustom className='fs-15 fw-600 noBackgroundColor' onClick={() => setOpenPoperLogin(false)}>Để sau</ButtonCustom>
        <ButtonCustom
          className='ml-4 fw-700 normal small'
          onClick={() => navigate('/login')}
        >
          Đăng nhập
        </ButtonCustom>
      </div>
    </ContentPoperLoginStyled>
  )

  const contentPoperCreatePlaylist = (
    !localStorage.getItem('token') ?
      <ContentPoperStyled className='align-items-center'
        onClick={() => {
          setOpenPoperCreatePlaylist(false);
          setOpenPoperLogin(true);
        }}
      >
        <PiMusicNotesPlus className='fs-15 mr-4' />
        Tạo danh sách phát mới
      </ContentPoperStyled>
      :
      <>
        <ContentPoperStyled
          className='align-items-center'
          onClick={() => handleCreatePlaylist()}
        >
          <PiMusicNotesPlus
            className='fs-15 mr-4'
          />
          Tạo danh sách phát mới
        </ContentPoperStyled>
        <ContentPoperStyled
          className='align-items-center'
          onClick={() => {
            setOpenModalCreateAlbum(true);
            setOpenPoperCreatePlaylist(false);
          }}
        >
          <AiFillFolder className='fs-15 mr-4' />
          Tạo album nhạc
        </ContentPoperStyled>
      </>
  )

  return (
    <SidebarStyled>
      {
        !localStorage.getItem('token') ?
          <ContentSidebarStyled>
            <div className='sidebar-top'>
              <div className='mr-6 mb-20 mt-10'>
                <Link to={'/'} style={{ textDecoration: 'none' }} className='align-items-center'>
                  <LogoStyled src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2u1yXxib6BV4qZpK8sbQP6uoMZiu_B9I25X5z8xSgw&s' alt='' />
                  <span className='fw-600 text'>Spotify</span>
                </Link>
              </div>

              <div className='mb-20'>
                <NavLink
                  to={'/'}
                  style={{ textDecoration: 'none' }}
                  className={({ isActive }) => isActive ? "text" : "text-gray-than"}
                >
                  <span className='mr-16'><HomeOutlined className='fs-25' /></span>
                  <span className='fw-600'>Trang chủ</span>
                </NavLink>
              </div>

              <div className='mb-16'>
                <NavLink
                  to={'/search'}
                  style={{ textDecoration: 'none' }}
                  className={({ isActive }) => isActive ? "text" : "text-gray-than"}
                >
                  <span className='mr-16'><SearchOutlined className='fs-25' /></span>
                  <span className='fw-600'>Tìm kiếm</span>
                </NavLink>
              </div>
            </div>

            <div className='sidebar-bottom'>
              <div className='d-flex-sb'>
                <div className='d-flex-sb'>
                  <span className='mr-8 text'><BarsOutlined className='fs-25' /></span>
                  <span className='fw-600 text'>Thư viện</span>
                </div>
                <div>
                  <Popover color='rgb(46, 43, 43)' arrow={false} placement="bottomLeft" content={contentPoperCreatePlaylist} open={openPoperCreatePlaylist}>
                    <Tooltip arrow={false} open={openTooltip} color='rgb(46, 43, 43)' title={`Tạo danh sách phát hoặc thư mục`}>
                      <Button
                        className='icon-plus'
                        onClick={() => {
                          setOpenTooltip(false);
                          setOpenPoperCreatePlaylist(!openPoperCreatePlaylist);
                        }}
                        onMouseOver={() => setOpenTooltip(true)}
                        onMouseOut={() => setOpenTooltip(false)}
                        icon={<PlusOutlined />}
                      />
                    </Tooltip>
                  </Popover>
                </div>
              </div>

              <Popover color='rgb(0, 119, 255)' content={contentPoperLogin} placement="right" open={openPoperLogin}>
                <div className='sidebar-bottom-items'>
                  <p className='ml-12 fs-16 fw-600 text'>Tạo danh sách phát đầu tiên của bạn</p>
                  <p className='ml-12 mb-20 fs-15 text'>Rất dễ! Chúng tôi sẽ giúp bạn</p>
                  <ButtonCustom
                    className='ml-12 fs-15 fw-700 normal medium'
                    onClick={() => setOpenPoperLogin(!openPoperLogin)}
                  >
                    Tạo danh sách phát
                  </ButtonCustom>
                </div>
              </Popover>

              <div className='sidebar-bottom-items'>
                <p className='ml-12 fs-16 fw-600 text'>Hãy cùng tìm và theo dõi một số podcast</p>
                <p className='ml-12 mb-20 fs-15 text'>Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới</p>
                <ButtonCustom className='ml-12 fs-15 fw-700 normal medium'>Duyệt xem podcast</ButtonCustom>
              </div>
            </div>
          </ContentSidebarStyled>
          :
          <ContentSidebarStyled>
            <div className='sidebar-top'>
              <div className='mb-20'>
                <NavLink
                  to={'/'}
                  style={{ textDecoration: 'none' }}
                  className={({ isActive }) => isActive ? "text" : "text-gray-than"}
                >
                  <span className='mr-16'><HomeOutlined className='fs-25' /></span>
                  <span className='fw-600'>Trang chủ</span>
                </NavLink>
              </div>

              <div className='mb-16'>
                <NavLink
                  to={'/search'}
                  style={{ textDecoration: 'none' }}
                  className={({ isActive }) => isActive ? "text" : "text-gray-than"}
                >
                  <span className='mr-16'><SearchOutlined className='fs-25' /></span>
                  <span className='fw-600'>Tìm kiếm</span>
                </NavLink>
              </div>
            </div>

            <div className='sidebar-bottom'>
              <div className='d-flex-sb mb-12' style={{ padding: '12px' }}>
                <div className='d-flex-sb'>
                  <span className='mr-8 text'><BarsOutlined className='fs-25' /></span>
                  <span
                    className={activeKey === 1 ? 'fw-600 mr-8 text' : 'fw-600 mr-8 text-gray'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveKey(1)}
                  >
                    Thư viện
                  </span>
                  <span
                    className={activeKey === 2 ? 'fw-600 mr-8 text' : 'fw-600 mr-8 text-gray'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveKey(2)}
                  >
                    Album của tôi
                  </span>
                </div>

                <div>
                  <Popover color='rgb(46, 43, 43)' arrow={false} placement="bottomLeft" content={contentPoperCreatePlaylist} open={openPoperCreatePlaylist}>
                    <Tooltip arrow={false} open={openTooltip} color='rgb(46, 43, 43)' title={`Tạo danh sách phát hoặc thư mục`}>
                      <ButtonCustom
                        className='icon-plus'
                        onClick={() => {
                          setOpenTooltip(false);
                          setOpenPoperCreatePlaylist(!openPoperCreatePlaylist);
                        }}
                        onMouseOver={() => setOpenTooltip(true)}
                        onMouseOut={() => setOpenTooltip(false)}
                        icon={<PlusOutlined />}
                      />
                    </Tooltip>
                  </Popover>
                  <Button
                    className='icon-plus'
                    icon={<ArrowRightOutlined />}
                  />
                </div>
              </div>

              <div className='sidebar-bottom-content'>
                <Tabs defaultActiveKey={1} activeKey={activeKey} items={items} />
              </div>
            </div>
          </ContentSidebarStyled>
      }

      {
        !!openModalCreateAlbum &&
        <ModalInsertUpdateAlbum
          open={openModalCreateAlbum}
          // onOk={() => }
          onCancel={() => setOpenModalCreateAlbum(false)}
        />
      }
    </SidebarStyled>
  );
}

export default Sidebar;