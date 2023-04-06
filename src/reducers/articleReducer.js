import { ARTICLE_ACTION_TYPES } from "../actions/articleActions";

const INITIAL_STATE = {
  isLoading: false,
  error: null,
  success: false,
  message: "",
  articles: [],
};

export const articleReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_START:
      return {
        ...state,
        isLoading: true,
        success:false
      };
    case ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case ARTICLE_ACTION_TYPES.FETCH_ARTICLE_START:
      return {
        ...state,
        isLoading: true,
      };
    case ARTICLE_ACTION_TYPES.FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: payload,
      };
    case ARTICLE_ACTION_TYPES.FETCH_ARTICLE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};
