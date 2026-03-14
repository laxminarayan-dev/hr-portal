import { useRef, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import EmployeeDetailTable from "../../lib/tables/EmployeeDetailTable";
import AddEmployeeModal from "./AddEmployee";
import { fetchEmployees } from "../../store/apis/employe";

const Employees = () => {
  const [emplist, setEmplist] = useState(null);
  const [addEmpModel, setAddEmpModel] = useState(false);
  const [response, setResponse] = useState(null);
  useEffect(() => {
    fetchEmployees(setEmplist);
  }, []);

  return (
    <div className="p-8">
      {/* Employee management content goes here */}

      <div className="flex items-center justify-between mb-10 ">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <button
          type="button"
          onClick={() => setAddEmpModel(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          <Plus />
          Add Employee
        </button>
      </div>
      {emplist == null ? (
        <div className="w-full h-90 flex justify-center items-center">
          <div className="animate-spin border border-b-white border-l-0 w-10 h-10 rounded-full"></div>
        </div>
      ) : emplist.length == 0 ? (
        <div>
          <h1>No Employee found!</h1>
        </div>
      ) : (
        emplist.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm max-w-8xl mx-auto">
            <EmployeeDetailTable tableData={emplist} />
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
        <AddEmployeeModal
          open={addEmpModel}
          onClose={setAddEmpModel}
          onAdd={setEmplist}
          setResponse={setResponse}
        />
      }
    </div>
  );
};

export default Employees;
