import { User, Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmployeeActivityTable = ({ tableData }) => {
  return (
    <div className="bg-white border border-stone-100 shadow-sm p-5 mb-10 flex flex-col gap-8 rounded-lg">
      <div>
        <h1 className="text-2xl font-bold">Recent Employee Activity</h1>
        <p className="text-sm">
          An overview of recently active or updated employee profiles.
        </p>
      </div>
      {/* table */}
      <div className="">
        {/* table header */}
        <div className="flex justify-center border-b gap-3 border-stone-300 py-3 px-1 text-sm">
          <h1 className="flex-[1.5] text-slate-500">Employee</h1>
          <h1 className="flex-1 text-slate-500 hidden md:block">Department</h1>
          <h1 className="flex-1 text-slate-500 hidden lg:block">Role</h1>
          <h1 className="flex-1 text-slate-500">Status</h1>
          <h1 className="flex-[0.5] text-slate-500"></h1>
        </div>
        {/* table body */}
        <div>
          {tableData.map((emp, index) => (
            <TableRow key={index} data={emp} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default EmployeeActivityTable;

const TableRow = ({ data }) => {
  const navigate = useNavigate();
  const emp = data;
  return (
    <div className="relative flex justify-center border-b gap-3 border-stone-300 py-3 text-sm">
      <h1 className="flex-[1.5] flex justify-start items-center gap-1 truncate">
        <User size={16} /> {emp.name}
      </h1>
      <h1 className="flex-1 hidden md:block">{emp.role}</h1>
      <h1 className="flex-1 hidden lg:block">{emp.department?.name || ""}</h1>
      <h1 className="flex-1">{emp.status}</h1>
      <h1 className="flex-[0.5]">
        <Pen
          size={16}
          onClick={() => {
            navigate(`/users/${emp.id}`);
          }}
        />
      </h1>
    </div>
  );
};
