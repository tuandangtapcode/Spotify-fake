import { useNavigate } from "react-router-dom";
import { LibraryItemStyled } from "../../../styled";
import { useState } from "react";
import { deletePlaylist } from "../../../../../services/UserService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import globalSlice from "../../../../../redux/globalSlice";
import { globalSelector } from "../../../../../redux/selector";
import ConfirmModal from "../../../../ModalCustom/ConfirmModal";
import { Dropdown } from "antd";

const LibraryItem = ({ libraryItem }) => {

  const navigate = useNavigate();
  const global = useSelector(globalSelector);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalUpdatePlaylist, setsetOpenUpdatePlaylistMo] = useState(false);

  const handleDeletePlaylist = async (id) => {
    try {
      setLoading(true);
      const res = await deletePlaylist(global?.user?._id, { playlistId: libraryItem?._id });
      if (res?.isError) return toast.error(res?.msg);
      toast.success(res?.msg);
      dispatch(globalSlice.actions.setUser(res?.data));
    } finally {
      setLoading(false);
    }
  }

  const menuPlaylist = data => {
    return [
      {
        label: 'Chỉnh sửa danh sách phát',
        key: '1',
        onClick: () => {
          setsetOpenUpdatePlaylistMo(data)
        }
      },
      {
        label: 'Xóa danh sách phát',
        key: '2',
        onClick: () => {
          ConfirmModal({
            title: "Xóa khỏi Thư viện?",
            content: `Thao tác này sẽ xóa ${data?.title} khỏi thư viện.`,
            okText: "Xóa",
            cancelText: "Hủy",
            onOk: async close => {
              handleDeletePlaylist(data?._id);
              close();
            },
          })
        }
      },
    ]
  }

  return (
    <Dropdown
      menu={{
        items: menuPlaylist(libraryItem)
      }}
      trigger={['contextMenu']}
    >
      <LibraryItemStyled className="d-flex" onClick={() => navigate(`/playlist/${libraryItem?._id}`)}>
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
    </Dropdown>
  );
}

export default LibraryItem;