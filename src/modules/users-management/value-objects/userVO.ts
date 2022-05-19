import { User } from "../services/models";
import { createVO } from "./createVO";

export const userVO = createVO<User>((user, add) => {
  user.id < 0 && add("Invalid user id");
  user.company === "" && add("Company is required");
});
