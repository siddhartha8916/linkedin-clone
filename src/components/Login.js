import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signInWithGooglePopup, signOutUser } from "../firebase";

const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0px 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;

    @media (max-width: 769px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  cursor: pointer;
  transition: all 167ms ease;
  border-radius: 24px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    text-decoration: none;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  text-decoration: none;
  color: #0a66c2;
  border-radius: 24px;
  transition: all 167ms linear;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 769px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0px;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }

  img {
    /* z-index: -1; */
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Google = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  outline: none;
  border: 1px solid #000;
  cursor: pointer;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  vertical-align: middle;
  z-index: 0;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  transition: all 116ms linear;
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.25);
  }
  &:active {
    transform: perspective(400px) translateZ(-20px);
  }
  img {
    margin-right: 10px;
  }
`;

const SignOut = styled(SignIn)``;

const Login = (props) => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const res = await signInWithGooglePopup();
    if (res._tokenResponse.idToken) {
      navigate("/home");
    }
  };

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="login-logo" />
        </a>
        <div>
          <Join>Join Now</Join>
          {!props.currentUser ? (
            <SignIn onClick={signInWithGoogle}>Sign In</SignIn>
          ) : (
            <SignOut onClick={signOutUser}>Sign Out</SignOut>
          )}
        </div>
      </Nav>
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src="/images/login-hero.svg" alt="" />
        </Hero>
        <Form>
          <Google onClick={signInWithGoogle}>
            <img src="/images/google.svg" alt="" />
            Sign In With Google
          </Google>
        </Form>
      </Section>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return state.user;
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login;
