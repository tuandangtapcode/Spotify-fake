import { useNavigate } from "react-router-dom";
import { LibraryItemStyled } from "../../../styled";

const LibraryItem = ({ libraryItem }) => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    if (libraryItem?.type === 'Danh sách phát') {
      navigate(`/playlist/${libraryItem?._id}`)
    } else if (libraryItem?.type === 'Album') {
      navigate(`/album/${libraryItem?._id}`)
    }
  }

  return (
    <LibraryItemStyled className="d-flex" onClick={() => handleNavigate()}>
      <div className="image mr-8">
        <img style={{ width: '50px', height: '100%', borderRadius: '8px' }} src={libraryItem?.avatarPath} alt="" />
      </div>
      <div className="infor d-flex flex-column justify-content-center">
        <div className="text fs-18 fw-600">
          {libraryItem?.title}
        </div>
        <div className="text-gray-than">
          {libraryItem?.type}
        </div>
      </div>
    </LibraryItemStyled>
  );
}

export default LibraryItem;