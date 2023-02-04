import API from "./axios";
import { signUp, login } from "./enpoints";

const signupUser = async (data) => {
  const response = await API.post(signUp, data);
  return response;
};

const loginUser = async (data) => {
  const response = await API.post(login, data);
  return response;
};

export { signupUser, loginUser };
