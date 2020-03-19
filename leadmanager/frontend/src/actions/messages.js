import { CREATE_MESSAGE, GET_ERRORS } from "./types";

// Create message
export const createMessage = msg => {
  return {
    type: CREATE_MESSAGE,
    payload: msg
  };
};

// Create error
export const createErrors = (message, status) => {
  return {
    type: GET_ERRORS,
    payload: { message, status }
  };
};
