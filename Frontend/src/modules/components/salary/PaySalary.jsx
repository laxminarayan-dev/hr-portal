import { useState, Fragment } from "react";
import { calculatePendingSalary, paySalary } from "../../store/apis/salary";

const PaySalaryModel = ({
  emps,
  setShowPaySalaryModal,
  setResponse,
  setEmployees,
  setPaySlips,
  setIsLoading,
}) => {
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [newSalary, setNewSalary] = useState({
    proccessed: "",
    bonus: "",
    currency: "INR",
    lastProccessedMonth: new Date().toISOString(), // this is here because this value go to default month selector
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Pay Salary</h2>

        <div className="space-y-3">
          <select
            value={selectedEmp || ""}
            onChange={(e) => setSelectedEmp(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">Select Employee</option>
            {emps.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.fullName}
              </option>
            ))}
          </select>
          {selectedEmp && (
            <Fragment>
              <div className="flex flex-col pl-1">
                <label className=" text-gray-700 text-md pb-2 font-bold">
                  Total Salary Payble:
                </label>
                <h1>
                  ₹
                  {calculatePendingSalary(
                    emps.filter((emp) => emp._id === selectedEmp)[0]
                  )}
                </h1>
              </div>
              <input
                type="number"
                value={newSalary.proccessed}
                onChange={(e) =>
                  setNewSalary({
                    ...newSalary,
                    proccessed: e.target.value, // store full ISO back
                  })
                }
                placeholder="Salary to be Pay"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />

              <input
                type="number"
                placeholder="Bonus Pay"
                value={newSalary.bonus}
                onChange={(e) =>
                  setNewSalary({
                    ...newSalary,
                    bonus: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />

              <input
                type="month"
                value={newSalary.lastProccessedMonth.slice(0, 7)}
                onChange={(e) =>
                  setNewSalary({
                    ...newSalary,
                    lastProcessedMonth: new Date(e.target.value).toISOString(), // store full ISO back
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />

              <select
                value={newSalary.currency}
                onChange={(e) =>
                  setNewSalary({
                    ...newSalary,
                    currency: e.target.value, // store full ISO back
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </Fragment>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setShowPaySalaryModal(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              paySalary(
                emps,
                newSalary,
                selectedEmp,
                setResponse,
                setShowPaySalaryModal,
                setNewSalary,
                setEmployees,
                setPaySlips,
                setIsLoading
              )
            }
            disabled={selectedEmp ? false : true}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaySalaryModel;
