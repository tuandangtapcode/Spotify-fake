import LibraryItem from "./component/LibraryItem";
import ButtonCustom from "../../../ButtonCustom/MyButton";

const MyLibrary = ({ global, handleCreatePlaylist, loading }) => {


  return (
    <div>
      {
        (!!global?.user?.love_songs?.length ||
          !!global?.user?.playlists?.length ||
          !!global?.user?.albums?.length
        ) ?
          (
            [
              ...global?.user?.love_songs,
              ...global?.user?.playlists,
              ...global?.user?.albums
            ].sort((a, b) => {
              return new Date(a?.addedAt) - new Date(b?.addedAt)
            }).map(i =>
              <LibraryItem libraryItem={i} />
            )
          )
          :
          <div>
            <div className='sidebar-bottom-items'>
              <p className='ml-12 fs-16 fw-600 text'>Tạo danh sách phát đầu tiên của bạn</p>
              <p className='ml-12 mb-20 fs-15 text'>Rất dễ! Chúng tôi sẽ giúp bạn</p>
              <ButtonCustom
                className='ml-12 fs-15 fw-700 normal medium'
                loading={loading}
                onClick={() => handleCreatePlaylist()}
              >
                Tạo danh sách phát
              </ButtonCustom>
            </div>

            <div className='sidebar-bottom-items'>
              <p className='ml-12 fs-16 fw-600 text'>Hãy cùng tìm và theo dõi một số podcast</p>
              <p className='ml-12 mb-20 fs-15 text'>Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới</p>
              <ButtonCustom className='ml-12 fs-15 fw-700 normal medium'>Duyệt xem podcast</ButtonCustom>
            </div>
          </div>
      }
    </div>
  );
}

export default MyLibrary;