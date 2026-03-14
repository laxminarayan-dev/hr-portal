function SalaryDuesTable({ emps, calculatePendingSalary }) {
  return (
    <table className="min-w-full border-collapse bg-white">
      <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
        <tr>
          <th className="py-3 px-4 text-left truncate">Employee</th>
          <th className="py-3 px-4 text-left truncate">Department</th>
          <th className="py-3 px-4 text-left truncate">Basic</th>
          <th className="py-3 px-4 text-left truncate">Allowances</th>
          <th className="py-3 px-4 text-left truncate">Deductions</th>
          <th className="py-3 px-4 text-left truncate">Gross Salary</th>
          <th className="py-3 px-4 text-left truncate">Last Dues</th>
          <th className="py-3 px-4 text-left truncate">Last Paid</th>
          <th className="py-3 px-4 text-left truncate">Last Paid Month</th>
          <th className="py-3 px-4 text-left truncate">Total Payble</th>
        </tr>
      </thead>
      <tbody>
        {emps.length > 0 ? (
          emps.map((emp, ind) => (
            <tr
              key={ind}
              className="border-t border-slate-200 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4 font-medium truncate">{emp.fullName}</td>
              <td className="py-3 px-4 truncate">
                {emp.department?.name || "N/A"}
              </td>
              <td className="py-3 px-4">
                ₹{emp.salary.basic.toLocaleString()}
              </td>
              <td className="py-3 px-4 text-green-500">
                ₹
                {emp.salary.allowance.conveyanceAllowances +
                  emp.salary.allowance.houseRentAllowances +
                  emp.salary.allowance.medicalAllowances +
                  emp.salary.allowance.specialAllowances}
              </td>

              <td className="py-3 px-4 text-red-400">
                ₹
                {emp.salary.deduction.epf +
                  emp.salary.deduction.healthInsurance +
                  emp.salary.deduction.professionalInsurance +
                  emp.salary.deduction.tds}
              </td>

              <td className="py-3 px-4 text-blue-400">
                ₹
                {emp.salary.allowance.conveyanceAllowances +
                  emp.salary.allowance.houseRentAllowances +
                  emp.salary.allowance.medicalAllowances +
                  emp.salary.allowance.specialAllowances +
                  emp.salary.basic -
                  (emp.salary.deduction.epf +
                    emp.salary.deduction.healthInsurance +
                    emp.salary.deduction.professionalInsurance +
                    emp.salary.deduction.tds)}
              </td>

              <td className="py-3 px-4 text-green-500">
                ₹{emp.salary.lastDue}
              </td>
              <td className="py-3 px-4 text-red-500">
                ₹{emp.salary?.lastProccessed || 0}
              </td>

              <td className="py-3 px-4">
                {emp.salary.lastProccessedMonth
                  ? new Date(emp.salary.lastProccessedMonth).toLocaleString(
                      "default",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "N/A"}
              </td>

              <td className="py-3 px-4 font-bold text-blue-500">
                ₹{calculatePendingSalary(emp)}
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

export default SalaryDuesTable;
