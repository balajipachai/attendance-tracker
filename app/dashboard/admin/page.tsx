import { singleUser, allUsers } from "@/app/lib/users/users.fetch";

export default async function Login() {
  // TODO Logic to fetch users
  const [user, users] = await Promise.all([
    singleUser("rutuja.kirad@example.com"),
    allUsers("", ""),
  ]);
  console.log("fetched user & users: ", user, users);
  return (
    <div className="relative overflow-x-auto">
      <h1>Admin Page</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Unique Identification Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Password
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">
              The Sliding Mr. Bones (Next Stop, Pottersville)
            </td>
            <td className="px-6 py-4">Malcolm Lockyer</td>
            <td className="px-6 py-4">1961</td>
            <td className="px-6 py-4">1961</td>
            <td className="px-6 py-4">1961</td>
            <td className="px-6 py-4">1961</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
