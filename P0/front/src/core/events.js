import API from "./axios";
import { createEvent, deleteEvent, getAllEvents, getEvent } from "./enpoints";

export const getEvents = async (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  return await API.get(getAllEvents, { headers });
};

export const createNewEvent = async (token, event) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };
  return await API.post(createEvent, event, { headers });
};
