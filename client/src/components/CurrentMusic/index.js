import { BiShuffle } from "react-icons/bi";
import { RiSkipBackFill, RiSkipForwardFill } from "react-icons/ri";
import { FiRepeat } from "react-icons/fi";
import { useSelector } from "react-redux";
import { globalSelector } from "../../redux/selector";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { ButtonCicleStyled } from "../ButtonCustom/ButtonCircle/styled";
import { CurrentMusicStyled, SliderStyled } from "./styled";

const CurrentMusic = () => {

  const global = useSelector(globalSelector);

  return (
    <CurrentMusicStyled >
      {
        localStorage.getItem('currentSong') ?
          <div className="current-music justify-content-flex-start" style={{ width: '20%' }}>
            avasvasvs
          </div>
          :
          <div className="current-music justify-content-flex-start" style={{ width: '20%' }}></div>
      }
      <div className="control-music justify-content-flex-center" style={{ width: '40%' }}>
        <div className="control d-flex-sb" style={{ maxWidth: '200px', margin: 'auto' }}>
          <div className="icon-random">
            <BiShuffle className={localStorage.getItem('currentSong') ? "text fs-23" : "text-gray fs-23"} />
          </div>
          <div className="icon-previous">
            <RiSkipBackFill className={localStorage.getItem('currentSong') ? "text fs-23" : "text-gray fs-23"} />
          </div>
          <div className="icon-play">
            <ButtonCicleStyled
              className='smallCircle normal icon-play'
              icon={global?.isPlay ? <BsFillPauseFill className='fs-27' /> : <BsFillPlayFill className='fs-27' />}
            />
          </div>
          <div className="icon-next">
            <RiSkipForwardFill className={localStorage.getItem('currentSong') ? "text fs-23" : "text-gray fs-23"} />
          </div>
          <div className="icon-repeat">
            <FiRepeat className={localStorage.getItem('currentSong') ? "text fs-21" : "text-gray fs-21"} />
          </div>
        </div>
        <div className="progress-bar">
          <audio />
          <SliderStyled
            min={0}
            max={global?.currentSong?.time}
          />
        </div>
      </div>
      <div className="sound justify-content-flex-end" style={{ width: '20%' }}>

      </div>
    </CurrentMusicStyled>
  );
}

export default CurrentMusic;