import { useSelector } from 'react-redux';
import { HomeOutlined, SearchOutlined, BarsOutlined, ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import { PiMusicNotesPlus } from "react-icons/pi";
import { AiFillFolder } from "react-icons/ai";
import { globalSelector } from '../../redux/selector';
import { ContentPoperLoginStyled, ContentPoperStyled, LogoStyled, SidebarStyled } from './styled';
import { Button, Popover, Tooltip } from 'antd';
import { useState } from 'react';


const Sidebar = () => {

  const global = useSelector(globalSelector);
  const [openTooltip, setOpenTooltip] = useState(false);

  const contentPoperLogin = (
    <ContentPoperLoginStyled>
      <p>Tạo danh sách phát</p>
      <p>Đăng nhập để tạo và chia sẻ playlist</p>
      <div>
        <button>Để sau</button>
        <button>Đăng nhập</button>
      </div>
    </ContentPoperLoginStyled>
  )

  const contentPoperCreatePlaylist = (
    !global?.isLogin ?
      <>
        <ContentPoperStyled className='d-flex-align-items-center'>
          <Popover content={contentPoperLogin} placement="right" trigger="click">
            <PiMusicNotesPlus className='fs-15 mr-4' />
            Tạo danh sách phát mới
          </Popover>
        </ContentPoperStyled>
      </>

      :
      <>
        <ContentPoperStyled className='d-flex-align-items-center'>
          <PiMusicNotesPlus className='fs-15 mr-4' />
          Tạo danh sách phát mới
        </ContentPoperStyled>
        <ContentPoperStyled className='d-flex-align-items-center'>
          <AiFillFolder className='fs-15 mr-4' />
          Tạo thư mục danh sách phát
        </ContentPoperStyled>
      </>
  )

  return (
    <SidebarStyled>
      {
        !global?.isLogin ?
          <>
            <div className='sidebar-top'>
              <div style={{ cursor: 'pointer' }} className='d-flex-align-items-center mr-6 mb-20 mt-10'>
                <LogoStyled src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2u1yXxib6BV4qZpK8sbQP6uoMZiu_B9I25X5z8xSgw&s' alt='' />
                <span>Spotify</span>
              </div>

              <div style={{ cursor: 'pointer' }} className='mb-20'>
                <span className='mr-16'><HomeOutlined className='fs-25' /></span>
                <span>Trang chủ</span>
              </div>

              <div style={{ cursor: 'pointer' }} className='mb-16'>
                <span className='mr-16'><SearchOutlined className='fs-25' /></span>
                <span>Tìm kiếm</span>
              </div>
            </div>

            <div className='sidebar-bottom'>
              <div className='d-flex-sb'>
                <div className='d-flex-sb'>
                  <span className='mr-8'><BarsOutlined className='fs-25' /></span>
                  <span>Thư viện</span>
                </div>

                <Popover color='rgb(46, 43, 43)' arrow={false} placement="bottomLeft" content={contentPoperCreatePlaylist} trigger="click">
                  <Tooltip arrow={false} open={openTooltip} color='rgb(46, 43, 43)' title={`Tạo danh sách phát hoặc thư mục`}>
                    <Button
                      className='icon-plus'
                      onClick={() => setOpenTooltip(false)}
                      onMouseOver={() => setOpenTooltip(true)}
                      onMouseOut={() => setOpenTooltip(false)}
                      icon={<PlusOutlined />}
                    />
                  </Tooltip>
                </Popover>
              </div>

              <div className='sidebar-bottom-items'>
                <p className='ml-12 fs-16 fw-600'>Tạo danh sách phát đầu tiên của bạn</p>
                <p className='ml-12 mb-20 fs-15'>Rất dễ! Chúng tôi sẽ giúp bạn</p>
                <button className='ml-12 fs-15 fw-600'>Tạo danh sách phát</button>
              </div>

              <div className='sidebar-bottom-items'>
                <p className='ml-12 fs-16 fw-600'>Hãy cùng tìm và theo dõi một số podcast</p>
                <p className='ml-12 mb-20 fs-15'>Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới</p>
                <button className='ml-12 fs-15 fw-600'>Duyệt xem podcast</button>
              </div>

            </div>
          </> :
          <>
            <div className='sidebar-bottom'>
              <div style={{ cursor: 'pointer' }} className='d-flex-align-items-center mr-6 mb-20 mt-10'>
                <LogoStyled src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2u1yXxib6BV4qZpK8sbQP6uoMZiu_B9I25X5z8xSgw&s' alt='' />
                <span>Spotify</span>
              </div>

              <div style={{ cursor: 'pointer' }} className='mb-20'>
                <span className='mr-16'><HomeOutlined style={{ fontSize: '25px' }} /></span>
                <span>Trang chủ</span>
              </div>

              <div style={{ cursor: 'pointer' }} className='mb-16'>
                <span className='mr-16'><SearchOutlined style={{ fontSize: '25px' }} /></span>
                <span>Tìm kiếm</span>
              </div>
            </div>

            <div className='sidebar-bottom'>
              <div className='d-flex-sb'>
                <div className='d-flex-sb'>
                  <span className='mr-8'><BarsOutlined style={{ fontSize: '25px' }} /></span>
                  <span>Thư viện</span>
                </div>

                <div>
                  <PlusOutlined />
                  <ArrowRightOutlined />
                </div>
              </div>
            </div>
          </>
      }
    </SidebarStyled>
  );
}

export default Sidebar;