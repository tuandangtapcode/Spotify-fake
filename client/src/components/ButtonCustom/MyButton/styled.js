import styled from "styled-components";
import { Button } from 'antd'

export const ButtomCustomStyled = styled(Button)`
  border-color: transparent !important;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform-origin: center bottom;
  &:hover {
    border-color: transparent !important;
    transform: scale(1.05);
  }
`