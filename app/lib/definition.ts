export type Users = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "admin"; // In TypeScript, this is called a string union type.  It means that the "role" property can only be one of the three strings: 'student' or 'teacher' or 'admin'.
};
