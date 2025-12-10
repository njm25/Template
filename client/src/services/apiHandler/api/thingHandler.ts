import { toast } from "react-toastify";
import apiHandler from "../../apiHandler/apiHandler";

export const getThings = async () => {
  const response = await apiHandler.get("/things");
  toast.success(response.data[0].name);
  return response.data[0].name;
};