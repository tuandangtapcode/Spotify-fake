import { useSelector } from "react-redux";
import AlbumItem from "./component.js/AlbumItem";
import { FileExcelOutlined } from '@ant-design/icons';
import { globalSelector } from "../../../../redux/selector";

const MyAlbum = () => {

  const global = useSelector(globalSelector)

  return (
    <div>
      {
        !!global?.albums.length ?
          global?.albums.map(i =>
            <AlbumItem albumItem={i} />
          )
          :
          <div className="mt-12">
            <div className="d-flex-center">
              <FileExcelOutlined className="text fs-30" />
            </div>
            <div className="d-flex-center">
              <p className="text fs-20">Hiện không có album nào</p>
            </div>
          </div>
      }
    </div>
  );
}

export default MyAlbum;