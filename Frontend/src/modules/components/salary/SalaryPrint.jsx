import { useLocation } from "react-router-dom";
import {
  calcMonts,
  generateEmpId,
  defaultFields,
  calculateGrossSalary,
  calculateTotalDeduction,
  getProcessedMonth,
  formatCurrency,
} from "../../store/apis/salary";

const SalaryPrint = () => {
  const { earnings, deductions } = defaultFields;
  const { state } = useLocation();
  const emp = state?.emp;

  if (!emp)
    return <div className="text-center mt-20">Employee data not found</div>;

  const monthsData = calcMonts(emp) || [];
  const grossSalary = calculateGrossSalary(emp);
  const totalDeduction = calculateTotalDeduction(emp);
  const processedMonth = getProcessedMonth(emp);

  return (
    <div className="relative z-1 bg-white max-w-5xl mx-auto rounded-2xl shadow-none xl:shadow-lg xl:border border-[#e8eaf5] p-8 md:p-12 overflow-hidden xl:my-20 print-area">
      {/* Watermark */}
      <div className="absolute inset-0 z-100 flex justify-center items-center pointer-events-none select-none">
        <img
          src="./appsqaudz-logo.svg"
          alt="AppSquadz Logo"
          className="w-[400px] opacity-10 -rotate-12"
        />
      </div>

      {/* Header */}
      <div className="text-center border-b-2 border-[#e4e7fc] pb-2 mb-3 relative">
        <img
          className="mx-auto w-50"
          src="./appsqaudz-logo.svg"
          alt="AppSquadz"
        />
        <h2 className="text-[1.25rem] font-semibold text-[#5561a7] mt-2 tracking-wide">
          Salary Slip – {processedMonth}
        </h2>
      </div>

      {/* Employee Details */}
      <section className="flex flex-col sm:flex-row md:gap-8 mb-8 relative z-10">
        <div className="flex-1 space-y-2">
          <Detail label="Name" value={emp.fullName} />
          <Detail label="Emp. No" value={generateEmpId(emp._id)} />
          <Detail label="Designation" value={emp.designation} />
          <Detail label="Department" value={emp.department?.name || "N/A"} />
        </div>
        <div className="flex-1 space-y-2">
          <Detail label="Bank Name" value={emp.bank?.name || "N/A"} />
          <Detail label="IFSC Code" value={emp.bank?.ifsc || "N/A"} />
          <Detail label="A/c No." value={emp.bank?.account || "N/A"} />
        </div>
      </section>

      {/* Salary Breakdown */}
      <section className="flex flex-col sm:flex-row gap-6 mb-6 relative z-10">
        <SalaryTable
          title="Earnings"
          items={[
            { label: "Basic Salary", value: emp.salary.basic },
            ...earnings.map((item) => ({
              label: item.label,
              value: emp.salary.allowance[item.key],
            })),
            { label: "Gross Salary", value: grossSalary, highlight: true },
          ]}
        />

        <SalaryTable
          title="Deductions"
          items={[
            ...deductions.map((item) => ({
              label: item.label,
              value: emp.salary.deduction[item.key],
            })),
            {
              label: "Total Deduction",
              value: totalDeduction,
              highlight: true,
            },
          ]}
        />
      </section>

      {/* Net Pay Summary */}
      <section className="bg-[#f6f7fe] shadow rounded-xl p-4 relative z-10">
        <table className="w-full text-[15px] mb-4">
          <tbody>
            {monthsData.map((data) => (
              <tr key={data.month}>
                <td className="font-medium text-[#6b6eab] py-1 px-3 text-lg">
                  Salary of {data.month}
                </td>
                <td className="text-right font-medium text-[#353a6d] py-1 px-3 text-lg">
                  {formatCurrency(data.salary)}
                </td>
              </tr>
            ))}

            <tr>
              <td className="font-medium text-[#6b6eab] py-1 px-3 text-lg">
                Due Salary
              </td>
              <td className="text-right font-medium text-[#353a6d] py-1 px-3 text-lg">
                {formatCurrency(
                  monthsData.length > 0 ? emp.salary.lastDue : emp.salary.netPay
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <Summary label="Net Payable" value={emp.salary.netPay} color="blue" />
        <Summary
          label="Total Paid"
          value={emp.salary.proccessed}
          color="green"
        />
        <Summary label="Remaining Dues" value={emp.salary.due} color="red" />
      </section>
    </div>
  );
};

/* 🔹 Small UI Components */
const Detail = ({ label, value }) => (
  <div className="flex gap-2">
    <span className="font-semibold text-[#6063a4]">{label}:</span>
    <span className="truncate text-[#333]">{value}</span>
  </div>
);

const SalaryTable = ({ title, items }) => (
  <div className="bg-[#f6f7fe] rounded-xl flex-1 p-4 shadow-sm">
    <h3 className="font-semibold text-[#5559af] mb-2 text-center border-b border-[#e3e6fd] pb-1">
      {title}
    </h3>
    <table className="w-full text-[15px]">
      <tbody>
        {items.map((item) => (
          <tr
            key={item.label}
            className={item.highlight ? "bg-[#e5e8fa] font-semibold" : ""}
          >
            <td className="font-medium text-[#6b6eab] py-1 px-3">
              {item.label}
            </td>
            <td className="text-right font-medium text-[#353a6d] py-1 px-3">
              {formatCurrency(item.value)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Summary = ({ label, value, color }) => {
  const colorClasses = {
    blue: "bg-[#e5eafb] text-[#394396]",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-500",
  };
  return (
    <div
      className={`flex justify-between items-center font-semibold rounded-lg px-4 py-3 text-lg mb-2 ${colorClasses[color]}`}
    >
      <span>{label}</span>
      <span>{formatCurrency(value)}</span>
    </div>
  );
};

export default SalaryPrint;
