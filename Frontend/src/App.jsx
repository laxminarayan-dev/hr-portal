import { Routes, Route } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

import Root from "./Root";
import AdminLogin from "./modules/components/auth/AdminLogin";
import ErrorPage from "./modules/sharedComponents/ErrorPage";
import Loading from "./modules/sharedComponents/Loading";
import Dashboard from "./modules/components/Dashboard";
import Employees from "./modules/components/employees/Employees";
import EmployeeDetail from "./modules/components/employees/EmployeeDetail";
import Department from "./modules/components/department/Department";
import DepartmentDetail from "./modules/components/department/DepartmentDetail";
import Leaves from "./modules/components/leaves/Leaves";
import Salary from "./modules/components/salary/Salary";
import Admin from "./modules/components/admin/Admin";
import SalaryPrint from "./modules/components/salary/SalaryPrint";

const App = () => {
  const [isloggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && token != "") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <Fragment>
      {isloggedIn === null ? (
        <Loading />
      ) : isloggedIn ? (
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employee/:id" element={<EmployeeDetail />} />
            <Route path="departments" element={<Department />} />
            <Route path="department/:id" element={<DepartmentDetail />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="salary" element={<Salary />} />
            <Route path="salaryPrint" element={<SalaryPrint />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      ) : (
        <AdminLogin setIsLoggedIn={setIsLoggedIn} />
      )}
    </Fragment>
  );
};
export default App;
