import { createAction } from "../reducers/reducer.utils";

export const MODAL_ACTION_TYPES = {
  SET_IS_MODAL_OPEN: "SET_IS_MODAL_OPEN",
};

export const setIsModalOpen = () =>
  createAction(MODAL_ACTION_TYPES.SET_IS_MODAL_OPEN, null);

