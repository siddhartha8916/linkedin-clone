import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./firebase";
import { setCurrentUser } from "./actions/userActions";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { selectCurrentUser } from "./selectors/userSelector";

const routes = (isSignedIn) => {
  return [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      // element: isSignedIn ? <Home /> : <Navigate to="/" />,
      element: <Home />,
    },
  ];
};

function App() {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const router = createBrowserRouter(routes(currentUser));

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
