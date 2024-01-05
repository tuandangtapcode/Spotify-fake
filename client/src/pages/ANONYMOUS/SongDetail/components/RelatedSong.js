import { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import globalSlice from "../../../../redux/globalSlice";
import { convertSecondsToMinutesAndSeconds } from "../../../../lib/stringUtils";
import { Table } from "antd";
import { globalSelector } from "../../../../redux/selector";

const RelatedSong = ({ song }) => {

  const global = useSelector(globalSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPlayIcon, setShowPlayIcon] = useState(false);

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
      width: 40,
      dataIndex: "time",
      key: "time",
      render: (_, record, index) => (
        <div className="text">{convertSecondsToMinutesAndSeconds(record?.time)}</div>
      )
    },
  ]

  return (
    <div>
      <Table
        showHeader={false}
        columns={column}
        dataSource={
          global?.songs?.filter(i => i?._id !== song?._id)
        }
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
  );
}

export default RelatedSong;