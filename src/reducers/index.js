import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { modalReducer } from "./modalReducer";
import { articleReducer } from "./articleReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  modal:modalReducer,
  article:articleReducer
});
 