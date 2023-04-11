import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { inlineModalReducer, postModalReducer } from "./modalReducer";
import { articleReducer } from "./articleReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  postModal:postModalReducer,
  inlineModal:inlineModalReducer,
  article:articleReducer
});
 