import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DepartmentDetail() {
  const initialData = {
    name: "",
    description: "",
    head: null,
    budget: {
      allocated: 0, // yearly budget
      spent: 0, // money used
      currency: "INR",
    },
    location: {
      office: "", // e.g., "Building A, 2nd Floor"
      city: "",
      state: "",
      country: "India",
    },
    projects: [],
    goals: [],
    employees: [],
    policies: [],
    performance: {
      rating: "",
      kpis: [],
      lastReviewed: "",
    },

    createdAt: "",
    status: "Active",
  };
  const [updateDeptModel, setUpdateDeptModel] = useState(false);
  const [department, setDepartment] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/department/details/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch department");
        return res.json();
      })
      .then((data) => {
        if (data) {
          setDepartment(data);
        } else {
          setDepartment(initialData);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/allEmployees`)
      .then((res) => res.json())
      .then((data) => {
        if (data.emps) setEmployees(data.emps);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleDelete() {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/department/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          navigate("/departments");
          setResponse({ success: true, msg: "Deletion Successful." });
        } else {
          setResponse({ success: false, msg: "Deletion Unsuccessful!" });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setResponse(null);
        }, 2000);
      });
  }
  if (loading || department == null) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-white rounded-lg ">
        <div className="animate-spin border-4 border-blue-200 border-t-transparent rounded-full w-12 h-12"></div>
      </div>
    );
  }
  return (
    <div className="bg-white p-8 w-full min-h-60 rounded-xl md:px-20 py-8">
      {/* Card Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-400">
          {(() => {
            const names = department.name?.trim().split(" ") || [];
            const first = names[0] ? names[0][0] : "";
            const last = names.length > 1 ? names[names.length - 1][0] : "";
            return (first + last).toUpperCase();
          })()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-700">
            {department.name ?? "Department Name"}
          </h2>
          <span className="block text-sm text-gray-500">
            {department.description ?? ""}
          </span>
        </div>
        <span
          className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold
            ${
              department.status === "Active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
        >
          {department.status}
        </span>
      </div>

      {/* Department Head */}
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-700 mb-1">
          Department Head
        </h3>
        {department.head && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-400">
              {(() => {
                const fullName =
                  department.head &&
                  typeof department.head.fullName === "string"
                    ? department.head.fullName.trim()
                    : "";
                if (!fullName) return "";
                const names = fullName.split(" ");
                const first = names[0] ? names[0][0] : "";
                const last = names.length > 1 ? names[names.length - 1][0] : "";
                return (first + last).toUpperCase();
              })()}
            </div>
            <div>
              <span className="font-medium text-blue-700">
                {department.head.fullName}
              </span>
              <span className="block text-gray-500">
                {department.head.designation}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Employees */}
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-700 mb-1">
          Team Members
        </h3>
        <ul className="list-disc pl-6 text-gray-700">
          {department.employees?.length > 0 ? (
            department.employees.map((emp) => (
              <li key={emp._id}>
                {emp.fullName} ({emp.designation})
              </li>
            ))
          ) : (
            <li className="text-gray-400">No employees listed</li>
          )}
        </ul>
      </div>

      {/* Budget */}
      <div className="mb-4 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-gray-700 mb-1">Budget</h3>
        <span>
          Allocated:{" "}
          <span className="font-bold">
            {department.budget?.allocated?.toLocaleString()}{" "}
            {department.budget?.currency}
          </span>
        </span>
        <br />
        <span>
          Spent:{" "}
          <span className="font-bold">
            {department.budget?.spent?.toLocaleString()}{" "}
            {department.budget?.currency}
          </span>
        </span>
      </div>

      {/* Location */}
      <div className="mb-4 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-gray-700 mb-1">Location</h3>
        <div className="text-gray-600">
          {department.location?.office}, {department.location?.city},{" "}
          {department.location?.state} - {department.location?.country}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-4 bg-white">
        <h3 className="text-md font-semibold text-gray-700 mb-1">Projects</h3>
        <ul className="list-disc pl-6">
          {department.projects?.length > 0 ? (
            department.projects.map((proj, i) => (
              <li key={i}>
                <span className="font-bold">{proj.name}:</span> {proj.status},{" "}
                {proj.startDate
                  ? new Date(proj.startDate).toLocaleDateString()
                  : ""}{" "}
                -{" "}
                {proj.endDate
                  ? new Date(proj.endDate).toLocaleDateString()
                  : ""}
                <div className="text-gray-500">{proj.description}</div>
              </li>
            ))
          ) : (
            <li className="text-gray-400">No projects listed</li>
          )}
        </ul>
      </div>

      {/* Goals */}
      <div className="mb-4 bg-white">
        <h3 className="text-md font-semibold text-gray-700 mb-1">Goals</h3>
        <ul className="list-disc pl-6">
          {department.goals?.length > 0 ? (
            department.goals.map((goal, i) => (
              <li key={i}>
                <span className="font-bold">{goal.title}</span> (deadline:{" "}
                {goal.deadline
                  ? new Date(goal.deadline).toLocaleDateString()
                  : "—"}
                , status: {goal.achieved ? "Achieved" : "Pending"})
              </li>
            ))
          ) : (
            <li className="text-gray-400">No goals set</li>
          )}
        </ul>
      </div>

      {/* Policies */}
      <div className="mb-4 bg-white">
        <h3 className="text-md font-semibold text-gray-700 mb-1">Policies</h3>
        <ul className="list-disc pl-6">
          {department.policies?.length > 0 ? (
            department.policies.map((pol, i) => (
              <li key={i}>
                <span className="font-bold">{pol.title}</span>:{" "}
                {pol.description} (from{" "}
                {pol.effectiveFrom
                  ? new Date(pol.effectiveFrom).toLocaleDateString()
                  : "—"}
                )
              </li>
            ))
          ) : (
            <li className="text-gray-400">No policies listed</li>
          )}
        </ul>
      </div>

      {/* Performance */}
      <div className="mb-4 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-md font-semibold text-gray-700 mb-1">
          Performance
        </h3>
        <div>
          <span className="block">
            Rating:{" "}
            <span className="font-bold">
              {department.performance?.rating}/5
            </span>
            , last reviewed:{" "}
            {department.performance?.lastReviewed
              ? new Date(
                  department.performance.lastReviewed
                ).toLocaleDateString()
              : "—"}
          </span>
          <div>
            KPIs:
            <ul className="list-disc pl-6">
              {department.performance?.kpis?.length > 0 ? (
                department.performance.kpis.map((kpi, i) => (
                  <li key={i}>
                    {kpi.name}: <span className="font-bold">{kpi.score}</span>{" "}
                    (target: {kpi.target})
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No KPIs listed</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Created At */}
      <div className="mt-8 text-xs text-gray-400">
        Created:{" "}
        {department.createdAt
          ? new Date(department.createdAt).toLocaleDateString()
          : "—"}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => {
            setUpdateDeptModel(true);
          }}
          className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-bold shadow hover:bg-red-600"
        >
          Remove
        </button>
        {
          <UpdateDepartmentModal
            initialData={department}
            open={updateDeptModel}
            onClose={setUpdateDeptModel}
            onUpdate={setDepartment}
            setResponse={setResponse}
          />
        }
      </div>
      {response && (
        <div className="fixed top-20 right-8 bg-gray-800 p-4 rounded shadow-lg">
          <p className={response.success ? "text-green-500" : "text-red-500"}>
            {response.msg || "Default Message"}
          </p>
        </div>
      )}
    </div>
  );
}

// ========================================================================

export const UpdateDepartmentModal = ({
  initialData,
  open,
  onClose,
  onUpdate,
  setResponse,
}) => {
  const initialForm = {
    name: initialData.name || "",
    description: initialData.description || "",
    head: initialData.head || "",
    budgetAllocated: initialData.budget?.allocated ?? 0,
    budgetSpent: initialData.budget?.spent ?? 0,
    budgetCurrency: initialData.budget?.currency || "INR",
    office: initialData.location?.office || "",
    city: initialData.location?.city || "",
    state: initialData.location?.state || "",
    country: initialData.location?.country || "India",
    status: initialData.status || "Active",
    projects: initialData.projects || [],
    goals: initialData.goals || [],
    policies: initialData.policies || [],
    id: initialData._id || "",
  };

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [objComp, setObjComp] = useState(true);
  const formRef = useRef(null);
  const [employees, setEmployees] = useState([]);

  // Keep form in sync on modal open
  useEffect(() => {
    setForm({
      name: initialData.name || "",
      description: initialData.description || "",
      head: initialData.head || { _id: "" },
      teamMembers: initialData.employees || [],
      budgetAllocated: initialData.budget?.allocated ?? 0,
      budgetSpent: initialData.budget?.spent ?? 0,
      budgetCurrency: initialData.budget?.currency || "INR",
      office: initialData.location?.office || "",
      city: initialData.location?.city || "",
      state: initialData.location?.state || "",
      country: initialData.location?.country || "India",
      status: initialData.status || "Active",
      projects: initialData.projects || [],
      goals: initialData.goals || [],
      policies: initialData.policies || [],
      id: initialData._id || "",
    });
  }, [open, initialData]);

  // Deep compare function for update button
  function deepCompare(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;
    const keys1 = Object.getOwnPropertyNames(obj1);
    const keys2 = Object.getOwnPropertyNames(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!deepCompare(obj1[key], obj2[key])) return false;
    }
    return true;
  }

  // set form when new initial data came or vice verca
  useEffect(() => {
    setObjComp(deepCompare(initialForm, form));
  }, [form, initialData]);

  // fetch all employees for calculations
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/allEmployees`)
      .then((res) => res.json())
      .then((data) => {
        if (data.emps) setEmployees(data.emps);
      })
      .catch((err) => console.log(err));
  }, []);

  // Modal close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Field change handler
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Add/remove for arrays (basic convenience functions)
  function handleAddArray(type) {
    setForm((prev) => ({
      ...prev,
      [type]: [
        ...prev[type],
        { title: "", description: "", status: "Planned" },
      ],
    }));
  }
  function handleRemoveArray(type, idx) {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== idx),
    }));
  }
  function handleArrayChange(type, idx, field, value) {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type].map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      ),
    }));
  }
  // =======================================================================

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setFilteredEmployees(
      (employees || []).filter(
        (emp) =>
          (!emp.department || emp.department._id === form.id) &&
          emp._id !== form.head?._id
      )
    );
    setForm((prev) => {
      const exists = prev.teamMembers.some(
        (member) => member._id === form.head._id
      );
      let updatedMembers;
      if (exists) {
        updatedMembers = prev.teamMembers.filter(
          (member) => member._id !== form.head._id
        );
      } else {
        updatedMembers = [...prev.teamMembers, form.head];
      }
      return { ...prev, teamMembers: updatedMembers };
    });
  }, [employees, form.id, form.head]);

  // Handle checkbox toggle
  function handleToggle(emp) {
    setForm((prev) => {
      const exists = prev.teamMembers.some((member) => member._id === emp._id);
      let updatedMembers;
      if (exists) {
        updatedMembers = prev.teamMembers.filter(
          (member) => member._id !== emp._id
        );
      } else {
        updatedMembers = [...prev.teamMembers, emp];
      }
      return { ...prev, teamMembers: updatedMembers };
    });
  }

  // =======================================================================

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // Collect head data from id, optionally expand as needed
    const depData = {
      name: form.name,
      description: form.description,
      head: form.head, // send id, backend should validate/expand
      budget: {
        allocated: Number(form.budgetAllocated),
        spent: Number(form.budgetSpent),
        currency: form.budgetCurrency,
      },
      location: {
        office: form.office,
        city: form.city,
        state: form.state,
        country: form.country,
      },
      employees: form.teamMembers,
      status: form.status,
      projects: form.projects,
      goals: form.goals,
      policies: form.policies,
    };
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/department/update/${form.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(depData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.department) {
          onUpdate(data.department);
          onClose(false);
          setResponse({ success: true, msg: data.message });
        } else {
          setResponse({ success: false, msg: data.message || "Update failed" });
        }
      })
      .catch((err) => {
        setResponse({
          success: false,
          msg: "Something went wrong. Try again!",
        });
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setResponse(null), 2000);
      });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div
        ref={formRef}
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-xl w-full overflow-y-hidden h-screen sm:max-h-[90vh] pt-12 sm:pt-5 sm:pb-10"
      >
        <h2 className="text-2xl font-bold mb-4">Update Department</h2>
        <form
          className="grid gap-4 overflow-y-scroll h-full pb-16"
          onSubmit={handleSubmit}
        >
          {/* Name/Desc */}
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
            <input
              id="description"
              name="description"
              className="border border-gray-300 rounded-lg py-1 px-3"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          {/* Head */}
          <div className="grid gap-1">
            <label htmlFor="head" className="text-sm font-medium">
              Department Head
            </label>
            <select
              id="head"
              name="head"
              value={form.head?._id}
              className="border border-gray-300 rounded-lg py-1 px-3"
              required
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
            >
              <option value="">Select Head</option>
              {employees
                .filter(
                  (emp) =>
                    emp.department == null ||
                    emp.department == "" ||
                    emp.department._id == form.id
                )
                .map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.fullName}
                  </option>
                ))}
            </select>
          </div>
          {/* Team Members */}
          <div className="grid gap-1">
            <label htmlFor="name" className="text-sm font-medium">
              Team Members
            </label>
            <div className="overflow-y-auto border border-gray-300 rounded p-2">
              {filteredEmployees.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No employees available for selection
                </p>
              )}
              {filteredEmployees.map((emp) => (
                <label
                  key={emp._id}
                  className="flex items-center gap-2 mb-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.teamMembers.some(
                      (member) => member._id === emp._id
                    )}
                    onChange={() => handleToggle(emp)}
                    className="cursor-pointer"
                  />
                  <span>{emp.fullName}</span>
                </label>
              ))}
            </div>
          </div>
          {/* Budget */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="budgetAllocated" className="text-sm font-medium">
                Allocated
              </label>
              <input
                id="budgetAllocated"
                name="budgetAllocated"
                type="number"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.budgetAllocated}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="budgetSpent" className="text-sm font-medium">
                Spent
              </label>
              <input
                id="budgetSpent"
                name="budgetSpent"
                type="number"
                className="border border-gray-300 rounded-lg py-1 px-3 "
                value={form.budgetSpent}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="budgetCurrency" className="text-sm font-medium">
                Currency
              </label>
              <input
                id="budgetCurrency"
                name="budgetCurrency"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.budgetCurrency}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Location */}
          <div className="grid md:grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label htmlFor="office" className="text-sm font-medium">
                Office
              </label>
              <input
                id="office"
                name="office"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.office}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <input
                id="city"
                name="city"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.city}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="state" className="text-sm font-medium">
                State
              </label>
              <input
                id="state"
                name="state"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.state}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="text-sm font-medium">
                Country
              </label>
              <input
                id="country"
                name="country"
                className="border border-gray-300 rounded-lg py-1 px-3"
                value={form.country}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
          {/* Status */}
          <div className="flex flex-col">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="border border-gray-300 rounded-lg py-1 px-3"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {/* Projects Section (simplified) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Projects</label>
              <button
                type="button"
                className="bg-blue-100 px-2 py-1 rounded text-xs"
                onClick={() => handleAddArray("projects")}
              >
                Add Project
              </button>
            </div>
            {form.projects.map((proj, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-2 mb-1">
                <input
                  value={proj.name}
                  onChange={(e) =>
                    handleArrayChange("projects", idx, "name", e.target.value)
                  }
                  placeholder="Project Name"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                />
                <input
                  value={proj.description}
                  onChange={(e) =>
                    handleArrayChange(
                      "projects",
                      idx,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Description"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                />
                <select
                  value={proj.status}
                  onChange={(e) =>
                    handleArrayChange("projects", idx, "status", e.target.value)
                  }
                  className="border border-gray-300 rounded-lg py-1 px-3 col-span-2"
                >
                  <option value="Planned">Planned</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
                <button
                  type="button"
                  className="bg-red-100 text-xs px-2 py-2 rounded col-span-2"
                  onClick={() => handleRemoveArray("projects", idx)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {/* Goals Section (simplified) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Goals</label>
              <button
                type="button"
                className="bg-blue-100 px-2 py-1 rounded text-xs"
                onClick={() => handleAddArray("goals")}
              >
                Add Goal
              </button>
            </div>
            {form.goals.map((goal, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-2 mb-1">
                <input
                  value={goal.title}
                  onChange={(e) =>
                    handleArrayChange("goals", idx, "title", e.target.value)
                  }
                  placeholder="Goal Title"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                />
                <input
                  value={goal.deadline}
                  onChange={(e) =>
                    handleArrayChange("goals", idx, "deadline", e.target.value)
                  }
                  type="date"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                />
                <select
                  value={goal.achieved ? "Achieved" : "Pending"}
                  onChange={(e) =>
                    handleArrayChange(
                      "goals",
                      idx,
                      "achieved",
                      e.target.value === "Achieved"
                    )
                  }
                  className="border border-gray-300 rounded-lg py-1 px-3 col-span-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Achieved">Achieved</option>
                </select>
                <button
                  type="button"
                  className="bg-red-100 text-xs px-2 py-2 rounded col-span-2"
                  onClick={() => handleRemoveArray("goals", idx)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {/* Policies Section (simplified) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium">Policies</label>
              <button
                type="button"
                className="bg-blue-100 px-2 py-1 rounded text-xs"
                onClick={() => handleAddArray("policies")}
              >
                Add Policy
              </button>
            </div>
            {form.policies.map((pol, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-2 mb-1">
                <input
                  value={pol.title}
                  onChange={(e) =>
                    handleArrayChange("policies", idx, "title", e.target.value)
                  }
                  placeholder="Policy Title"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                />
                <input
                  value={pol.effectiveFrom}
                  onChange={(e) =>
                    handleArrayChange(
                      "policies",
                      idx,
                      "effectiveFrom",
                      e.target.value
                    )
                  }
                  type="date"
                  className="border border-gray-300 rounded-lg py-1 px-3"
                />
                <input
                  value={pol.description}
                  onChange={(e) =>
                    handleArrayChange(
                      "policies",
                      idx,
                      "description",
                      e.target.value
                    )
                  }
                  placeholder="Description"
                  className="border border-gray-300 rounded-lg py-1 px-3 col-span-2"
                />
                <button
                  type="button"
                  className="bg-red-100 text-xs px-2 py-2 rounded col-span-2"
                  onClick={() => handleRemoveArray("policies", idx)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          {/* Submit/Cancel */}
          <div className="flex gap-2 mt-6">
            <button
              type="submit"
              disabled={objComp}
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800 disabled:bg-blue-300 transition-colors flex-1"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => onClose(false)}
              className="bg-red-500 p-2 rounded text-white flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/70 bg-opacity-60 z-50">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};
