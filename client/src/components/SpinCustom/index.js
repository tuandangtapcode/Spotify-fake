import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const SpinCustom = () => {
  return (
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            color: '#1ed760'
          }}
          spin
        />
      }
    />
  );
}

export default SpinCustom;