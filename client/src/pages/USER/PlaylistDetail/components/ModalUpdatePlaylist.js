import { Col, Form, Row, Upload, message } from "antd";
import ButtonCustom from "../../../../components/ButtonCustom/MyButton";
import ModalCustom from "../../../../components/ModalCustom";
import { useEffect, useState } from "react";
import InputCustom from "../../../../components/InputCustom";
import { updateInforPlaylist } from "../../../../services/UserService";
import { toast } from "react-toastify";
import globalSlice from "../../../../redux/globalSlice";
import { useDispatch } from 'react-redux';
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";

const ModalUpdatePlaylist = ({ open, onCancel, onOk }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();
  const [preview, setPreview] = useState();

  const handleUpdatePlaylist = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const res = await updateInforPlaylist(open?.id, { ...values, avatar: avatar, playlistId: open?.playlistId });
      if (res?.isError) return toast.error(res?.msg);
      dispatch(globalSlice.actions.setUser(res?.data));
      await onOk();
      onCancel();
    } finally {
      setLoading(false);
    }
  }

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

  useEffect(() => {
    form.setFieldsValue(open)
  }, [])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      title="Sửa thông tin chi tiết"
      handleSubmit={handleUpdatePlaylist}
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
                accept="image/*"
                multiple={false}
                maxCount={1}
                fileList={[]}
              >
                <img style={{ width: '100%', height: '180px' }} src={!!preview ? preview : open?.avatarPath} alt="" />
              </Upload>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name='title'
              className="mb-16"
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <InputCustom />
            </Form.Item>
            <Form.Item
              name='description'
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <TextArea rows={5} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom >
  );
}

export default ModalUpdatePlaylist;