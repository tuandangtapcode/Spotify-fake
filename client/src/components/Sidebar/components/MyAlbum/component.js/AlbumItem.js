import { useNavigate } from "react-router-dom";
import { LibraryItemStyled } from "../../../styled";

const AlbumItem = ({ albumItem }) => {

  const navigate = useNavigate();

  return (
    <LibraryItemStyled className="d-flex" onClick={() => navigate(`/album/${albumItem?._id}`)}>
      <div className="image mr-8">
        <img style={{ width: '50px', height: '65px', borderRadius: '8px' }} src={albumItem?.avatarPath} alt="" />
      </div>
      <div className="infor d-flex flex-column justify-content-center">
        <div className="text fs-18 fw-600">
          {albumItem?.title}
        </div>
      </div>
    </LibraryItemStyled>
  );
}

export default AlbumItem;