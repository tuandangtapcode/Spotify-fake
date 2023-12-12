import { LibraryItemStyled } from "../../../styled";

const AlbumItem = ({ albumItem }) => {
  return (
    <LibraryItemStyled className="d-flex">
      <div className="image mr-8">
        <img style={{ width: '50px', height: '100%', borderRadius: '8px' }} src={albumItem?.avatarPath} alt="" />
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