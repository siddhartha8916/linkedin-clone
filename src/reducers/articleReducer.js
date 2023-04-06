import { ARTICLE_ACTION_TYPES } from "../actions/articleActions";

const INITIAL_STATE = {
  isUploading: false,
  error:null,
  success:true,
  message:""
};

export const articleReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;

  switch (type) {
    case ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_START:
      return {
        ...state,
        isUploading: true,
      };
    case ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_SUCCESS:
      return {
        ...state,
        isUploading: false,
        success:true,
      };
    case ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_FAIL:
      return {
        ...state,
        isUploading: false,
        error:true,
      };
    default:
      return state;
  }
};