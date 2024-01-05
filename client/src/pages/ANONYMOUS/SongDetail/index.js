import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout";
import Header from "../../../components/Header";
import { ContentStyled } from "../HomePage/styled";
import { TitleStyled } from "../../USER/PlaylistDetail/styled";
import { AvatarArtistStyled, DotStyled } from "../AlbumDetail/styled";
import moment from "moment";
import { convertSecondsToMinutesAndSeconds } from "../../../lib/stringUtils";
import SpinCustom from "../../../components/SpinCustom";
import { getAllSongByAlbum, getOneSong } from "../../../services/SongService";
import { toast } from "react-toastify";
import { ButtonCicleStyled } from "../../../components/ButtonCustom/ButtonCircle/styled";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HeartOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import { globalSelector } from "../../../redux/selector";
import ButtonCustom from "../../../components/ButtonCustom/MyButton";
import { AvatarArtistSongStyled } from "./styled";
import { Col, Row } from "antd";
import RelatedSong from "./components/RelatedSong";
import globalSlice from "../../../redux/globalSlice";


const SongDetail = () => {

  const { id } = useParams();
  const location = useLocation();
  const global = useSelector(globalSelector);
  const [song, setSong] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSetCurrentMusic = (record) => {
    if (!!localStorage.getItem('token')) {
      localStorage.setItem('currentSong', JSON.stringify(record));
      if (!!localStorage.getItem('currentTime')) {
        localStorage.removeItem('currentTime')
      }
      if (!!localStorage.getItem('currentSlider')) {
        localStorage.removeItem('currentSlider')
      }
      dispatch(globalSlice.actions.setCurrentSong(record));
      dispatch(globalSlice.actions.setIsPlay(true));
    } else {
      navigate('/login');
    }
  }

  const getDetailSong = async () => {
    try {
      setLoading(true);
      const res = await getOneSong(id);
      if (res?.isError) return toast.error(res?.msg);
      setSong(res?.data);
    } finally {
      setLoading(false);
    }
  }

  const getSongsRelatedSong = async () => {
    try {
      setLoading(true);
      const res = await getAllSongByAlbum(song?.albumId?._id);
      if (res?.isError) navigate('/not-found');
      dispatch(globalSlice.actions.setSongs(res?.data?.list));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetailSong();
  }, [id])

  useEffect(() => {
    if (!!song?.albumId) getSongsRelatedSong();
  }, [song?.albumId?._id])


  return (
    <SpinCustom spinning={loading}>
      <Layout>
        <div className={location.pathname.includes('search') ? "backgroundBlack" : ""}>
          <Header />
        </div>
        <ContentStyled className=" text">
          <div className='d-flex'>
            <div className='image mr-24'>
              <img style={{ width: '230px', height: '230px' }} src={song?.avatarPath} alt='' />
            </div>
            <div className='infor d-flex flex-column justify-content-center'>
              <div>Bài hát</div>
              <div
                className='fs-80 fw-800 mb-16 mt-16'
                style={{ cursor: 'default' }}
              >
                <TitleStyled>
                  {song?.title}
                </TitleStyled>
              </div>
              <div className="description d-flex">
                <div className="infor-artist d-flex-sb">
                  <AvatarArtistStyled src={song?.artist?.avatarPath} alt="" className="mr-4" />
                  <span className="text fw-600">{song?.artist?.fullname}</span>
                </div>
                <DotStyled />
                <div className="fw-600">{song?.title}</div>
                <DotStyled />
                <div className="fw-600">{moment(song?.createdAt).format('YYYY')}</div>
                <DotStyled />
                <div className="mr-4 fw-600">{convertSecondsToMinutesAndSeconds(song?.time)}</div>
              </div>
            </div>
          </div>
          <div className="mt-20 mb-20 d-flex">
            <ButtonCicleStyled
              className='largeCircle greendBackgroundColor mr-30 icon-play'
              onClick={() => handleSetCurrentMusic(song)}
              icon={
                global?.isPlay ?
                  <BsFillPauseFill className='fs-45' />
                  :
                  <BsFillPlayFill className='fs-45' />
              }
            />
            {
              (song?.artist?._id !== global?.user?._id) ?
                <ButtonCustom
                  className='fs-15 fw-600 noBackgroundColor'
                  icon={<HeartOutlined className='fs-45' />}
                />
                : <div className="mt-20"></div>
            }
          </div>
          <div className="lyrics-inforAritst">
            <p className="fs-27 fw-600 mb-12">Lời bài hát</p>
            <Row gutter={[24, 0]}>
              <Col span={12}>
                <div style={{ whiteSpace: 'pre-line' }} className="lyrics">
                  {song?.lyrics}
                </div>
              </Col>
              <Col span={12}>
                <div className="d-flex align-items-center inforArtist">
                  <AvatarArtistSongStyled src={song?.artist?.avatarPath} alt="" className="mr-8" />
                  <div>
                    <p>Nghệ sĩ</p>
                    <span className="text fw-600">{song?.artist?.fullname}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="related">
            <div className="backgroundGray d-flex align-items-center" style={{ margin: '16px 0' }}>
              <img
                className="mr-8"
                style={{ width: '50px', height: '50px' }}
                src={song?.artist?.avatarPath}
                alt=""
              />
              <div>
                <p>Từ album</p>
                <span className="text fw-600">{song?.albumId?.title}</span>
              </div>
            </div>
            <RelatedSong song={song} />
          </div>
        </ContentStyled>
      </Layout>
    </SpinCustom>
  );
}

export default SongDetail;