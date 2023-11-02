import { useSelector } from "react-redux";
import Sidebar from "../Sidebar";
import { ContentStyled, FooterStyled, HomeStyled } from "./styled";
import { globalSelector } from "../../redux/selector";

const Home = ({ children }) => {

  const global = useSelector(globalSelector);

  return (
    <>
      <HomeStyled>
        <Sidebar />
        <ContentStyled>
          {children}
        </ContentStyled>
      </HomeStyled>
      {
        !global?.isLogin &&
        <FooterStyled className='d-flex-sb mt-8'>
          <div>
            <p className="">XEM TRƯỚC SPOTIFY</p>
            <p>Đăng ký để nghe không giới hạn các bài hát và podcast với quảng cáo không thường xuyên. Không cần thẻ tín dụng</p>
          </div>

          <button className="fs-16 fw-600">Đăng ký miễn phí</button>
        </FooterStyled>
      }
    </>
  );
}

export default Home;