import { MODAL_ACTION_TYPES } from "../actions/modalActions";

const INITIAL_STATE = {
  isModalOpen: false,
};

export const modalReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
    case MODAL_ACTION_TYPES.SET_IS_MODAL_OPEN:
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    default:
      return state;
  }
};
