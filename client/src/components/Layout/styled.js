import styled from "styled-components";

export const ContainerStyled = styled.div`
background-color: black;
max-height: 100vh;
overflow: hidden;
display: flex;
flex-direction: column;
justify-content: space-between;
`

export const LayoutStyled = styled.div`
height: 100vh;
padding: 10px 8px;
display: flex;
`

export const ContentStyled = styled.div`
  overflow-y: auto; 
  overflow-x: hidden; 
  height: calc(100vh - 90px);
  margin-left: 8px;
  width: 100%;
  border-radius: 4px;
  background-color: rgb(20, 19, 19);
`

export const FooterStyled = styled.div`
padding: 4px 8px;
background: #AF2896;
background: -webkit-linear-gradient(to right, #AF2896, #9942AC, #8160C4, #6780DF, #509BF5);
background: linear-gradient(to right, #AF2896, #9942AC, #8160C4, #6780DF, #509BF5);
position: fixed;
right: 0;
left: 0;
bottom: 8px;
z-index: 1;
p {
  margin: 8px 0;
}
`