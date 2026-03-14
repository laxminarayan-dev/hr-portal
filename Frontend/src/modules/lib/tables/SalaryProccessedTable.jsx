import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SalaryProccessedTable({ ProccesedSalaryData }) {
  const navigate = useNavigate();
  const handlePrint = (emp) => {
    navigate("/salaryPrint", { state: { emp } });
  };

  return (
    <table className="min-w-full border-collapse bg-white">
      <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
        <tr>
          <th className="py-3 px-4 text-left">Employee</th>
          <th className="py-3 px-4 text-left">Department</th>
          <th className="py-3 px-4 text-left truncate">Last Payble</th>
          <th className="py-3 px-4 text-left truncate"> Paid</th>
          <th className="py-3 px-4 text-left truncate">Last Paid Month</th>
          <th className="py-3 px-4 text-left truncate">Due Balance</th>
          <th className="py-3 px-4 text-center"></th>
        </tr>
      </thead>
      <tbody>
        {ProccesedSalaryData.length > 0 ? (
          ProccesedSalaryData.map((sal, idx) => (
            <tr
              key={idx}
              className="border-t border-slate-200 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 font-medium truncate">{sal.fullName}</td>
              <td className="py-3 px-4 truncate">
                {sal.department?.name || "N/A"}
              </td>
              <td className="py-3 px-4 text-blue-400">
                ₹{sal.salary.netPay.toLocaleString()}
              </td>
              <td className="py-3 px-4 font-semibold text-red-400">
                ₹{sal.salary.proccessed.toLocaleString()}
              </td>
              <td className="py-3 px-4 truncate">
                {sal.salary.lastProccessedMonth
                  ? new Date(sal.salary.lastProccessedMonth).toLocaleString(
                      "default",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : new Date(sal.hireDate).toLocaleString("default", {
                      month: "short",
                      year: "numeric",
                    })}
              </td>
              <td className="py-3 px-4 font-semibold">₹{sal.salary.due}</td>

              <td className="py-3 px-4 flex justify-center gap-3">
                <button
                  className="text-green-500 hover:text-green-400"
                  onClick={() => handlePrint(sal)}
                >
                  <FileText size={18} />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="py-6 text-center text-gray-500 italic">
              No salary records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default SalaryProccessedTable;
