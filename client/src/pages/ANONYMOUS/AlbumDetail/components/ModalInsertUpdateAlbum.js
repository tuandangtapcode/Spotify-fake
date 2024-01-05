import ModalCustom from "../../../../components/ModalCustom";
import { useEffect, useState } from "react";
import { Col, Form, Row, Upload, message } from "antd";
import InputCustom from "../../../../components/InputCustom";
import { createAlbum, updateAlbum } from "../../../../services/AlbumService";
import { useDispatch, useSelector } from "react-redux";
import { globalSelector } from "../../../../redux/selector";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CloudUploadOutlined } from '@ant-design/icons';
import globalSlice from "../../../../redux/globalSlice";

const ModalInsertUpdateAlbum = ({ open, onCancel, onOk }) => {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const global = useSelector(globalSelector);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);

  const handleChangeFile = (file) => {
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const isAllowedType = allowedImageTypes.includes(file.type);
    if (!isAllowedType) {
      message.error("Yêu cầu chọn file ảnh (jpg, png, gif)");
    } else {
      setPreview(URL.createObjectURL(file));
      setAvatar(file);
    }
  }

  const handleInsertUpdateAlbum = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const { image, ...remainValues } = values;
      const res = !!open?._id
        ? await updateAlbum(open?._id, { ...remainValues, avatar, artist: global?.user?._id })
        : await createAlbum({ ...remainValues, avatar, artist: global?.user?._id })
      if (res?.isError) return toast.error(res?.msg);
      if (!!open?._id) {
        const newAlbums = global?.albums.filter(i => i?._id !== res?.data?._id);
        dispatch(globalSlice.actions.setAlbums([...newAlbums, res?.data]));
      } else {
        dispatch(globalSlice.actions.setAlbums([...global?.albums, res?.data]));
      }
      if (!!open?._id) onOk();
      else navigate(`/album/${res?.data?._id}`);
      onCancel();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!!open?._id) {
      form.setFieldsValue(open);
    }
  }, [open])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title={!!open?._id ? "Sửa thông tin chi tiết" : "Tạo mới album"}
      handleSubmit={handleInsertUpdateAlbum}
      loading={loading}
    >
      <Form form={form}>
        <Row gutter={[16, 0]}>
          <Col span={10}>
            <Form.Item
              className="image"
              name='image'
              rules={[
                {
                  required: !!open?.avatarPath ? false : true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <Upload
                beforeUpload={file => handleChangeFile(file)}
                style={{ width: '100%' }}
                accept="image/*"
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <div className="d-flex-center" style={{ height: "100%" }}>
                  <div className="mr-8">
                    <CloudUploadOutlined className="text" />
                  </div>
                  <div>
                    <span className="text">Chọn file</span>
                  </div>
                </div>
                <img style={{ width: '100%', height: '180px' }} src={!!preview ? preview : open?.avatarPath} alt="" />
              </Upload>
            </Form.Item>
          </Col>
          <Col span={14}>
            <p className="text mb-12">Nhập vào tiêu đề của album</p>
            <Form.Item
              name='title'
              className="mb-16"
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <InputCustom
                placeholder={!!open?._id ? "" : "Tiêu đề"}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  );
}

export default ModalInsertUpdateAlbum;