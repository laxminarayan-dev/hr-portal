import { MyLineChart, MyPieChart, MyBarChart } from "../lib/MyChart";
import EmployeeActivityTable from "../lib/tables/EmployeeActivityTable";
import { useEffect, useState } from "react";
import { fetchInitialData, icon } from "../store/apis/dashboard";

const Dashboard = () => {
  const [dashboardDataValues, setDashboardDataValues] = useState({});
  const [dashboardData, setDashboardData] = useState({
    employees: {
      icon: "users",
      heading: "Total Employees",
      value: null,
      prefix: "",
    },
    departments: {
      icon: "building",
      heading: "Total Department",
      value: null,
      prefix: "",
    },
    salary: {
      icon: "banknote",
      heading: "Salary Processed This Month",
      value: null,
      prefix: "₹",
    },
  });
  useEffect(() => {
    fetchInitialData(setDashboardDataValues);
  }, []);

  return (
    <section className="max-w-7xl m-auto flex flex-col gap-5 px-10 py-8">
      <div>
        <h1 className="text-3xl font-semibold"> Dashboard</h1>
        <h2 className="text-md">
          Welcome back! Here's a summary of your HR metrics.
        </h2>
      </div>
      {/* overview section */}
      <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-5">
        {Object.keys(dashboardData).map((item, index) => {
          return (
            <div
              key={index}
              className="flex rounded-lg gap-2 shadow-sm py-2 px-4 bg-white border border-slate-200"
            >
              <div className="flex flex-col justify-center items-start flex-1">
                <span className="font-semibold text-xs line-clamp-1 ">
                  {dashboardData[item]["heading"]}
                </span>
                <span className="font-bold text-xl">
                  {dashboardData[item]["prefix"]}
                  {item == "salary"
                    ? dashboardDataValues["totalSalaryPaidThisMonth"]
                    : dashboardDataValues[item]}
                </span>
              </div>
              <div className="w-10 flex justify-end items-start text-gray-400">
                {icon[dashboardData[item]["icon"]]}
              </div>
            </div>
          );
        })}
      </div>
      {/* bar section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-1">
        <div className="bg-white py-3 px-5 border border-stone-100 rounded-md shadow-sm">
          <h1 className="font-bold text-2xl">Leave Trend</h1>
          <p className="text-sm mb-5">Monthly count of employees on leave.</p>
          <MyBarChart />
        </div>

        <div className="bg-white py-3 px-5 border border-stone-100 rounded-md shadow-sm">
          <h1 className="font-bold text-2xl">Hiring Flow</h1>
          <p className="text-sm mb-5">Monthly count of employees on leave.</p>
          <MyLineChart />
        </div>

        <div className="bg-white py-3 px-5 border border-stone-100 rounded-md shadow-sm">
          <h1 className="font-bold text-2xl">Department Strength</h1>
          <p className="text-sm mb-5">
            Employee distribution across departments.
          </p>
          <MyPieChart />
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
