import styled from 'styled-components';

export const SidebarStyled = styled.div`
min-width: 25%;
.sidebar-top {
  margin-bottom: 20px;
}
.content-poper {
    cursor: pointer;
    color: white;
    &:hover {
      background-color: rgb(46, 43, 43);
    }
}
.sidebar-bottom {
  .icon-plus {
    padding: 5px 7px;
    border-radius: 50%;
    background-color: transparent;
    color: white;
    &:hover {
      background-color: rgb(30, 29, 29);
      color: white;
      border-color: transparent;
    }
  }
}
.sidebar-top, .sidebar-bottom {
  background-color: rgb(20, 19, 19);
  border-radius: 4px;
  padding: 12px;
}
span {
  font-weight: 600;
}
.sidebar-bottom-items {
  background-color: rgb(46, 43, 43);
  width: 100%;
  margin-top: 20px;
  padding: 2px 0px 16px 2px;
  border-radius: 8px;
}
button {
  padding: 4px 16px;
  cursor: pointer;
  border-radius: 16px;
  border-color: transparent;
  transition: transform 0.3s ease;
  transform-origin: center bottom;
  &:hover {
    transform: scale(1.05);
  }
}
`

export const LogoStyled = styled.img`
border-radius: 50%;
width: 25px;
height: 25px;
margin-right: 4px;
`

export const ContentPoperStyled = styled.div`
cursor: pointer;
line-height: 34px;
padding-left: 8px;
padding-right: 8px;
color: white;
&:hover {
  background-color: rgb(67, 63, 63);
}
`
export const ContentPoperLoginStyled = styled.div`
background-color: rgb(0, 119, 255);
`