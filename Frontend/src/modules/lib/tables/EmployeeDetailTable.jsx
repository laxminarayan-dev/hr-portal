import CryptoJS from "crypto-js";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeDetailTable = ({ tableData }) => {
  const [modalEmployee, setModalEmployee] = useState(null);

  const generateEmpId = (mongoId) => {
    const hash = CryptoJS.MD5(mongoId).toString();
    return "EMP" + hash.substring(0, 6).toUpperCase();
  };

  return (
    <table className="min-w-full mx-auto border-collapse rounded-md bg-white">
      <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
        <tr>
          <th className="py-3 px-4 text-left truncate  ">EmpId</th>
          <th className="py-3 px-4 text-left truncate  ">Name</th>
          <th className="py-3 px-4 text-left truncate  ">Phone</th>
          <th className="py-3 px-4 text-left truncate  ">Department</th>
          <th className="py-3 px-4 text-left truncate  ">Designation</th>
          <th className="py-3 px-4 text-left truncate  ">Salary</th>
          <th className="py-3 px-4 text-left truncate  ">Leaves Avail.</th>
          <th className="py-3 px-4 text-left truncate  ">Leaves Taken</th>
          <th className="py-3 px-4 text-left truncate  ">Joining Date</th>
          <th className="py-3 px-4 text-left truncate ">Address</th>
          <th className="py-3 px-4 text-left truncate  "></th>
        </tr>
      </thead>

      {/* table body */}
      <tbody>
        {tableData.map((emp, index) => (
          <DetailTableRow
            key={index}
            data={emp}
            onEditClick={setModalEmployee}
            generateEmpId={generateEmpId}
          />
        ))}
      </tbody>

      {/* modal */}
      {modalEmployee && (
        <EditEmployeeModal
          employee={modalEmployee}
          onClose={() => setModalEmployee(null)}
        />
      )}
    </table>
  );
};

const DetailTableRow = ({ data, generateEmpId }) => {
  const navigate = useNavigate();
  return (
    <tr className="border-t border-slate-200 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4 truncate">{generateEmpId(data._id)}</td>
      <td className="py-3 px-4 truncate">{data.fullName}</td>
      <td className="py-3 px-4 truncate">{data.phone}</td>
      <td className="py-3 px-4 truncate">{data.department?.name}</td>
      <td className="py-3 px-4 truncate">{data.designation}</td>
      <td className="py-3 px-4 truncate">
        {data.salary.basic.toLocaleString()} {data.salary.currency}
      </td>
      <td className="py-3 px-4 truncate">{data.leaves.leavesRemaining}</td>
      <td className="py-3 px-4 truncate">{data.leaves.leavesTaken}</td>
      <td className="py-3 px-4 truncate">
        {new Date(data.hireDate).toLocaleDateString()}
      </td>
      <td className="py-3 px-4 truncate">
        <span
          className="py-3 px-4 truncate w-20"
          title={`${data.address.line1}, ${data.address.line2}, ${data.address.city}, ${data.address.state}`}
        >
          {`${data.address.line1}, ${data.address.line2}, ${data.address.city}, ${data.address.state}`}
        </span>
      </td>
      <td className="py-3 px-4 truncate">
        <Pen
          size={16}
          className="cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => navigate(`/employee/${data._id}`)}
        />
      </td>
    </tr>
  );
};

export default EmployeeDetailTable;
