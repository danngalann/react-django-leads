import axios from "axios";
import { createErrors } from "./messages";
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from "./types";

// Check token, load user
export const loadUser = () => (dispatch, getState) => {
  // Set user loading
  dispatch({ type: USER_LOADING });

  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["Authorization"] = `Token: ${token}`;
  }

  axios
    .get("/api/auth/user", config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(createErrors(err.response, err.response.status));
      dispatch({
        type: AUTH_ERROR
      })
    });
};
