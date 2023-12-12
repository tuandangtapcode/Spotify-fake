import { Card } from 'antd';
import { BsFillPlayFill } from "react-icons/bs";
import { CardStyled, PlaylistItemStyled } from "./styled";
import { ButtonCicleStyled } from '../ButtonCustom/ButtonCircle/styled';

const { Meta } = Card;

const PlaylistItem = ({ playlist }) => {
  return (
    <PlaylistItemStyled>
      <CardStyled
        cover={<img style={{ borderRadius: '8px' }} alt="example" src={playlist?.img} />}
      >
        <Meta title={playlist?.title} description={playlist?.description} />
        <ButtonCicleStyled
          style={{
            position: 'absolute',
            right: '8px',
            bottom: '50%'
          }}
          className='largeCircle greendBackgroundColor icon-play'
          icon={<BsFillPlayFill className='fs-30' />}
        />
      </CardStyled>
    </PlaylistItemStyled>
  );
}

export default PlaylistItem;