import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectInlineModalLeftPosition,
  selectInlineModalTopPosition,
  selectIsInlineModalOpen,
} from "../selectors/modalSelector";

const Content = styled.div`
  width: 300px;
  max-height: 400px;
  background-color: #fff;
  text-align: left;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 5px;
  position: absolute;
  display: ${({ isInlineModalOpen }) =>
    `${isInlineModalOpen ? "block" : "none"}`};
  top: ${({ topPos }) => `${topPos}px`};
  right: 30px;
  z-index: 10;
  margin: 0 auto;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 6px 9px rgba(0, 0, 0, 0.2);
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

const ItemListContainer = styled.ul`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
`;

const ListItems = styled.li`
  /* border: 1px solid red; */
  display:flex;
  align-items:center;
  justify-content:flex-start;
  padding:15px 15px;
  cursor: pointer;
  transition: all 0.1s linear;
  font-size:13px;
  font-weight:600;
  color:rgba(0, 0, 0, 0.8);

  img{
    width:20px;
    margin-right:5px;
  }
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const InlineModal = () => {
  const topPos = useSelector(selectInlineModalTopPosition);
  const leftPos = useSelector(selectInlineModalLeftPosition);
  const isInlineModalOpen = useSelector(selectIsInlineModalOpen);

  return (
    <Content
      topPos={topPos}
      leftPos={leftPos}
      isInlineModalOpen={isInlineModalOpen}
    >
      <ItemListContainer>
        <ListItems>
          <img src="/images/inline-modal/save.svg" alt="" />
          <span>Save</span>
        </ListItems>
        <ListItems>
          <img src="/images/inline-modal/link.svg" alt="" />
          <span>Copy link to post</span>
        </ListItems>
        <ListItems>
          <img src="/images/inline-modal/embed.svg" alt="" />
          <span>Embed this post</span>
        </ListItems>
        <ListItems>
          <img src="/images/inline-modal/not-see.svg" alt="" />
          <span>I don't want to see this</span>
        </ListItems>
        <ListItems>
          <img src="/images/inline-modal/unfollow.svg" alt="" />
          <span>Unfollow</span>
        </ListItems>
        <ListItems>
          <img src="/images/inline-modal/mute.svg" alt="" />
          <span>Mute</span>
        </ListItems>
        <ListItems>
          <img src="/images/inline-modal/flag.svg" alt="" />
          <span>Report Post</span>
        </ListItems>
      </ItemListContainer>
    </Content>
  );
};

export default InlineModal;
