import { useState, useEffect, useRef } from "react";

import DepartmentDetailTable from "../../lib/tables/DepartmentDetailTable ";
import { Plus } from "lucide-react";
const Departments = () => {
  const [deptList, setDeptList] = useState(null);
  const [response, setResponse] = useState(null);
  const [addDeptModal, setAddDeptModal] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/department/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.departments) {
          setDeptList(data.departments);
        } else {
          setDeptList([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-lg font-bold">Department Management</h1>
        <button
          type="button"
          onClick={() => setAddDeptModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          <Plus />
          Add Department
        </button>
      </div>

      {deptList == null ? (
        <div className="w-full h-90 flex justify-center items-center">
          <div className="animate-spin border border-b-white border-l-0 w-10 h-10 rounded-full"></div>
        </div>
      ) : deptList.length === 0 ? (
        <div>
          <h1>No Department found!</h1>
        </div>
      ) : (
        deptList.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm max-w-7xl mx-auto">
            <DepartmentDetailTable tableData={deptList} />
          </div>
        )
      )}
      {response && (
        <div className="fixed z-100 top-20 right-8 transform -translate-x-1 bg-gray-800 p-4 rounded shadow-lg">
          <p className={response.success ? "text-green-500" : "text-red-500"}>
            {response.msg || "Default Message"}
          </p>
        </div>
      )}
      {
        <AddDepartmentModal
          open={addDeptModal}
          onClose={setAddDeptModal}
          onAdd={setDeptList}
          setResponse={setResponse}
        />
      }
    </div>
  );
};

export default Departments;

export const AddDepartmentModal = ({ open, onClose, onAdd, setResponse }) => {
  const initialData = {
    name: "",
    description: "",
    head: {},
    budgetAllocated: "",
    budgetSpent: "",
    budgetCurrency: "INR",
    locationOffice: "",
    locationCity: "",
    locationState: "",
    locationCountry: "India",
    status: "Active",
  };

  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const formRef = useRef(null);

  // Fetch employees for head selection
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/allEmployees`)
      .then((res) => res.json())
      .then((data) => {
        const validEmployees = data.emps.filter(
          (emp) => emp.department == null || emp.department == ""
        );
        if (data.emps) setEmployees(validEmployees);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const deptData = {
      name: form.name,
      description: form.description,
      head: form.head || null,
      budget: {
        allocated: Number(form.budgetAllocated) || 0,
        spent: Number(form.budgetSpent) || 0,
        currency: form.budgetCurrency,
      },
      location: {
        office: form.locationOffice,
        city: form.locationCity,
        state: form.locationState,
        country: form.locationCountry,
      },
      status: form.status,
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/department/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deptData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.departments) {
          onAdd(data.departments);
          setForm(initialData);
          onClose(false);
          setResponse({ success: true, msg: data.message });
        } else {
          setResponse({ success: false, msg: data.message });
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
      .finally(() => {
        setTimeout(() => {
          setResponse(null);
          setLoading(false);
        }, 2000);
      });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={formRef}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl w-full overflow-y-hidden h-screen sm:max-h-[90vh] pt-12 sm:pt-5 sm:pb-10"
      >
        <h2 className="text-2xl font-bold mb-4">Add Department</h2>
        <div className="h-[100%] overflow-y-scroll overflow-x-hidden p-4 pb-14 sm:pb-6">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-1">
              <label htmlFor="name" className="text-sm font-medium">
                Department Name
              </label>
              <input
                id="name"
                name="name"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border border-gray-300 rounded-lg py-1 px-3"
                rows="3"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="head" className="text-sm font-medium">
                Department Head
              </label>
              <select
                id="head"
                name="head"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.head?._id || ""} // ✅ handle selected value by _id
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedEmp = employees.find(
                    (emp) => emp._id === selectedId
                  );
                  setForm({
                    ...form,
                    head: selectedEmp || null, // ✅ store full object if you want
                  });
                }}
                required
              >
                <option value="">Select Head</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.fullName}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Section */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium">Budget Allocated</label>
                <input
                  name="budgetAllocated"
                  type="number"
                  className="border border-gray-300 rounded-lg py-2 px-3"
                  value={form.budgetAllocated}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium">Budget Spent</label>
                <input
                  name="budgetSpent"
                  type="number"
                  className="border border-gray-300 rounded-lg py-2 px-3"
                  value={form.budgetSpent}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium">Currency</label>
                <select
                  name="budgetCurrency"
                  className="border border-gray-300 rounded-lg py-2 px-3"
                  value={form.budgetCurrency}
                  onChange={handleChange}
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>

            {/* Location Section */}
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              {[
                { id: "locationOffice", label: "Office" },
                { id: "locationCity", label: "City" },
                { id: "locationState", label: "State" },
                { id: "locationCountry", label: "Country" },
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
                    className="border border-gray-300 rounded-lg py-2 px-3"
                    value={form[field.id]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="border border-gray-300 rounded-lg py-2 px-3"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};
