import { Dropdown, Input } from "antd";
import styled from "styled-components";

export const HeaderStyled = styled.div`
min-height: 74px;
padding: 12px 30px;
border-radius: 4px;
`

export const InputHeaderStyled = styled(Input)`
background-color: #242424;
width: 400px;
border-color: transparent;
padding: 12px 30px 12px 20px;
border-radius: 30px;
&:hover {
  border-color: white !important;
}
&:focus-within {
  border-color: white !important;
}
.ant-input {
  background-color: #242424;
  margin-left: 8px;
  color: white;
}
.ant-input::placeholder {
  color: #999 !important;
}
.ant-input:focus {
  caret-color: white;
}
`
