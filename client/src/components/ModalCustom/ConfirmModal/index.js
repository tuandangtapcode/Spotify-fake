import { Modal } from "antd";

const ConfirmModal = ({
  width = 600,
  title,
  content,
  okText = "Xóa",
  cancelText = "Hủy",
  onOk = e => e(),
  ...props
}) => {
  Modal.confirm({
    icon: null,
    title,
    okText,
    cancelText,
    width,
    onOk,
    maskClosable: true,
    okButtonProps: {
      style: {
        // fontWeight: 700,
        padding: "16px, 16px, 16px, 16px",
        borderRadius: 4,
        height: 32,
        background: `#01638D`,
      },
    },
    cancelButtonProps: {
      style: {
        // fontWeight: 700,
        borderRadius: 4,
        padding: "16px, 16px, 16px, 16px",
        height: 32,
        color: `#000`,
        border: "1px solid #F1F3F5",
        background: `#F1F3F5`,
      },
    },
    wrapClassName: "cb1",
    ...props,
    content: (
      <Modal className="d-flex justify-content-center align-items-center flex-column">
        {!!content && (
          <div
            className="textTitle"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </Modal>
    ),
  })
}

export default ConfirmModal;