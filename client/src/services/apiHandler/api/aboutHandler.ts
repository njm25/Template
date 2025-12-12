import apiHandler from "../apiHandler";

export const getError = async () => {
  const response = await apiHandler.get("/about/error");
  return response.data;
};

export const getSecret = async () => {
  const response = await apiHandler.get("/about/secret");
  return response.data;
};