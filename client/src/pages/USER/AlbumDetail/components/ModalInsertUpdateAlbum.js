import { useForm } from "antd/es/form/Form";
import ModalCustom from "../../../../components/ModalCustom";
import { useEffect, useState } from "react";
import { Col, Form, Row, Upload, message } from "antd";
import InputCustom from "../../../../components/InputCustom";

const ModalInsertUpdateAlbum = ({ open, onCancel, onOk }) => {

  const [form] = useForm();
  const [avatar, setAvatar] = useState();
  const [preview, setPreview] = useState();

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
    if (!!open?._id) {
      form.setFieldsValue(open);
    }
  }, [open])

  return (
    <ModalCustom
      open={open}
      onCancel={onCancel}
      onOk={onOk}
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
          </Col>
        </Row>
      </Form>
    </ModalCustom>
  );
}

export default ModalInsertUpdateAlbum;