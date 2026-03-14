import CryptoJS from "crypto-js";
export const defaultFields = {
    earnings: [
        {
            label: "House Rent Allowances",
            key: "houseRentAllowances",
            amount: 9408,
        },
        {
            label: "Conveyance Allowances",
            key: "conveyanceAllowances",
            amount: 1493,
        },
        { label: "Medical Allowances", key: "medicalAllowances", amount: 1167 },
        { label: "Special Allowances", key: "specialAllowances", amount: 18732 },
    ],
    deductions: [
        { label: "EPF", key: "epf", amount: 1800 },
        { label: "Health Insurance", key: "healthInsurance", amount: 500 },
        { label: "Professional Tax", key: "professionalInsurance", amount: 200 },
        { label: "TDS", key: "tds", amount: "" },
    ],
}

export const calculatePendingSalary = (emp) => {
    const {
        conveyanceAllowances,
        houseRentAllowances,
        medicalAllowances,
        specialAllowances,
    } = emp.salary.allowance;

    const { epf, healthInsurance, professionalInsurance, tds } =
        emp.salary.deduction;
    const currentMonth = new Date().getMonth();
    const { basic, lastDue, lastProccessed } = emp.salary;
    let lastProccessedMonth = new Date(
        emp.salary?.lastProccessedMonth
    ).getMonth();

    let groccSalary =
        basic +
        conveyanceAllowances +
        houseRentAllowances +
        medicalAllowances +
        specialAllowances;
    let totalDeduction = epf + healthInsurance + professionalInsurance + tds;

    let netPayble = groccSalary - totalDeduction; //64500

    let totalDue = 0;

    if (!lastProccessedMonth) {
        lastProccessedMonth = new Date(emp.hireDate).getMonth();
    }

    if (lastProccessedMonth !== currentMonth) {
        // CASE 1: Same year (e.g., Feb -> Dec)
        if (currentMonth > lastProccessedMonth) {
            for (let m = lastProccessedMonth; m < currentMonth; m++) {
                totalDue += netPayble;
            }
        }
        // CASE 2: Year rollover (e.g., Nov -> Feb)
        else {
            // Process remaining months of last year
            for (let m = lastProccessedMonth; m < 12; m++) {
                totalDue += netPayble;
            }
            // Then months of new year
            for (let m = 1; m < currentMonth; m++) {
                totalDue += netPayble;
            }
        }
        totalDue += (lastDue - lastProccessed);
    } else if (lastProccessedMonth === currentMonth) {
        totalDue = lastDue - lastProccessed;
    }

    return totalDue;
}

export const fetchEmployee = async () => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/emp/allEmployees`,
            {
                method: "GET",
            }
        );
        if (res) {
            const data = await res.json();

            if (data.emps) {
                return data.emps;
            } else {
                return [];
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchPaySlips = async () => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/salary/`,
            {
                method: "GET",
            }
        );
        if (res) {
            const data = await res.json();

            if (data.salaryEntries) {
                return data.salaryEntries.reverse();
            } else {
                return [];
            }
        }
    } catch (error) {
        console.log(error);
    }
};

export const getData = async (setIsLoading, setEmployees, setPaySlips) => {
    setIsLoading(true);

    let data = null;
    let slips = null;

    try {
        data = await fetchEmployee();
    } catch (error) {
        console.log(error);
    }

    try {
        slips = await fetchPaySlips();
    } catch (error) {
        console.log(error);
    }

    if (data && data.length > 0 && slips && slips.length > 0) {
        setEmployees(data);
        setPaySlips(slips);
        setIsLoading(false);
    }
};

export const filterEmployeeWhithSalaryDues = (paySlips, setFilteredEntries, searchTerm) => {
    if (!paySlips) return;

    const filterData = paySlips.filter((entry) => {
        const searchMatch =
            entry?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        return searchMatch; // ✅ new filter condition
    });

    setFilteredEntries(filterData);
}

export const filterPaySlips = (emps, setFilteredEmployees, searchTerm) => {
    if (!emps) return;

    const filterData = emps.filter((emp) => {
        const searchMatch =
            emp?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const pendingSalary = calculatePendingSalary(emp);
        // --- hire date check ---
        const hireDate = new Date(emp.hireDate); // assuming `hireDate` field in employee
        const today = new Date();

        // difference in days
        const diffInDays = Math.floor((today - hireDate) / (1000 * 60 * 60 * 24));

        // include only if employee has worked for at least 30 days
        const workedMoreThan30Days = diffInDays >= 30;

        return (
            searchMatch && pendingSalary !== 0 && workedMoreThan30Days // ✅ new filter condition
        );
    });

    setFilteredEmployees(filterData);
}

