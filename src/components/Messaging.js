import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCurrentUser } from "../selectors/userSelector";

const Content = styled.div`
  width: 300px;
  background-color: #fff;
  text-align: left;
  border-radius: 5px;
  position: fixed;
  bottom: 0;
  right: 10px;
  z-index: 10;
  margin: 0 auto;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 6px 9px rgba(0, 0, 0, 0.2);
  /* &::-webkit-scrollbar {
    width: 5px;
    border-radius: 0px 5px 5px 0px;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  } */
`;

const MessagingTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
  img {
    width: 30px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const MessagingActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    display: inline-block;
    margin-inline: 5px;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 20px;
    }
  }
`;

const MessagingContent = styled.div`
  height: 0px;
  max-height: 400px;
  overflow-y: scroll;
  /* padding: 5px; */
  transition: height 300ms;
  &.is-active {
    height: 400px;
  }
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 0px 5px 5px 0px;
  }
  &::-webkit-scrollbar-track {
    background: #fff;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const MessageContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0;
`;

const MessageItem = styled.li`
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  padding: 10px;
  display: flex;
  align-items: center;
  transition: all 0.1s linear;
  cursor: pointer;
  img {
    width: 48px;
    margin-right: 10px;
    border-radius: 50%;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  p:first-child {
    font-weight: 600;
  }
`;

const Messaging = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [expand, setExpand] = useState(false);

  const expandMessageBox = () => {
    setExpand(!expand);
  };

  return (
    <Content>
      <MessagingTopBar onClick={expandMessageBox}>
        <AvatarContainer>
          {currentUser && currentUser.photoURL ? (
            <img src={currentUser.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          Messaging
        </AvatarContainer>
        <MessagingActions>
          <span>
            <img src="/images/messaging/ellipsis.svg" alt="" />
          </span>
          <span>
            <img src="/images/messaging/edit-square.svg" alt="" />
          </span>
          <span onClick={expandMessageBox}>
            <img
              src={
                expand
                  ? "/images/messaging/expand-more.svg"
                  : "/images/messaging/expand-less.svg"
              }
              alt=""
            />
          </span>
        </MessagingActions>
      </MessagingTopBar>
      <MessagingContent className={expand ? "is-active" : ""}>
        <MessageContainer>
          <MessageItem>
            <img src="/images/user.svg" alt="" />
            <div>
              <p>Siddhartha Kumar</p>
              <p>Siddhartha: Hi...</p>
            </div>
          </MessageItem>
          <MessageItem>
            <img src="/images/user.svg" alt="" />
            <div>
              <p>Siddhartha Kumar</p>
              <p>Siddhartha: Hi...</p>
            </div>
          </MessageItem>
          <MessageItem>
            <img src="/images/user.svg" alt="" />
            <div>
              <p>Siddhartha Kumar</p>
              <p>Siddhartha: Hi...</p>
            </div>
          </MessageItem>
          <MessageItem>
            <img src="/images/user.svg" alt="" />
            <div>
              <p>Siddhartha Kumar</p>
              <p>Siddhartha: Hi...</p>
            </div>
          </MessageItem>
          <MessageItem>
            <img src="/images/user.svg" alt="" />
            <div>
              <p>Siddhartha Kumar</p>
              <p>Siddhartha: Hi...</p>
            </div>
          </MessageItem>
          <MessageItem>
            <img src="/images/user.svg" alt="" />
            <div>
              <p>Siddhartha Kumar</p>
              <p>Siddhartha: Hi...</p>
            </div>
          </MessageItem>
          <MessageItem>
            <img src="/images/user.svg" alt="" />
            <div>
              <p>Siddhartha Kumar</p>
              <p>Siddhartha: Hi...</p>
            </div>
          </MessageItem>
          <MessageItem>
            <img src="/images/user.svg" alt="" />
            <div>
              <p>Siddhartha Kumar</p>
              <p>Siddhartha: Hi...</p>
            </div>
          </MessageItem>
          <MessageItem>
            <img src="/images/user.svg" alt="" />
            <div>
              <p>Siddhartha Kumar</p>
              <p>Siddhartha: Hi...</p>
            </div>
          </MessageItem>
        </MessageContainer>
      </MessagingContent>
    </Content>
  );
};

export default Messaging;
