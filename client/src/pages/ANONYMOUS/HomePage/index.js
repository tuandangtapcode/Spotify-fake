import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import { useLocation } from "react-router-dom";
import PlaylistItem from "../../../components/PlaylistItem";
import { Col, Row } from "antd";
import { ContentStyled } from "./styled";

const HomeAnonymous = () => {

  const playlists = [
    {
      img: 'https://i.scdn.co/image/ab67706f00000002eaa44a568d7c409188d72afd',
      title: "Today's Top Hits",
      description: 'Dua Lipa is on top of the Hottest 50!'
    },
    {
      img: 'https://i.scdn.co/image/ab67706f00000002cd0b355b4d64916ddf088de2',
      title: "RapCaviar",
      description: 'New music from Drake, Lil Wayne and 2 Chainz'
    },
    {
      img: 'https://i.scdn.co/image/ab67706f000000027bcd851d16216fae85f63a28',
      title: "All Out 2010s",
      description: 'The biggest songs of the 2010s'
    },
    {
      img: 'https://i.scdn.co/image/ab67706f0000000278b4745cb9ce8ffe32daaf7e',
      title: "Rock Classics",
      description: 'Rock legends & epic songs that continue to inspire generations. Cover: Foo Fighters'
    },
    {
      img: 'https://i.scdn.co/image/ab67706f00000002b60db5d1bcdd9c4fd1ebcffe',
      title: "Chill Hits",
      description: 'Kick back to the best new and recent chill hits.'
    },
    {
      img: 'https://i.scdn.co/image/ab67706f000000023ee89c19df387d93c7cb0ae9',
      title: "Viva Latino",
      description: "Today's top Latin hits, elevando nuestra música. Cover: Maria Becerra"
    },
    {
      img: 'https://i.scdn.co/image/ab67706f00000002db32a17c1f5291b19317b62e',
      title: "Mega Hit Mix",
      description: 'A mega mix of 75 favorites from the last few years!'
    },
    {
      img: 'https://i.scdn.co/image/ab67706f000000027876fe166a29b8e6b8db14da',
      title: 'All Out 80s',
      description: 'The biggest songs of the 1980s. Cover: Michael Jackson.'
    }
  ]

  const location = useLocation();

  return (
    <Layout>
      <div className={location.pathname.includes('search') ? "backgroundBlack" : ""}>
        <Header />
      </div>
      <ContentStyled className=" text">
        <p className="fs-23 fw-800 mb-20">Danh sách phát trên Spotify</p>
        <Row gutter={[16, 16]}>
          {
            playlists?.map(playlist =>
              <Col span={3}>
                <PlaylistItem playlist={playlist} />
              </Col>
            )
          }
        </Row>
      </ContentStyled>
    </Layout>
  );
}

export default HomeAnonymous;