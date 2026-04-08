import { useState, useEffect } from "react";
import UserDetailTable from "../../lib/tables/UserDetailTable";
import { fetchAdmins, deleteAdmin } from "../../store/apis/admin";
import AddAdminModel from "./AddAdmin";
import { Plus } from "lucide-react";

export default function Admin() {
  const [users, setUsers] = useState();
  const [response, setResponse] = useState(null);
  const [addUserModel, setAddUserModel] = useState(false);

  useEffect(() => {
    fetchAdmins(setUsers);
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Admin Management</h1>
        <button
          type="button"
          onClick={() => setAddUserModel(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          <Plus />
          Add Admin
        </button>
      </div>
      {users == null ? (
        <div className="w-full h-90 flex justify-center items-center">
          <div className="animate-spin border border-b-white border-l-0 w-10 h-10 rounded-full"></div>
        </div>
      ) : users.length == 0 ? (
        <div>
          <h1>No Admin found!</h1>
        </div>
      ) : (
        users.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm max-w-7xl mx-auto">
            <UserDetailTable
              deleteAdmin={deleteAdmin}
              users={users}
              setResponse={setResponse}
              setUsers={setUsers}
            />
          </div>
        )
      )}
      {response && (
        <div className="fixed z-100 top-20 right-8 transform -translate-x-1 bg-gray-800 p-4 rounded shadow-lg">
          <p className={response.success ? "text-green-500" : "text-red-500"}>
            {response.msg || "Default Message"}
          </p>
        </div>
      )}

      {
        <AddAdminModel
          open={addUserModel}
          onClose={setAddUserModel}
          onAdd={setUsers}
          setResponse={setResponse}
        />
      }
    </div>
  );
}
