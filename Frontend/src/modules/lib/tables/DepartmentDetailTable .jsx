import { Pen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DepartmentDetailTable = ({ tableData }) => {
  return (
    <table className="min-w-full mx-auto border-collapse rounded-md bg-white">
      <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
        <tr>
          <th className="py-3 px-4 text-left truncate ">Name</th>
          <th className="py-3 px-4 text-left truncate ">Head</th>
          <th className="py-3 px-4 text-left truncate ">Budget</th>
          <th className="py-3 px-4 text-left truncate ">Location</th>
          <th className="py-3 px-4 text-left truncate ">Status</th>
          <th className="py-3 px-4 text-left truncate "></th>
        </tr>
      </thead>

      <tbody>
        {tableData.map((dept, i) => (
          <DepartmentTableRow key={i} data={dept} />
        ))}
      </tbody>
    </table>
  );
};

const DepartmentTableRow = ({ data }) => {
  const navigate = useNavigate();
  return (
    <tr className="border-t border-slate-200 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4 truncate">{data.name}</td>
      <td className="py-3 px-4 truncate">
        {data.head ? data.head.fullName : "—"}
      </td>
      <td className="py-3 px-4 truncate">
        ₹{data.budget?.allocated?.toLocaleString()} {data.budget?.currency}
      </td>
      <td className="py-3 px-4 truncate">
        {data.location?.city}, {data.location?.state}
      </td>
      <td className="py-3 px-4 truncate">{data.status}</td>
      <td className="py-3 px-4 truncate">
        <Pen
          size={16}
          className="cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => navigate(`/department/${data._id}`)}
        />
      </td>
    </tr>
  );
};

export default DepartmentDetailTable;
