import styled from "styled-components";
import Header from "./Header";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";

const Section = styled.section`
  min-height: 25px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      cursor: pointer;
      font-weight: 700;
    }
  }
  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Container = styled.div`
  padding-top: 52px;
  max-width: 85%;
  margin:auto;
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(0px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  grid-template-rows: auto;
  margin: 0px 25px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Home = () => {
  
  return (
    <div>
      <Header />
      <Container>
        <Section>
          <h5>
            <a>Hiring in a hurry? -&nbsp;</a>
          </h5>
          <p>
            Find talented pros in record time with Uptime and keep business
            running
          </p>
        </Section>
        <Layout>
          <LeftSide />
          <Main />
          <RightSide />
        </Layout>
      </Container>
    </div>
  );
};

export default Home;
