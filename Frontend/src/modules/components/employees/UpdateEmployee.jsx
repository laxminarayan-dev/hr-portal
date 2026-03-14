import { useRef, useEffect, useState } from "react";
import {
  calculateDateBound,
  defaultForm,
  designations,
  fetchDepartments,
  updateEmployee,
  deepCompare,
  formatDateForInput,
  handleChange,
} from "../../store/apis/employe";

export default function UpdateEmployeeModal({
  initialData,
  open,
  onClose,
  onUpdate,
  setResponse,
}) {
  const initialForm = defaultForm(initialData);
  const formRef = useRef(null);
  const [form, setForm] = useState(initialForm);
  const [objComp, setObjComp] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [dob, setDOB] = useState({ min: "", max: "" });
  const [hireDate, setHireDate] = useState({ min: "", max: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculateDateBound(form, setForm, setDOB, setHireDate);
  }, [form.dob, form.hireDate]);

  useEffect(() => {
    fetchDepartments(setDepartments);
  }, []);

  // use effect for updating value form when model is opened
  useEffect(() => {
    setForm(defaultForm(initialData));
  }, [open]);

  //   use effect for comparing object and setting the update button
  useEffect(() => {
    setObjComp(deepCompare(initialForm, form));
  }, [form]);

  // use effect for closing the model when click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose(); // 🔥 call close function
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={formRef}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl w-full overflow-y-hidden  h-screen sm:max-h-[90vh] pt-12 sm:pt-5 sm:pb-10"
      >
        <h2 className="text-2xl font-bold mb-4">Update Employee</h2>
        <div className="h-[100%] overflow-y-scroll overflow-x-hidden p-4 pb-14 sm:pb-6">
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              updateEmployee(
                e,
                initialData,
                form,
                onUpdate,
                onClose,
                setResponse,
                setLoading
              );
            }}
          >
            <div className="grid gap-1">
              <label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.fullName}
                onChange={(e) => {
                  handleChange(e, setForm);
                }}
                required
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.email}
                onChange={(e) => {
                  handleChange(e, setForm);
                }}
                required
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.phone}
                onChange={(e) => {
                  handleChange(e, setForm);
                }}
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="dob" className="text-sm font-medium">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="border w-full border-gray-300 rounded-lg py-1 px-3"
                value={formatDateForInput(form.dob)}
                min={dob.min}
                max={dob.max}
                onChange={(e) => {
                  handleChange(e, setForm);
                }}
              />
            </div>

            {/* Department */}
            <div className="grid gap-1">
              <label htmlFor="department" className="text-sm font-medium">
                Department
              </label>
              <select
                id="department"
                name="department"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.department?._id}
                onChange={(e) => {
                  const depId = e.target.value;
                  const selectedDep = departments.find(
                    (dep) => dep._id === depId
                  );
                  setForm({
                    ...form,
                    department:
                      { _id: selectedDep._id, name: selectedDep.name } || null, // ✅ store full object if you want
                  });
                }}
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Designation */}
            <div className="grid gap-1">
              <label htmlFor="designation" className="text-sm font-medium">
                Designation
              </label>
              <select
                id="designation"
                name="designation"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.designation}
                onChange={(e) => {
                  handleChange(e, setForm);
                }}
                required
              >
                <option value="">Select Designation</option>
                {designations.map((des) => (
                  <option key={des._id} value={des.name}>
                    {des.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1">
              <label htmlFor="hireDate" className="text-sm font-medium">
                Hire Date
              </label>
              <input
                id="hireDate"
                name="hireDate"
                type="date"
                className="border w-full border-gray-300 rounded-lg py-1 px-3"
                value={formatDateForInput(form.hireDate)}
                min={hireDate.min}
                max={hireDate.max}
                onChange={(e) => {
                  handleChange(e, setForm);
                }}
              />
            </div>

            {/* Salary section */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Basic Salary */}
              <div className="flex flex-col">
                <label
                  htmlFor="salaryBasic"
                  className="text-sm font-medium text-gray-700"
                >
                  Basic Salary <span className="text-red-500">*</span>
                </label>
                <input
                  id="salaryBasic"
                  name="salaryBasic"
                  type="number"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.salaryBasic}
                  onChange={(e) => {
                    handleChange(e, setForm);
                  }}
                  required
                />
              </div>

              {/* Bonus */}
              <div className="flex flex-col">
                <label
                  htmlFor="salaryBonus"
                  className="text-sm font-medium text-gray-700"
                >
                  Bonus
                </label>
                <input
                  id="salaryBonus"
                  name="salaryBonus"
                  type="number"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.salaryBonus}
                  onChange={(e) => {
                    handleChange(e, setForm);
                  }}
                />
              </div>
            </div>

            {/* Bank */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Bank Name*/}
              <div className="flex flex-col">
                <label
                  htmlFor="bankName"
                  className="text-sm font-medium text-gray-700"
                >
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="bankName"
                  name="bankName"
                  type="text"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.bankName}
                  onChange={(e) => {
                    handleChange(e, setForm);
                  }}
                  required
                />
              </div>

              {/* Bank IFSC */}
              <div className="flex flex-col">
                <label
                  htmlFor="bankIFSC"
                  className="text-sm font-medium text-gray-700"
                >
                  IFSC Code <span className="text-red-500">*</span>
                </label>
                <input
                  id="bankIFSC"
                  name="bankIFSC"
                  type="text"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.bankIFSC}
                  onChange={(e) => {
                    handleChange(e, setForm);
                  }}
                  required
                />
              </div>

              {/* Bank Account */}
              <div className="flex flex-col">
                <label
                  htmlFor="bankAccount"
                  className="text-sm font-medium text-gray-700"
                >
                  Account Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="bankAccount"
                  name="bankAccount"
                  type="text"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.bankAccount}
                  onChange={(e) => {
                    handleChange(e, setForm);
                  }}
                  required
                />
              </div>
            </div>

            {/* Leaves + Status Section */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Total Leaves */}
              <div className="flex flex-col">
                <label
                  htmlFor="leavesTotal"
                  className="text-sm font-medium text-gray-700"
                >
                  Total Leaves
                </label>
                <input
                  id="leavesTotal"
                  name="leavesTotal"
                  type="number"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.leavesTotal}
                  onChange={(e) => {
                    handleChange(e, setForm);
                  }}
                />
              </div>

              {/* Leaves Taken */}
              <div className="flex flex-col">
                <label
                  htmlFor="leavesTaken"
                  className="text-sm font-medium text-gray-700"
                >
                  Leaves Taken
                </label>
                <input
                  id="leavesTaken"
                  name="leavesTaken"
                  type="number"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.leavesTaken}
                  onChange={(e) => {
                    handleChange(e, setForm);
                  }}
                />
              </div>

              {/* Status */}
              <div className="flex flex-col sm:col-span-2">
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={form.status}
                  onChange={(e) => {
                    handleChange(e, setForm);
                  }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            {/* Address Section */}
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {[
                { id: "addressLine1", label: "Address Line 1" },
                { id: "addressLine2", label: "Address Line 2" },
                { id: "addressCity", label: "City" },
                { id: "addressState", label: "State" },
                { id: "addressPostalCode", label: "Postal Code" },
                { id: "addressCountry", label: "Country", readOnly: true },
              ].map((field) => (
                <div key={field.id} className="flex flex-col">
                  <label
                    htmlFor={field.id}
                    className="text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    value={form[field.id]}
                    onChange={(e) => {
                      handleChange(e, setForm);
                    }}
                    readOnly={field.readOnly || false}
                    disabled={field.readOnly || false}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={objComp}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800 disabled:bg-blue-300 transition-colors"
            >
              Update
            </button>
            <button
              onClick={() => onClose(false)}
              className="bg-red-500 p-2 rounded text-white"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 bg-opacity-60 z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
