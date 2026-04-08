import { useState, useEffect, useRef, Fragment } from "react";
import { addAdmin, isNotAdmin } from "../../store/apis/admin";

const AddAdminModel = ({ open, onClose, onAdd, setResponse }) => {
  const formRef = useRef(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    isNotAdmin(setEmployees);
  }, [open]);

  useEffect(() => {
    console.log(admin);
  }, [admin]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={formRef}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl w-full overflow-y-hidden h-screen sm:max-h-[90vh] pt-12 sm:pt-5 sm:pb-10"
      >
        <h2 className="text-2xl font-bold mb-4">Add Department</h2>
        <div className="h-[100%] overflow-x-hidden p-4 pb-6">
          <form className="flex flex-col gap-4 h-[inherit] pb-4">
            <div className="max-h-[95%] overflow-y-scroll">
              {admin ? (
                <Fragment>
                  <div className="flex-1 grid gap-4 ">
                    <button
                      className="absolute right-20 text-red-400 cursor-pointer"
                      type="button"
                      onClick={() => setAdmin(null)}
                    >
                      clear
                    </button>
                    <div className="grid gap-1">
                      <label htmlFor="fullName" className="text-sm font-medium">
                        Full Name
                      </label>
                      <h1>{admin.fullName}</h1>
                    </div>

                    <div className="grid gap-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <h1>{admin.email}</h1>
                    </div>

                    <div className="grid gap-1">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </label>
                      <h1>{admin.phone}</h1>
                    </div>
                    {/* DOB */}
                    <div className="grid gap-1">
                      <label htmlFor="dob" className="text-sm font-medium">
                        Date of Birth
                      </label>
                      <h1>
                        {admin.dob
                          ? new Date(admin.dob).toLocaleDateString()
                          : "dd/mm/yyyy"}
                      </h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Department */}
                      <div className="grid gap-1">
                        <label
                          htmlFor="department"
                          className="text-sm font-medium"
                        >
                          Department
                        </label>
                        <h1>{admin.department?.name || "null"}</h1>
                      </div>

                      {/* Designation */}
                      <div className="grid gap-1">
                        <label
                          htmlFor="designation"
                          className="text-sm font-medium"
                        >
                          Designation
                        </label>
                        <h1>{admin.designation}</h1>
                      </div>
                    </div>

                    {/* Hire Date */}
                    <div className="grid gap-1">
                      <label htmlFor="hireDate" className="text-sm font-medium">
                        Hire Date
                      </label>
                      <h1>
                        {admin.hireDate
                          ? new Date(admin.hireDate).toLocaleDateString()
                          : "dd/mm/yyyy"}
                      </h1>
                    </div>

                    {/* Salary section */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Basic Salary */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="salaryBasic"
                          className="text-sm font-medium text-gray-700"
                        >
                          Basic Salary
                        </label>
                        <h1>{admin.salary.basic}</h1>
                      </div>

                      {/* Bonus */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="salaryBonus"
                          className="text-sm font-medium text-gray-700"
                        >
                          Bonus
                        </label>
                        <h1>{admin.salary.bonus}</h1>
                      </div>
                    </div>

                    {/* Leaves + Status Section */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Total Leaves */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="leavesTotal"
                          className="text-sm font-medium text-gray-700"
                        >
                          Total Leaves
                        </label>
                        <h1>{admin.leaves.totalLeaves}</h1>
                      </div>

                      {/* Leaves Taken */}
                      <div className="flex flex-col">
                        <label
                          htmlFor="leavesTaken"
                          className="text-sm font-medium text-gray-700"
                        >
                          Leaves Taken
                        </label>
                        <h1>
                          {admin.leaves.leavesTaken == 0
                            ? "0"
                            : admin.leaves.leavesTaken}
                        </h1>
                      </div>

                      {/* Status */}
                      <div className="flex flex-col sm:col-span-2">
                        <label
                          htmlFor="status"
                          className="text-sm font-medium text-gray-700"
                        >
                          Status
                        </label>
                        <h1>{admin.status}</h1>
                      </div>
                    </div>

                    {/* Address Section */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {[
                        { id: "line1", label: "Address Line 1" },
                        { id: "line2", label: "Address Line 2" },
                        { id: "city", label: "City" },
                        { id: "state", label: "State" },
                        { id: "postalCode", label: "Postal Code" },
                        { id: "country", label: "Country" },
                      ].map((field) => (
                        <div key={field.id} className="flex flex-col">
                          <label
                            htmlFor={field.id}
                            className="text-sm font-medium text-gray-700"
                          >
                            {field.label}
                          </label>
                          <h1>{admin.address[field.id]}</h1>
                        </div>
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                <div className="flex-1 flex flex-col items-start gap-2">
                  <h1 className="font-semibold text-lg">Select an Employee</h1>
                  {employees.map((emp) => {
                    return (
                      <button
                        type="button"
                        key={emp._id}
                        className=" bg-slate-100 w-full text-left px-4 py-2 rounded-md cursor-pointer hover:bg-blue-100"
                        onClick={() => {
                          setAdmin(emp);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-sm font-bold text-blue-400">
                            {/* Initials fallback */}
                            {(() => {
                              const names = emp.fullName.trim().split(" ");
                              const first = names[0] ? names[0][0] : "";
                              const last =
                                names.length > 1
                                  ? names[names.length - 1][0]
                                  : "";
                              return (first + last).toUpperCase();
                            })()}
                          </div>
                          <div>
                            {emp.fullName}
                            <br />
                            <div className="flex gap-3 text-sm text-slate-500">
                              <h1>
                                {emp.department == "" || !emp.department
                                  ? "N/A"
                                  : emp.department.name}
                                {" : "}
                              </h1>
                              <h1>{emp.designation}</h1>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {admin && (
              <button
                type="button"
                onClick={() => {
                  addAdmin(
                    admin,
                    onAdd,
                    setAdmin,
                    onClose,
                    setLoading,
                    setResponse,
                  );
                }}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition-colors"
              >
                Assign as Admin
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setAdmin(null);
                onClose(false);
              }}
              className="bg-red-500 p-2 rounded text-white"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default AddAdminModel;
