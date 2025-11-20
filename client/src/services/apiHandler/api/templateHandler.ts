import apiHandler from "../../apiHandler/apiHandler";

export const getError = async () => {
  const response = await apiHandler.get("/error");
  return response.data;
};

export const getSecret = async () => {
  const response = await apiHandler.get("/secret");
  return response.data;
};