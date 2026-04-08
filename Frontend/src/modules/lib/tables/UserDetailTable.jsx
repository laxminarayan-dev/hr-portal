import { Trash2 } from "lucide-react";
import CryptoJS from "crypto-js";

const generateUserId = (mongoId) => {
  const hash = CryptoJS.MD5(mongoId).toString();
  return "USR" + hash.substring(0, 6).toUpperCase();
};

const UserDetailTable = ({ users, deleteAdmin, setResponse, setUsers }) => {
  return (
    <table className="min-w-full mx-auto border-collapse rounded-md bg-white">
      <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
        <tr>
          <th className="py-3 px-4 text-left truncate">User ID</th>
          <th className="py-3 px-4 text-left truncate">Name</th>
          <th className="py-3 px-4 text-left truncate">Email</th>
          <th className="py-3 px-4 text-left truncate">Department</th>
          <th className="py-3 px-4 text-left truncate">Designation</th>
          <th className="py-3 px-4 text-left truncate"></th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {users.map((user, index) => (
          <UserTableRow
            key={index}
            deleteAdmin={deleteAdmin}
            setResponse={setResponse}
            setUsers={setUsers}
            data={user}
          />
        ))}
      </tbody>
    </table>
  );
};

const UserTableRow = ({ data, deleteAdmin, setResponse, setUsers }) => {
  return (
    <tr className="border-t border-slate-200 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4 truncate">{generateUserId(data._id)}</td>
      <td className="py-3 px-4 truncate">{data.fullName}</td>
      <td className="py-3 px-4 truncate">{data.email}</td>
      <td className="py-3 px-4 truncate">{data.department?.name || "N/A"}</td>
      <td className="py-3 px-4 truncate">{data?.designation || "N/A"}</td>
      <td className="py-3 px-4 truncate">
        <Trash2
          size={16}
          className="cursor-pointer text-red-500 hover:text-red-600"
          onClick={() => {
            deleteAdmin(data._id, setResponse, setUsers);
          }}
        />
      </td>
    </tr>
  );
};

export default UserDetailTable;
