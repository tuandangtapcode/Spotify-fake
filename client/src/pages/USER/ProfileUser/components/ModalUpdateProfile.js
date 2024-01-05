import { Col, Form, Row, Upload, message } from "antd";
import ModalCustom from "../../../../components/ModalCustom";
import { useEffect, useState } from "react";
import InputCustom from "../../../../components/InputCustom";
import { useDispatch, useSelector } from "react-redux";
import { globalSelector } from "../../../../redux/selector";
import { updateProfile } from "../../../../services/UserService";
import { toast } from "react-toastify";
import globalSlice from "../../../../redux/globalSlice";

const ModalUpdateProfile = ({ open, onCancel }) => {

  const [form] = Form.useForm();
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

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const { image, ...remainValues } = values;
      const res = await updateProfile(global?.user?._id, { ...remainValues, avatar });
      if (res?.isError) return toast.error(res?.msg);
      toast.success(res?.msg);
      dispatch(globalSlice.actions.setUser(res?.data));
      onCancel();
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    form.setFieldsValue(global?.user);
  }, [])

  return (
    <ModalCustom
      title="Chi tiết hồ sơ"
      open={open}
      onCancel={onCancel}
      handleSubmit={handleUpdateProfile}
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
                  required: !!global?.user?.avatarPath ? false : true, message: 'Thông tin không được để trống'
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
                <img style={{ width: '100%', height: '180px' }} src={!!preview ? preview : global?.user?.avatarPath} alt="" />
              </Upload>
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              name='fullname'
              className="mb-16"
              rules={[
                {
                  required: true, message: 'Thông tin không được để trống'
                }
              ]}
            >
              <InputCustom />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  );
}

export default ModalUpdateProfile;