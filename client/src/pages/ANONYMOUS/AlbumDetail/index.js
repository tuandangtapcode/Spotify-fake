import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { globalSelector } from "../../../redux/selector";
import { useEffect, useState } from "react";
import { getOneAlbum } from "../../../services/AlbumService";
import Header from "../../../components/Header";
import { ContentStyled } from "../../ANONYMOUS/HomePage/styled";
import { TitleStyled } from "../../USER/PlaylistDetail/styled";
import ModalInsertUpdateAlbum from "./components/ModalInsertUpdateAlbum";
import { AvatarArtistStyled, DotStyled } from "./styled";
import ButtonCustom from "../../../components/ButtonCustom/MyButton";
import { getAllSongByAlbum } from "../../../services/SongService";
import ModalInsertUdpateSong from "./components/ModalInsertUpdateSong";
import { convertSecondsToMinutesAndSeconds } from "../../../lib/stringUtils";
import { ClockCircleOutlined } from '@ant-design/icons';
import { BsFillPlayFill } from "react-icons/bs";
import { Table } from "antd";
import globalSlice from "../../../redux/globalSlice";
import Layout from "../../../components/Layout";
import SpinCustom from "../../../components/SpinCustom";
import { ButtonCicleStyled } from "../../../components/ButtonCustom/ButtonCircle/styled";

const AlbumDetail = () => {

  const { id } = useParams();
  const global = useSelector(globalSelector);
  const location = useLocation();
  const navigate = useNavigate();
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState([]);
  const [totalSong, setTotalSong] = useState(0);
  const [totalTime, setTotalTime] = useState([]);
  const [openUpdateAlbum, setOpenUpdateAlbum] = useState(false);
  const [openInsertUpdatesong, setOpenInsertUpdateSong] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const column = [
    {
      title: <span className="text">#</span>,
      width: 40,
      render: (_, record, index) => (
        (!!showPlayIcon && showPlayIcon === record?._id) ?
          <BsFillPlayFill
            className="text"
            style={{
              height: '16px',
              width: '20px'
            }}
            onClick={() => handleSetCurrentMusic(record)}
          />
          :
          <div
            className={record?._id === global?.currentSong?._id ? "text-green" : "text"}
            style={{
              height: '16px',
              width: '20px'
            }}
          >
            {index + 1}
          </div>
      )
    },
    {
      title: <span className="text">Tiêu đề</span>,
      width: 600,
      dataIndex: "title",
      render: (value, record, index) => (
        <div
          className={record?._id === global?.currentSong?._id ? "text-green" : "text"}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/track/${record?._id}`)}
        >
          {value}
        </div>
      )
    },
    {
      title: <ClockCircleOutlined className="text" />,
      width: 40,
      dataIndex: "time",
      key: "time",
      render: (_, record, index) => (
        <div className="text">{convertSecondsToMinutesAndSeconds(record?.time)}</div>
      )
    },
  ]

  const getDetailAlbum = async () => {
    try {
      setLoading(true);
      const res = await getOneAlbum(id);
      if (res?.isError) navigate('/not-found');
      setAlbum(res?.data);
    } finally {
      setLoading(false)
    }
  }

  const getSongsByAlbum = async () => {
    try {
      setLoading(true);
      const res = await getAllSongByAlbum(id);
      if (res?.isError) navigate('/not-found');
      const totalTime = res?.data?.list.reduce((total, currentValue) => {
        return total + currentValue?.time
      }, 0)
      const totalTimeString = convertSecondsToMinutesAndSeconds(totalTime);
      const totalTimeArray = totalTimeString.split(':');
      setTotalTime(totalTimeArray);
      setSongs(res?.data?.list);
      setTotalSong(res?.data?.total);
      dispatch(globalSlice.actions.setSongs(res?.data?.list));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetailAlbum();
  }, [id, global?.user])

  useEffect(() => {
    if (!!album?._id) getSongsByAlbum();
  }, [album])


  return (
    <SpinCustom spinning={loading}>
      <Layout>
        <div className={location.pathname.includes('search') ? "backgroundBlack" : ""}>
          <Header />
        </div>
        <ContentStyled className=" text">
          <div className='d-flex'>
            <div className='image mr-24' onClick={() => setOpenUpdateAlbum(album)}>
              <img style={{ width: '230px', height: '230px' }} src={album?.avatarPath} alt='' />
            </div>
            <div className='infor d-flex flex-column justify-content-center'>
              <div>Album</div>
              <div
                className='fs-80 fw-800 mb-16 mt-16'
                onClick={() => setOpenUpdateAlbum(album)}
                style={{ cursor: 'default' }}
              >
                <TitleStyled>
                  {album?.title}
                </TitleStyled>
              </div>
              <div className="description d-flex">
                <div className="infor-artist d-flex-sb">
                  <AvatarArtistStyled src={album?.artist?.avatarPath} alt="" className="mr-4" />
                  <span className="text fw-600">{album?.artist?.fullname}</span>
                </div>
                <DotStyled />
                <div>
                  <span className="mr-4 fw-600">{totalSong}</span>
                  <span className="mr-4 fw-600">bài hát,</span>
                  <span className="mr-4 fw-600">{totalTime[0]}</span>
                  <span className="mr-4 fw-600">phút</span>
                  <span className="mr-4 fw-600">{totalTime[1]}</span>
                  <span>giây</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20">
            {
              (album?.artist?._id === global?.user?._id) ?
                <ButtonCustom
                  className='haflLarge normal fs-15 fw-700 ml-25'
                  onClick={() => setOpenInsertUpdateSong({ albumId: id })}
                >
                  Thêm bài hát
                </ButtonCustom>
                :
                <ButtonCicleStyled
                  className='largeCircle greendBackgroundColor icon-play'
                  icon={<BsFillPlayFill className='fs-30' />}
                />
            }
          </div>
          <hr></hr>
          <div className="list-songs">
            <Table
              columns={column}
              dataSource={songs}
              pagination={false}
              rowKey="_id"
              onRow={(record, index) => {
                return {
                  onMouseOver: () => {
                    setShowPlayIcon(record?._id)
                  },
                  onMouseOut: () => {
                    setShowPlayIcon(false)
                  }
                }
              }}
            />
          </div>
        </ContentStyled>

        {
          !!openUpdateAlbum &&
          <ModalInsertUpdateAlbum
            open={openUpdateAlbum}
            onCancel={() => setOpenUpdateAlbum(false)}
            onOk={() => getDetailAlbum()}
          />
        }

        {
          !!openInsertUpdatesong &&
          <ModalInsertUdpateSong
            open={openInsertUpdatesong}
            onCancel={() => setOpenInsertUpdateSong(false)}
            onOk={() => getSongsByAlbum()}
          />
        }
      </Layout>
    </SpinCustom>
  );
}

export default AlbumDetail;