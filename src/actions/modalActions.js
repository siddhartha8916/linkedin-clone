import { createAction } from "../reducers/reducer.utils";

export const POST_MODAL_ACTION_TYPES = {
  POST_SET_IS_MODAL_OPEN: "POST_SET_IS_MODAL_OPEN",
};

export const INLINE_MODAL_ACTION_TYPES = {
  INLINE_SET_IS_MODAL_OPEN: "INLINE_SET_IS_MODAL_OPEN",
};

export const setIsPostModalOpen = () =>
  createAction(POST_MODAL_ACTION_TYPES.POST_SET_IS_MODAL_OPEN, null);


export const setIsInlineModalOpen = ({topPos,leftPos}) =>
  createAction(INLINE_MODAL_ACTION_TYPES.INLINE_SET_IS_MODAL_OPEN, {topPos,leftPos});

