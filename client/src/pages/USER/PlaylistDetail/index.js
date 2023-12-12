import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getOnePlaylist } from '../../../services/UserService';
import { useSelector } from 'react-redux';
import { globalSelector } from '../../../redux/selector';
import Header from '../../../components/Header';
import { ContentStyled } from '../../ANONYMOUS/HomePage/styled';
import ModalUpdatePlaylist from './components/ModalUpdatePlaylist';
import { TitleStyled } from './styled';

const PlaylistDetail = () => {

  const { id } = useParams();
  const global = useSelector(globalSelector);
  const location = useLocation();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState({});
  const [openUpdatePlaylist, setOpenUpdatePlaylist] = useState(false);
  const [loading, setLoading] = useState(false);

  const getDetailPlaylist = async () => {
    try {
      setLoading(true);
      const res = await getOnePlaylist(global?.user?._id, { playlistId: id });
      if (res?.isError) navigate('/not-found');
      setPlaylist(res?.data);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDetailPlaylist();
  }, [id, global?.user])


  return (
    <>
      <div className={location.pathname.includes('search') ? "backgroundBlack" : ""}>
        <Header />
      </div>
      <ContentStyled className=" text">
        <div className='d-flex'>
          <div className='image mr-24' onClick={() => setOpenUpdatePlaylist({ ...playlist, id: global?.user?._id, playlistId: id })}>
            <img style={{ width: '230px', height: '230px' }} src={playlist?.avatarPath} alt='' />
          </div>
          <div className='infor d-flex flex-column justify-content-center'>
            <div>Playlist</div>
            <div
              className='fs-80 fw-800 mb-16 mt-16'
              onClick={() => setOpenUpdatePlaylist({ ...playlist, id: global?.user?._id, playlistId: id })}
              style={{ cursor: 'default' }}
            >
              <TitleStyled>
                {playlist?.title}
              </TitleStyled>
            </div>
            <div
              className='fw-700 fs-18'
              onClick={() => setOpenUpdatePlaylist({ ...playlist, id: global?.user?._id, playlistId: id })}
              style={{ cursor: 'default' }}
            >
              {playlist?.description}
            </div>
          </div>
        </div>
        <hr></hr>
        <div>

        </div>
      </ContentStyled>

      {
        !!openUpdatePlaylist &&
        <ModalUpdatePlaylist
          open={openUpdatePlaylist}
          onCancel={() => setOpenUpdatePlaylist(false)}
          onOk={() => getDetailPlaylist()}
        />
      }
    </>
  );
}

export default PlaylistDetail;