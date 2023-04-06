import styled from "styled-components";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../actions/modalActions";
import { useState } from "react";
import { selectCurrentUser } from "../selectors/userSelector";
import ReactPlayer from "react-player";
import { postArticleAPI } from "../actions/articleActions";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  user-select: none;
  -webkit-animation: fadeIn 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: fadeIn 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  max-height: 90%;
  background-color: white;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    background: transparent;
    outline: none;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: black;
    cursor: pointer;
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 4px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.6);
  background: transparent;
  outline: none;
  border: none;
  border-radius: 16px;
  transition: all 116ms linear;
  &:hover {
    background: #d0d0d0;
  }
  /* filter: invert(56%) sepia(18%) saturate(0%) hue-rotate(225deg) brightness(84%) contrast(76%); */
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 60px;
  padding: 0 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  color: white;
  outline: none;
  border: none;

  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#004182")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    outline: none;
    border: none;
    font-size: 16px;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const compatibleImageTypes = {
  "image/png": "image/png",
  "image/jpg": "image/jpg",
  "image/jpeg": "image/jpeg",
  "image/gif": "image/gif",
};

const PostModal = (props) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const postArticle = (event) => {
    event.preventDefault();

    if (event.target!== event.currentTarget) return;
    const payload = {
      image:shareImage,
      video:videoLink,
      user:currentUser,
      description:editorText,
      timestamp:Date.now(),
    }
    reset(event)
    dispatch(postArticleAPI(payload))

  }

  const reset = (e) => {
    setAssetArea("")
    setEditorText("")
    setShareImage("")
    setVideoLink("")
  }

  const handleModal = () => {
    setEditorText("");
    setShareImage("");
    dispatch(setIsModalOpen());
  };

  const handleFileInputChange = (e) => {
    const image = e.target.files[0];
    let imageType = image.type.split("/")[1].toUpperCase();
    if (!compatibleImageTypes.hasOwnProperty(image.type)) {
      alert(`Not an image, the file is of a a ${imageType}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const ModalContent = (
    <Container>
      <Content>
        <Header>
          <h2>Create a Post</h2>
          <button onClick={handleModal}>&#10006;</button>
        </Header>
        <SharedContent>
          <UserInfo>
            <img
              src={currentUser ? currentUser.photoURL : "/images/user.svg"}
              alt="user"
            />
            <span>{currentUser ? currentUser.displayName : "Name"}</span>
          </UserInfo>
          <Editor>
            <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              placeholder="What do you want to talk about?"
              autoFocus
            />
            {assetArea === "image" && (
              <UploadImage>
                <input
                  type="file"
                  onChange={handleFileInputChange}
                  accept={Object.keys(compatibleImageTypes)}
                  name="image"
                  id="file"
                  style={{ display: "none" }}
                />
                <p>
                  <label htmlFor="file">Select an image to share</label>
                </p>
                {shareImage && (
                  <img src={URL.createObjectURL(shareImage)} alt="" />
                )}
              </UploadImage>
            )}

            {assetArea === "media" && (
              <>
                <input
                  type="text"
                  placeholder="Please input a video link"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
                {videoLink && <ReactPlayer width={"100%"} url={videoLink} />}
              </>
            )}
          </Editor>
        </SharedContent>
        <ShareCreation>
          <AttachAssets>
            <AssetButton onClick={() => switchAssetArea("image")}>
              <img src="/images/photo-share.svg" alt="user" />
            </AssetButton>
            <AssetButton onClick={() => switchAssetArea("media")}>
              <img src="/images/video-share.svg" alt="user" />
            </AssetButton>
          </AttachAssets>
          <ShareComment>
            <AssetButton>
              <img src="/images/comment-share.svg" alt="user" />
              Anyone
            </AssetButton>
          </ShareComment>
          <PostButton disabled={!editorText ? true : false} onClick={postArticle}>Post</PostButton>
        </ShareCreation>
      </Content>
    </Container>
  );

  return ReactDOM.createPortal(
    ModalContent,
    document.getElementById("modal-root")
  );
};

export default PostModal;
