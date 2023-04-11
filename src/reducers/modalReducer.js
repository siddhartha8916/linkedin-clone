import {
  INLINE_MODAL_ACTION_TYPES,
  POST_MODAL_ACTION_TYPES,
} from "../actions/modalActions";

const POST_MODAL_INITIAL_STATE = {
  isModalOpen: false,
};

export const postModalReducer = (state = POST_MODAL_INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
    case POST_MODAL_ACTION_TYPES.POST_SET_IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    default:
      return state;
  }
};

const INLINE_MODAL_INITIAL_STATE = {
  isInlineModalOpen: false,
  topPos: 0,
  leftPos: 0,
};

export const inlineModalReducer = (
  state = INLINE_MODAL_INITIAL_STATE,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case INLINE_MODAL_ACTION_TYPES.INLINE_SET_IS_MODAL_OPEN:
      return {
        ...state,
        isInlineModalOpen: !state.isInlineModalOpen,
        topPos: payload.topPos || 0,
        leftPos: payload.leftPos || 0,
      };
    default:
      return state;
  }
};
