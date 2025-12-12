import apiHandler from "../../apiHandler/apiHandler";

export const getRandomThing = async () => {
  const response = await apiHandler.get("/thing/random");
  return response.data;
};

export const getRecent20Things = async () => {
  const response = await apiHandler.get("/thing/recent20");
  return response.data;
};

export const createThing = async (name: string, description: string) => {
  const response = await apiHandler.post("/thing/create", { name, description });
  return response.data;
};