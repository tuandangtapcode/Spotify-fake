import Sidebar from "../Sidebar";
import { ContainerStyled, ContentStyled, FooterStyled, LayoutStyled } from "./styled";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../ButtonCustom/MyButton";
import CurrentMusic from "../CurrentMusic";

const Layout = ({ children }) => {

  const navigate = useNavigate();

  return (
    <ContainerStyled>
      <LayoutStyled>
        <Sidebar />
        <ContentStyled>
          {children}
        </ContentStyled>
      </LayoutStyled>
      {
        !localStorage.getItem('token') ?
          <FooterStyled className='d-flex-sb mb-4'>
            <div>
              <p className="text">XEM TRƯỚC SPOTIFY</p>
              <p className="text">Đăng ký để nghe không giới hạn các bài hát và podcast với quảng cáo không thường xuyên. Không cần thẻ tín dụng</p>
            </div>

            <ButtonCustom
              className="fs-16 fw-700 normal large"
              onClick={() => navigate('/signup')}
            >
              Đăng ký miễn phí
            </ButtonCustom>
          </FooterStyled>
          :
          <CurrentMusic />
      }
    </ContainerStyled>
  );
}

export default Layout;