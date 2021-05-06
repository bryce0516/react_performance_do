import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "loginUser":
      return {
        ...state,
        isAuthenticated: action.payload.authenticated,
        user: action.payload.user,
      };

    case "logoutUser":
      return {
        ...state,
        isAuthenticated: action.payload.authenticated,
        user: { admin_nm: null, admin_type: null },
      };
    default:
      return state;
  }
};

export const UserContext = React.createContext();

export const UserContextProvider = ({ children, auth }) => {
  const initialState = {
    user: auth.getProfile(),
    isAuthenticated: auth.isAuthenticated(),
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [successOpen, setSuccessOpen] = useState(false);
  let history = useHistory();

  Axios.interceptors.request.use(
    function (config) {
      const token = auth.getToken();
      if (token) {
        config.headers["authorization"] = `${token}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  Axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error.response);
      if (error.response) {
        if (
          error.response.status === 401 &&
          error.response.data.code === "JWT_EXPIRED"
        ) {
          handleLogout();
          history.push("/login");
        }
      }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (auth.getToken()) {
      dispatch({
        type: "loginUser",
        paylaod: {
          authenticated: true,
          user: auth.getProfile(),
        },
      });
      setSuccessOpen(true);
    }
    return () => {};
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const handleUpdateContext = () => {
    dispatch({
      type: "loginUser",
      payload: {
        authenticated: true,
        user: auth.getProfile(),
      },
    });
    setSuccessOpen(true);
  };

  const handleLogout = () => {
    auth.signOut();
    dispatch({
      type: "logoutUser",
      payload: {
        authenticated: false,
      },
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        signIn: auth.signIn,
        updateContext: handleUpdateContext,
        signOut: handleLogout,
      }}
    >
      <Alert onClose={handleClose} severity="success">
        로그인 성공!
      </Alert>
    </UserContext.Provider>
  );
};