export const paySalary = async (emps,
    newSalary,
    selectedEmp,
    setResponse,
    setShowPaySalaryModal,
    setNewSalary,
    setEmployees,
    setPaySlips,
    setIsLoading) => {
    if (!newSalary.proccessed) {
        alert("Please fill required fields");
        return;
    }
    const filterEmp = emps.filter((emp) => emp._id === selectedEmp)[0];
    const lastDue = calculatePendingSalary(filterEmp);
    const dueCalc = lastDue - newSalary.proccessed;

    const updatedEmp = {
        ...filterEmp,
        salary: {
            ...filterEmp.salary,
            lastDue: lastDue,
            due: 0,
            lastProccessedMonth: newSalary.lastProccessedMonth,
            lastProccessed: parseInt(newSalary.proccessed),
        },
    };

    const paySlip = {
        fullName: filterEmp.fullName,
        email: filterEmp.email,
        phone: filterEmp.phone,
        department: filterEmp.department,
        designation: filterEmp.designation,
        hireDate: filterEmp.hireDate,
        salary: {
            ...filterEmp.salary,
            bonusProccessed: newSalary.bonus,
            due: dueCalc,
            netPay: lastDue,
            proccessed: newSalary.proccessed,
        },
        bank: { ...filterEmp.bank },
    };

    try {
        const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/salary/pay`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ updatedEmp, paySlip }),
            }
        );
        const data = await res.json();

        if (data.success) {
            getData(setIsLoading, setEmployees, setPaySlips);
            setResponse({ success: true, msg: data.message });
        } else {
            setResponse({ success: false, msg: data.message });
        }
    } catch (error) {
        console.error(error);
        setResponse({ success: false, msg: "Something went wrong!" });
    } finally {
        setShowPaySalaryModal(false);

        setNewSalary({
            proccessed: "",
            bonus: "",
            currency: "INR",
            lastProccessedMonth: new Date().toISOString(), // this is here because this value go to default month selector
        });
        setTimeout(() => {
            setResponse(null);
        }, 2000);
    }
};

export const getMonthYear = (monthNumber, year) => {
    const date = new Date(year, monthNumber - 1); // months are 0-indexed
    const monthName = date.toLocaleString("default", { month: "short" });
    return `${monthName} ${year}`;
}

export const calcMonts = (emp) => {
    const currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    const { basic } = emp.salary;
    const {
        conveyanceAllowances,
        houseRentAllowances,
        medicalAllowances,
        specialAllowances,
    } = emp.salary.allowance;
    const { epf, healthInsurance, professionalInsurance, tds } =
        emp.salary.deduction;
    let lastProccessedMonth = new Date(
        emp.salary?.lastProccessedMonth
    ).getMonth();
    let lastProccessedYear = new Date(
        emp.salary?.lastProccessedMonth
    ).getFullYear();

    const monthsWithSalary = [];
    let groccSalary =
        basic +
        conveyanceAllowances +
        houseRentAllowances +
        medicalAllowances +
        specialAllowances;
    let totalDeduction = epf + healthInsurance + professionalInsurance + tds;

    let netPayble = groccSalary - totalDeduction;

    if (!lastProccessedMonth) {
        lastProccessedMonth = new Date(emp.hireDate).getMonth();
        lastProccessedYear = new Date(emp.hireDate).getFullYear();
    }
    // CASE 1: Same year (e.g., Feb -> Dec)

    if (currentMonth > lastProccessedMonth && currentYear == lastProccessedYear) {
        for (let m = lastProccessedMonth; m < currentMonth; m++) {
            monthsWithSalary.push({
                month: getMonthYear(m + 1, lastProccessedYear),
                salary: netPayble,
            });
        }
    }
    // CASE 2: Year rollover (e.g., Nov -> Feb)
    else if (currentYear !== lastProccessedYear) {
        for (let y = lastProccessedYear; y < currentYear; y++) {
            // Process remaining months of last year
            if (y == lastProccessedYear) {
                for (let m = lastProccessedMonth; m <= 12; m++) {
                    monthsWithSalary.push({
                        month: getMonthYear(m + 1, y),
                        salary: netPayble,
                    });
                }
            } else {
                for (let m = 1; m <= 12; m++) {
                    monthsWithSalary.push({
                        month: getMonthYear(m + 1, y),
                        salary: netPayble,
                    });
                }
            }
        }
        // Then months of new year
        for (let m = 1; m < currentMonth; m++) {
            monthsWithSalary.push({
                month: getMonthYear(m, currentYear),
                salary: netPayble,
            });
        }
    }

    return monthsWithSalary;
};
export const generateEmpId = (mongoId) => {
    const hash = CryptoJS.MD5(mongoId).toString();
    return "EMP" + hash.substring(0, 6).toUpperCase();
};

export function formatCurrency(value) {
    if (value == null || isNaN(value)) return "0";
    return Number(value).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0,
    });
}

export function calculateGrossSalary(emp) {
    if (!emp?.salary) return 0;
    const { allowance, basic } = emp.salary;
    return (
        (allowance?.houseRentAllowances || 0) +
        (allowance?.conveyanceAllowances || 0) +
        (allowance?.medicalAllowances || 0) +
        (allowance?.specialAllowances || 0) +
        (basic || 0)
    );
}

export function calculateTotalDeduction(emp) {
    if (!emp?.salary) return 0;
    const { deduction } = emp.salary;
    return (
        (deduction?.epf || 0) +
        (deduction?.healthInsurance || 0) +
        (deduction?.professionalInsurance || 0) +
        (deduction?.tds || 0)
    );
}

export function getProcessedMonth(emp) {
    const date = emp?.salary?.lastProccessedMonth
        ? new Date(emp.salary.lastProccessedMonth)
        : new Date(emp?.hireDate);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
}
