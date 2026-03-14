import { useState, useEffect, Fragment } from "react";
import { Search, Plus } from "lucide-react";
import SalaryDuesTable from "../../lib/tables/SalaryDuesTable";
import SalaryProccessedTable from "../../lib/tables/SalaryProccessedTable";
import Loading from "../../sharedComponents/Loading";
import PaySalaryModel from "./PaySalary";
import {
  calculatePendingSalary,
  fetchEmployee,
  fetchPaySlips,
  getData,
  filterEmployeeWhithSalaryDues,
  filterPaySlips,
} from "../../store/apis/salary";

export default function Salary() {
  const [emps, setEmployees] = useState([]);
  const [paySlips, setPaySlips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [showPaySalaryModal, setShowPaySalaryModal] = useState(false);

  useEffect(() => {
    getData(setIsLoading, setEmployees, setPaySlips);
  }, []);

  useEffect(() => {
    filterEmployeeWhithSalaryDues(paySlips, setFilteredEntries, searchTerm);
  }, [paySlips, searchTerm]);

  useEffect(() => {
    filterPaySlips(emps, setFilteredEmployees, searchTerm);
  }, [emps, searchTerm]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Salary Management</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          onClick={() => setShowPaySalaryModal(true)}
        >
          <Plus size={18} />
          Pay Salary
        </button>
      </div>

      {!isLoading ? (
        <Fragment>
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="relative bg-slate-200 px-2 py-2 mx-auto w-60 rounded-full gap-4 flex h-14">
            <div
              className={`absolute w-28 h-10 bg-black rounded-full transition-transform duration-500 ease-in-out ${
                selectedTab === 0 ? "translate-x-0" : "translate-x-full"
              }`}
            ></div>
            <button
              onClick={() => {
                setSelectedTab(0);
                fetchEmployee();
              }}
              className={`${
                selectedTab == 0 && " text-white"
              } z-10 bg-transparent rounded-full w-28 h-10 text-center`}
            >
              Dues
            </button>
            <button
              onClick={() => {
                setSelectedTab(1);
                fetchPaySlips();
              }}
              className={`${
                selectedTab == 1 && "text-white"
              } z-10 bg-transparent  rounded-full w-28 h-10 text-center`}
            >
              Pay Slips
            </button>
          </div>
          {/*Tables */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm max-w-7xl mx-auto">
            {selectedTab == 0 ? (
              <SalaryDuesTable
                emps={filteredEmployees}
                calculatePendingSalary={calculatePendingSalary}
              />
            ) : (
              <SalaryProccessedTable
                ProccesedSalaryData={filteredEntries}
                calculatePendingSalary={calculatePendingSalary}
              />
            )}
          </div>
        </Fragment>
      ) : (
        <div className="w-full h-90 flex justify-center items-center">
          <div className="animate-spin border border-b-white border-l-0 w-10 h-10 rounded-full"></div>
        </div>
      )}

      {response && (
        <div className="fixed z-100 top-20 right-8 transform -translate-x-1 bg-gray-800 p-4 rounded shadow-lg">
          <p className={response.success ? "text-green-500" : "text-red-500"}>
            {response.msg || "Default Message"}
          </p>
        </div>
      )}

      {showPaySalaryModal && (
        <PaySalaryModel
          emps={filteredEmployees}
          setShowPaySalaryModal={setShowPaySalaryModal}
          setResponse={setResponse}
          setEmployees={setEmployees}
          setPaySlips={setPaySlips}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
}
