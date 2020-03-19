import axios from "axios";
import { createMessage, createErrors } from "./messages";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

// Get leads
export const getLeads = () => dispatch => {
  axios
    .get("/api/leads/")
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err => dispatch(createErrors(err.response.data, err.response.status)));
};

// Delete leads
export const deleteLead = id => dispatch => {
  axios
    .delete(`/api/leads/${id}/`)
    .then(res => {
      dispatch(createMessage({ leadDeleted: "Lead deleted" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => dispatch(createErrors(err.response.data, err.response.status)));
};

// Add leads
export const addLead = lead => dispatch => {
  axios
    .post(`/api/leads/`, lead)
    .then(res => {
      dispatch(createMessage({ leadAdded: "Lead added" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    .catch(err => dispatch(createErrors(err.response.data, err.response.status)));
};
