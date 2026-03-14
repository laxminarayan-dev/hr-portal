import { useRef, useEffect, useState } from "react";
import {
  initialDataForAddEmp,
  designations,
  fetchDepartments,
  handleChange,
  addEmployee,
} from "../../store/apis/employe";

const AddEmployeeModal = ({ open, onClose, onAdd, setResponse }) => {
  const [form, setForm] = useState(initialDataForAddEmp);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const formRef = useRef(null);
  const [defaultDate, setDefaultDate] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    setToday(formattedToday);
    today.setFullYear(today.getFullYear() - 18);
    const formattedDate = today.toISOString().split("T")[0];
    setDefaultDate(formattedDate);
  }, []);

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

  useEffect(() => {
    fetchDepartments(setDepartments);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={formRef}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl w-full overflow-y-hidden  h-screen sm:max-h-[90vh] pt-12 sm:pt-5 sm:pb-10"
      >
        <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
        <div className="h-[100%] overflow-y-scroll overflow-x-hidden p-4 pb-14 sm:pb-6">
          <form
            className="grid gap-4"
            onSubmit={() =>
              addEmployee(
                e,
                form,
                setLoading,
                onAdd,
                setForm,
                onClose,
                setResponse
              )
            }
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
            {/* DOB */}
            <div className="grid gap-1">
              <label htmlFor="dob" className="text-sm font-medium">
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="border w-full border-gray-300 rounded-lg py-1 px-3"
                defaultValue={defaultDate}
                max={defaultDate}
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
                value={form.department?._id || ""}
                onChange={(e) => {
                  const depId = e.target.value;
                  const selectedDep = departments.find(
                    (dep) => dep?._id === depId
                  );
                  setForm({
                    ...form,
                    department:
                      { _id: selectedDep?._id, name: selectedDep?.name } ||
                      null, // ✅ store full object if you want
                  });
                }}
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep?._id} value={dep?._id}>
                    {dep?.name}
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

            {/* Hire Date */}
            <div className="grid gap-1">
              <label htmlFor="hireDate" className="text-sm font-medium">
                Hire Date
              </label>
              <input
                id="hireDate"
                name="hireDate"
                type="date"
                className="border w-full border-gray-300 rounded-lg py-1 px-3"
                defaultValue={today}
                min={today}
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
                { id: "addressCountry", label: "Country" },
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
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800 transition-colors"
            >
              Add
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
};

export default AddEmployeeModal;
