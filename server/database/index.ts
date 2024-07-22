import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "@/server/constants/types/index";

const initializeDBClient = () => {
  return new PrismaClient();
};

const closeDBConnection = async (prisma: PrismaClient) => {
  console.log("Disconnecting database connection...");
  await prisma.$disconnect();
  console.log("Database disconnected...");
};

let prisma = initializeDBClient();

const fetchUsers = async (role: string, cursor: string): Promise<User[]> => {
  try {
    if (!prisma) {
      prisma = initializeDBClient();
    }
    let users: any = new Array<User>();

    if (!cursor) {
      // fetch first 20 records
      if (!role) {
        users = await prisma.users.findMany({
          take: 20,
        });
      } else {
        users = await prisma.users.findMany({
          take: 20,
          where: {
            role,
          },
        });
      }
    } else {
      if (!role) {
        users = await prisma.users.findMany({
          take: 20,
          skip: 1, // skip the cursor
          cursor: {
            id: cursor,
          },
        });
      } else {
        users = await prisma.users.findMany({
          take: 20,
          skip: 1, // skip the cursor
          cursor: {
            id: cursor,
          },
          where: {
            role,
          },
        });
      }
    }
    console.log(`Record fetched successfully [users]`, users);
    return users;
  } catch (error) {
    console.error("Error while fetching users collections", error);
    await closeDBConnection(prisma);
    throw error;
  }
};

const insertUser = async (user: User): Promise<User> => {
  try {
    if (!prisma) {
      prisma = initializeDBClient();
    }
    const result = await prisma.users.create({
      data: {
        ...user,
      },
    });
    console.log(`Record inserted successfully`, result);
    return result;
  } catch (error) {
    console.error("Error while registering user", error);
    await closeDBConnection(prisma);
    throw error;
  }
};

const fetchSingleUser = async (email: string): Promise<User> => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    console.log(`User fetched successfully`, user);
    return user!;
  } catch (error) {
    console.error("Error checking if user exists", error);
    await closeDBConnection(prisma);
    throw error;
  }
};

const updatePassword = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const result = await prisma.users.update({
      where: {
        email,
      },
      data: {
        password,
      },
    });
    console.log(`Record updated successfully`, result);
  } catch (error) {
    console.error("Error updating user", error);
    await closeDBConnection(prisma);
    throw error;
  }
};

const deleteUser = async (email: string): Promise<User> => {
  try {
    if (!prisma) {
      prisma = initializeDBClient();
    }
    const result = await prisma.users.delete({
      where: {
        email,
      },
    });
    console.log(`Record deleted successfully`, result);
    return result;
  } catch (error) {
    console.error("Error while registering user", error);
    await closeDBConnection(prisma);
    throw error;
  }
};

export const databaseUtilities = {
  deleteUser,
  fetchSingleUser,
  fetchUsers,
  insertUser,
  updatePassword,
};
