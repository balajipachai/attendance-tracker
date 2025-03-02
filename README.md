# Attendance Tracker

## Getting Started

First, run the development server:

```bash
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Introduction

- `/app`: Contains all the routes, components, and logic for your application, this is where you'll be mostly working from.
- `/app/lib`: Contains functions used in your application, such as reusable utility functions and data fetching functions.
- unctions.
- `/app/ui`: Contains all the UI components for your application, such as cards, tables, and forms.
- `/public`: Contains all the static assets for your application, such as images.
- `Config Files`: You'll also notice config files such as `next.config.mjs` at the root of your application. Most of these files are created and pre-configured when you start a new project using create-next-app.

- For this project, some placeholder data is provided in app/lib/placeholder-data.ts. Each JavaScript object in the file represents a table in the database. For example, for the users table:

```javascript
const users = [
  {
    id: "a37a0ba6-b75a-4cb0-8c4a-7815d3e25594",
    uid: "AWSP45987", // Unique Id, for Students = PRN, for Teacher = Teacher Id, for Admin = AdminId etc
    name: "Diya Bhujbal",
    email: "diya.bhujbal@example.com",
    password: "123456", // This is sample, in db password will be stored after hashing it
    role: "student",
  },
  {
    id: "42cfa51c-d31c-460e-b3dd-0159a771bfdf",
    uid: "SLDI63541",
    name: "Ayusha Jadhav",
    email: "ayusha.jadhav@example.com",
    password: "789101",
    role: "student",
  },
  {
    id: "7a8b7dd6-3295-47a6-a8c8-64f978babeb1",
    name: "Rutuja Kirad",
    uid: "OPLS45823",
    email: "rutuja.kirad@example.com",
    password: "111213",
    role: "student",
  },
  {
    id: "4be0030f-937c-402f-ac54-8366ac6d52ca",
    uid: "SLWY96541",
    name: "Reena Bharathi",
    email: "reena.bharathi@example.com",
    password: "141516",
    role: "teacher",
  },
  {
    id: "1f590e33-db8b-4fd4-a61d-5b4c40be9b73",
    uid: "LOQL74582",
    name: "Balaji Pachai",
    email: "balaji.pachai@example.com",
    password: "171819",
    role: "admin",
  },
];
```

- This project is written in TypeScript. This reflects the modern web landscape.
- Take a look at the /app/lib/definitions.ts file. Here, we manually define the types that will be returned from the database. For example, the users table has the following types:

```javascript
export type Users = {
  id: string,
  uid: string,
  name: string,
  email: string,
  password: string,
  role: "student" | "teacher" | "admin" | "external", // In TypeScript, this is called a string union type.  It means that the "role" property can only be one of the three strings: 'student' or 'teacher' or 'admin' or 'external'.
  // external can be either of 'it-expert' OR 'project-guide' OR 'guest-lecturer' OR anything
};
```

- Tailwind is a CSS framework that speeds up the development process by allowing you to quickly write utility classes directly in your TSX markup.

## Nested routing

- Next.js uses file-system routing where folders are used to create nested routes. Each folder represents a route segment that maps to a URL segment.
- You can create separate UIs for each route using `layout.tsx` and `page.tsx` files.
- `page.tsx` is a special Next.js file that exports a React component, and it's required for the route to be accessible. In this application, there is already a page file: `/app/page.tsx` - this is the home page associated with the route `/`.
- `/app/dashboard/page.tsx` is associated with the `/dashboard` path.

## Navigating Between Pages

- In Next.js, you can use the `<Link />` Component to link between pages in the application. `<Link>` allows you to do client-side navigation with JavaScript.
- Example can be found in `app/page.tsx`

```javascript
<Link
  href="/login"
  className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
/>
```

- `Link` is important to navigate between pages `without a full refresh`.

## Configuring Database (MongoDB)

- [Configuration Steps In Details](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb)
- `pnpm install prisma typescript ts-node @types/node --save-dev`
- `pnpm prisma init` this generates the below next steps (kept only the stuff that makes your understanding easier)

  1. Set the `DATABASE_URL` in the `.env` file to point to your existing database.
  2. Set the provider of the datasource block in schema.prisma to match your database: `mongodb`.
  3. Run `pnpm prisma db pull` to turn your database schema into a Prisma schema.
  4. Run `pnpm prisma generate` to generate the Prisma Client. You can then start querying your database.
  5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/beyond-the-orm

- The table definitions must be defined inside `prisma/schema.prisma`. After defining the tables.
- `pnpm prisma-validate`
- `pnpm prisma format`
- `pnpm prisma generate`
- `pnpm prisma db push` (DO THIS IFF YOU HAVE ADDED NEW TABLES OR MODIFIED `prisma/schema.prisma`)

## Using Server Components to fetch data

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
