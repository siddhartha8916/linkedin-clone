import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectCurrentUser } from "../selectors/userSelector";
import PostModal from "./PostModal";
import {
  setIsInlineModalOpen,
  setIsPostModalOpen,
} from "../actions/modalActions";
import { selectIsPostModalOpen } from "../selectors/modalSelector";
import Spinner from "./Spinner";
import InlineModal from "./InlineModal";
import { useEffect } from "react";
import { getArticlesfromAPI } from "../actions/articleActions";
import { isArticleLoading, selectArticles } from "../selectors/articleSelector";
import ReactPlayer from "react-player";

const Container = styled.div`
  grid-area: main;
  position: relative;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  position: relative;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px 0 2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const SharedActor = styled.div`
  /* padding-right:40px; */
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }

    div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 12px;
    top: 8px;
    width: 35px;
    height: 35px;
    background: transparent;
    border: none;
    border-radius: 100%;
    outline: none;
    transition: all 116ms linear;
    &:hover {
      border-radius: 100%;
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SocialCount = styled.ul`
  list-style: none;
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;

const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: transparent;
    outline: none;
    border-radius: 5px;
    border: none;
    padding: 5px 10px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 600;

    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    span {
      margin-left: 8px;
      @media (max-width: 768px) {
        display: none;
      }
    }

    img {
      width: 24px;
      height: 24px;
      filter: invert(48%) sepia(9%) saturate(13%) hue-rotate(318deg)
        brightness(99%) contrast(90%);
    }
  }
`;

const SharedVideo = styled.div`
  width: 100%;
`;

const Content = styled.div`
  position: relative;
`;

const Main = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isModalOpen = useSelector(selectIsPostModalOpen);

  const isLoading = useSelector(isArticleLoading);
  const articles = useSelector(selectArticles);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticlesfromAPI());
  }, []);

  const handleModal = () => {
    dispatch(setIsPostModalOpen());
  };

  const handleInlineModal = (event) => {
    const rect = event.target.parentNode.parentNode.parentNode;
    const topPos = `${rect.offsetTop + 50}`;
    const leftPos = `${rect.left}`;
    dispatch(setIsInlineModalOpen({ topPos, leftPos }));
  };

  return (
    <Container>
      <ShareBox>
        <div>
          {currentUser && currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button onClick={handleModal} disabled={isLoading ? true : false}>
            Start a post
          </button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="" />
            <span>Audio Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" alt="" />
            <span>Write Article</span>
          </button>
        </div>
      </ShareBox>
      <Content>
        {isLoading && <Spinner />}
        <InlineModal />

        {articles.length > 0 &&
          articles.map((article, index) => {
            let formattedDate = new Intl.DateTimeFormat("en-IN", {
              dateStyle: "full",
              timeStyle: "long",
              hour12: true,
            }).format(article.actor.date);
            return (
              <Article key={index}>
                <SharedActor>
                  <a>
                    <img src={article.actor.image} alt="" />
                    <div>
                      <span>{article.actor.title}</span>
                      <span>{article.actor.description}</span>
                      <span>{formattedDate}</span>
                    </div>
                  </a>
                  <button onClick={handleInlineModal}>
                    <img src="/images/ellipsis.svg" alt="" />
                  </button>
                </SharedActor>
                <Description>{article.description}</Description>
                {article.sharedImg && (
                  <SharedImage>
                    <a>
                      <img src={article.sharedImg} alt="" />
                    </a>
                  </SharedImage>
                )}
                {article.video && (
                  <SharedVideo>
                    <ReactPlayer url={article.video} width={"100%"} />
                  </SharedVideo>
                )}
                <SocialCount>
                  <li>
                    <button>
                      <img
                        src="https://static.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                        alt=""
                      />
                      <img
                        src="https://static.licdn.com/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
                        alt=""
                      />
                      <span>75</span>
                    </button>
                  </li>
                  <li>
                    <a>{article.comments} Comments</a>
                  </li>
                </SocialCount>
                <SocialActions>
                  <button>
                    <img src="/images/like.png" alt="" />
                    <span>Like</span>
                  </button>
                  <button>
                    <img src="/images/comment.png" alt="" />
                    <span>Comments</span>
                  </button>
                  <button>
                    <img src="/images/share.png" alt="" />
                    <span>Share</span>
                  </button>
                  <button>
                    <img src="/images/send.png" alt="" />
                    <span>Send</span>
                  </button>
                </SocialActions>
              </Article>
            );
          })}
      </Content>

      {isModalOpen && <PostModal />}
    </Container>
  );
};

export default Main;
