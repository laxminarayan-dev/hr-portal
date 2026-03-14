import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeDetail } from "../../store/apis/employe";
import UpdateEmployeeModal from "./UpdateEmployee";

export default function EmployeeDetail() {
  const [updateEmpModel, setUpdateEmpModel] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchEmployeeDetail(id, setEmployee);
  }, []);

  return (
    <div className="bg-white p-8 w-full h-screen mx-auto md:px-20 py-8">
      {employee == null ? (
        <div className="w-full h-90 flex justify-center items-center">
          <div className="animate-spin border border-b-white border-l-0 w-10 h-10 rounded-full"></div>
        </div>
      ) : (
        <React.Fragment>
          <div>
            <div className="flex items-center gap-4 mb-6">
              {/* Placeholder for an employee photo */}
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-400">
                {/* Initials fallback */}
                {(() => {
                  const names = employee.fullName.trim().split(" ");
                  const first = names[0] ? names[0][0] : "";
                  const last =
                    names.length > 1 ? names[names.length - 1][0] : "";
                  return (first + last).toUpperCase();
                })()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-700">
                  {employee.fullName || "Employee Name"}
                </h2>
                <span className="block text-sm text-gray-500">
                  {employee.designation || "Designation"}
                </span>
              </div>
              <span
                className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
                  employee.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {employee.status || "Status"}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-6 mb-6 grid grid-cols-2 gap-5 text-sm">
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <div className="text-gray-500">{employee.email}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <div className="text-gray-500">{employee.phone}</div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Department:</span>
                <div className="text-gray-500">
                  {employee.department?.name || "null"}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">DOB:</span>
                <div className="text-gray-500">
                  {employee.dob
                    ? new Date(employee.dob).toLocaleDateString()
                    : ""}
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Hire Date:</span>
                <div className="text-gray-500">
                  {employee.hireDate
                    ? new Date(employee.hireDate).toLocaleDateString()
                    : ""}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl pb-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Salary
              </h3>
              <div className="flex flex-col gap-1">
                <div>
                  <span className="text-gray-600">Salary:</span>{" "}
                  <span className="font-bold">
                    {employee.salary.basic.toLocaleString()}{" "}
                    {employee.salary.currency}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Bonus:</span>{" "}
                  <span>
                    {employee.salary.bonus
                      ? employee.salary.bonus.toLocaleString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl pb-4">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Leaves
              </h3>
              <div>
                <span className="text-gray-600">
                  {employee.leaves.leavesTaken} taken
                </span>{" "}
                /{" "}
                <span className="text-gray-600">
                  {employee.leaves.leavesRemaining} remaining
                </span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl mb-8">
              <h3 className="text-md font-semibold text-gray-700 mb-2">
                Address
              </h3>
              <div className="text-gray-600">
                {employee.address.line1}, {employee.address.line2},{" "}
                {employee.address.city}, {employee.address.state} -{" "}
                {employee.address.postalCode}, {employee.address.country}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setUpdateEmpModel(true)}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDelete(id, navigate, setResponse, setLoading);
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600"
              >
                Remove
              </button>
            </div>
            {
              <UpdateEmployeeModal
                initialData={employee}
                open={updateEmpModel}
                onClose={setUpdateEmpModel}
                onUpdate={setEmployee}
                setResponse={setResponse}
              />
            }
          </div>
          {response && (
            <div className="fixed top-20 right-8 transform -translate-x-1 bg-gray-800 p-4 rounded shadow-lg">
              <p
                className={response.success ? "text-green-500" : "text-red-500"}
              >
                {response.msg || "Default Message"}
              </p>
            </div>
          )}
          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 bg-opacity-60 z-50">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
