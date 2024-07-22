import { databaseUtilities } from "@/server/database/index";

const { fetchSingleUser, fetchUsers } = databaseUtilities;

export const singleUser = (email: string) => {
  return fetchSingleUser(email);
};

export const allUsers = (role: string, cursor: string) => {
  return fetchUsers(role, cursor);
};
