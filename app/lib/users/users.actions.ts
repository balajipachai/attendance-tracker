"use server";

import bcrypt from "bcrypt";

import { User } from "@/server/constants/types";
import { databaseUtilities } from "@/server/database";
import { redirect } from "next/navigation";

const { insertUser, fetchSingleUser, fetchUsers } = databaseUtilities;

export async function registerUser(formData: FormData) {
  try {
    const rawFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    // Hash Password
    const SALT = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(rawFormData.password, SALT);

    const user: User = {
      name: String(rawFormData.name),
      email: String(rawFormData.email),
      role: String(rawFormData.role),
      password: hashedPassword,
    };
    // Insert in the database
    const result = await insertUser(user);
    console.log(
      "User registered successfully::users.actions ",
      JSON.stringify(result)
    );
    return result;
  } catch (error) {
    console.error("Error in users.actions::registerUser", error);
    throw error;
  }
  /*redirect("/"); //TODO To fix redirection error issue*/
}

export async function authenticateUser(formData: FormData) {
  try {
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    // Fetch password from database
    const user: User = await fetchSingleUser(String(rawFormData.email));
    if (!user) {
      console.log("User does not exist!");
    } else {
      // Compare user password
      const { password } = user;
      const result = await bcrypt.compare(
        String(rawFormData.password),
        password
      );
      if (result) {
        console.log("Login successful");
        return user;
      } else {
        throw new Error("Username or password is invalid");
      }
    }
  } catch (error) {
    console.error("Error in users.actions::authenticateUser", error);
    throw error;
  }
  /*redirect("/dashboard/student"); //TODO To fix redirection error issue*/
}

export async function fetchAllUsers(
  role: string,
  cursor: string
): Promise<User[]> {
  try {
    const users = await fetchUsers(role, cursor);
    console.log("fetched all users from the database: ", users);
    return users;
  } catch (error) {
    console.error("Error in users.actions::fetchAllUsers", error);
    throw error;
  }
}
