import { http } from "../utils/http";

export const getAsyncRoutes = () => {
  return http.request("get", "/getAsyncRoutes");
};
