import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createAction } from "../reducers/reducer.utils";
import { createArticleFromPayload, storage } from "../firebase";

export const ARTICLE_ACTION_TYPES = {
  SET_ARTICLE_UPLOAD_START: "SET_ARTICLE_UPLOAD_START",
  SET_ARTICLE_UPLOAD_SUCCESS: "SET_ARTICLE_UPLOAD_SUCCESS",
  SET_ARTICLE_UPLOAD_FAIL: "SET_ARTICLE_UPLOAD_FAIL",
  FETCH_ARTICLE_START: "FETCH_ARTICLE_START",
  FETCH_ARTICLE_SUCCESS: "FETCH_ARTICLE_SUCCESS",
  FETCH_ARTICLE_FAIL: "FETCH_ARTICLE_FAIL",
};

export function postArticleAPI(payload) {
  return async (dispatch) => {
    dispatch(createAction(ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_START));
    if (payload.image !== "") {
      const storageRef = ref(storage, `images/${payload.image.name}`);
      console.log(storageRef);
      const uploadTask = uploadBytesResumable(storageRef, payload.image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          ); // update progress
          console.log(`Progress : ${percent}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${percent}%`);
          }
        },
        (err) => {
          console.log(err);
          dispatch(createAction(ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_FAIL,{error:"Article Uploading Failed"}));
        },
        async () => {
          // download url
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL);
          const data = { ...payload, downloadURL };
          const res = await createArticleFromPayload(data);
          if (res.error) {
            dispatch(
              createAction(ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_FAIL,{error:"Article Uploading Failed"})
            );
          } else {
            dispatch(
              createAction(ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_SUCCESS)
            );
          }
        }
      );
    }
    if (payload.video !== "") {
      const res = await createArticleFromPayload(payload);
      if (res.error) {
        dispatch(
          createAction(ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_FAIL,{error:"Article Uploading Failed"})
        );
      } else {
        dispatch(
          createAction(ARTICLE_ACTION_TYPES.SET_ARTICLE_UPLOAD_SUCCESS)
        );
      }
    }
  };
}