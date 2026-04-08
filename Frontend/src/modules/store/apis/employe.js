export const initialDataForAddEmp = {
    id: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    department: null,
    designation: "",
    salaryBasic: "",
    salaryBonus: "",
    bankName: "",
    bankIFSC: "",
    bankAccount: "",
    leavesTotal: 24,
    leavesTaken: 0,
    status: "Active",
    addressLine1: "",
    addressLine2: "",
    addressCity: "",
    addressState: "",
    addressPostalCode: "",
    addressCountry: "India",
    hireDate: "",
};
export const initialDataForDetail = {
    salary: {
        basic: 0,
        bonus: 0,
        currency: "INR",
    },
    leaves: {
        totalLeaves: 0,
        leavesTaken: 0,
        leavesRemaining: 0,
    },
    address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
    },
    _id: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    department: null,
    designation: "",
    hireDate: "",
    status: "",
    __v: 0,
};
export const designations = [
    { _id: 1, name: "Manager" },
    { _id: 2, name: "Senior Manager" },
    { _id: 3, name: "Assistant Manager" },
    { _id: 4, name: "Software Engineer" },
    { _id: 5, name: "Sales Executive" },
    { _id: 6, name: "HR Specialist" },
    { _id: 7, name: "Accountant" },
    { _id: 8, name: "Intern" },
    { _id: 9, name: "Team Lead" },
    { _id: 10, name: "Director" },
];

export const defaultForm = (initialData) => {
    return {
        fullName: initialData.fullName,
        email: initialData.email,
        phone: initialData.phone,
        dob: initialData.dob,
        department: initialData.department,
        designation: initialData.designation,
        hireDate: initialData.hireDate,
        status: initialData.status,
        salaryBasic: initialData.salary.basic,
        salaryBonus: initialData.salary.bonus,
        bankName: initialData.bank.name,
        bankIFSC: initialData.bank.ifsc,
        bankAccount: initialData.bank.account,
        leavesTotal: initialData.leaves.totalLeaves,
        leavesTaken: initialData.leaves.leavesTaken,
        addressLine1: initialData.address.line1,
        addressLine2: initialData.address.line2,
        addressCity: initialData.address.city,
        addressState: initialData.address.state,
        addressPostalCode: initialData.address.postalCode,
        addressCountry: initialData.address.country,
        id: initialData._id,
    };
}
export const updatedEmployee = (initialData, form) => {
    return {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        dob: form.dob,
        department: form.department,
        designation: form.designation,
        hireDate: form.hireDate,
        salary: {
            basic: Number(form.salaryBasic),
            bonus: Number(form.salaryBonus),
            allowance: initialData.salary.allowance,
            currency: "INR",
            proccessed: initialData.salary.proccessed,
            due: initialData.salary.due,
            lastProccessed: initialData.lastProccessed,
            lastDue: initialData.salary.lastDue,
            lastProcessedMonth: initialData.salary.lastProcessedMonth,
            deduction: {
                epf: 2000,
                healthInsurance: 1000,
                professionalInsurance: 1000,
                tds: (Number(form.salaryBasic) * 0.03).toFixed(2),
            },
        },
        bank: {
            name: form.bankName,
            ifsc: form.bankIFSC,
            account: form.bankAccount,
        },
        leaves: {
            totalLeaves: Number(form.leavesTotal),
            leavesTaken: Number(form.leavesTaken),
            leavesRemaining: Number(form.leavesTotal) - Number(form.leavesTaken),
        },
        status: form.status,
        address: {
            line1: form.addressLine1,
            line2: form.addressLine2,
            city: form.addressCity,
            state: form.addressState,
            postalCode: form.addressPostalCode,
            country: form.addressCountry,
        },
    };
}
export function handleChange(e, setForm) {
    setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
    }));
}

export const fetchEmployees = (setEmplist) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/allEmployees`, {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.emps) {
                setEmplist(data.emps);
            } else {
                setEmplist([]);
            }
        })
        .catch((err) => console.log(err));
}

export const fetchDepartments = (setDepartments) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/department/`)
        .then((res) => res.json())
        .then((data) => {
            if (data.departments) setDepartments(data.departments);
            else {
                setDepartments([]);
            }
        })
        .catch((err) => console.log(err));
}

export const addEmployee = (
    form,
    setLoading,
    onAdd,
    setForm,
    onClose,
    setResponse
) => {
    setLoading(true);

    // Compose salary, leaves, address objects
    const empData = {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        dob: form.dob,
        // dob: form.dob || defaultDate,
        department: form.department,
        designation: form.designation,
        hireDate: form.hireDate,
        // hireDate: form.hireDate || today,
        salary: {
            basic: Number(form.salaryBasic),
            bonus: Number(form.salaryBonus),
            allowance: {
                houseRentAllowances: 10000,
                conveyanceAllowances: 4000,
                medicalAllowances: 5000,
                specialAllowances: 1000,
            },
            currency: "INR",
            proccessed: 0,
            due: 0,
            lastProccessed: 0,
            lastDue: 0,
            lastProcessedMonth: new Date().toISOString().replace("Z", "+00:00"),
            deduction: {
                epf: 2000,
                healthInsurance: 1000,
                professionalInsurance: 1000,
                tds: (Number(form.salaryBasic) * 0.03).toFixed(2),
            },
        },
        bank: {
            name: form.bankName,
            ifsc: form.bankIFSC,
            account: form.bankAccount,
        },
        leaves: {
            totalLeaves: Number(form.leavesTotal),
            leavesTaken: Number(form.leavesTaken),
            leavesRemaining: Number(form.leavesTotal) - Number(form.leavesTaken),
        },
        status: form.status,
        address: {
            line1: form.addressLine1,
            line2: form.addressLine2,
            city: form.addressCity,
            state: form.addressState,
            postalCode: form.addressPostalCode,
            country: form.addressCountry,
        },
    };

    // call api
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(empData),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.emps) {
                onAdd(data.emps);
                setForm(initialDataForAddEmp);
                onClose(false);
                setResponse({ success: true, msg: data.message });
            } else {
                setResponse({ success: false, msg: data.message });
            }
        })
        .catch((err) => {
            alert(err)
            console.error(err)
        })
        .finally(() => {
            setTimeout(() => {
                setLoading(false);
                setResponse(null);
            }, 2000);
        });
    // end api
}

export const fetchEmployeeDetail = (id, setEmployee) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/detail/${id}`)
        .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch employee");
            return res.json();
        })
        .then((data) => {
            if (data.emp) {
                setEmployee(data.emp);
            } else {
                setEmployee(initialDataForDetail);
            }
        })
        .catch((err) => console.error(err));
}

export function handleDelete(id, navigate, setResponse, setLoading) {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/${id}`, {
        method: "Delete",
    })
        .then((res) => {
            if (res.ok) {
                navigate("/employees");
                setResponse({
                    success: true,
                    msg: "Deletion Complete Successfully.",
                });
            } else {
                setResponse({ success: true, msg: "Deletion Unsuccessful!" });
            }
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            setTimeout(() => {
                setResponse(null);
                setLoading(false);
            }, 2000);
        });
}

export const calculateDateBound = (form, setForm, setDOB, setHireDate) => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    // --- DOB bounds ---
    const minDob = new Date();
    minDob.setFullYear(today.getFullYear() - 100);

    const maxDob = new Date();
    maxDob.setFullYear(today.getFullYear() - 18);

    // --- HIRE DATE bounds ---
    let minHire = "";
    let maxHire = formattedToday;

    if (form.dob) {
        const dobDate = new Date(form.dob);

        // Minimum hire date = DOB + 18 years
        const dobPlus18 = new Date(dobDate);
        dobPlus18.setFullYear(dobPlus18.getFullYear() + 18);

        minHire = dobPlus18.toISOString().split("T")[0];

        // If hireDate is before dob+18, reset it
        if (form.hireDate && new Date(form.hireDate) < dobPlus18) {
            setForm((prev) => ({ ...prev, hireDate: minHire }));
        }
    }

    if (form.hireDate) {
        const hireDate = new Date(form.hireDate);

        // DOB must be at least 18 years before hire date
        const hireMinus18 = new Date(hireDate);
        hireMinus18.setFullYear(hireMinus18.getFullYear() - 18);

        // Adjust DOB max bound dynamically
        setDOB({
            min: minDob.toISOString().split("T")[0],
            max: hireMinus18.toISOString().split("T")[0],
        });
    } else {
        setDOB({
            min: minDob.toISOString().split("T")[0],
            max: maxDob.toISOString().split("T")[0],
        });
    }

    setHireDate({ min: minHire, max: maxHire });
}


export function formatDateForInput(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function updateEmployee(e, initialData, form, onUpdate, onClose, setResponse, setLoading) {
    e.preventDefault();
    setLoading(true);
    // Compose salary, leaves, address objects
    const empData = updatedEmployee(initialData, form)

    // call api
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/update/${form.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(empData),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.emp) {
                onUpdate(data.emp);
                onClose(false);
                setResponse({ success: true, msg: data.message });
            } else {
                setResponse({ success: false, msg: data.message || "Update failed" });
            }
        })
        .catch((err) => {
            console.error(err);
            setResponse({
                success: false,
                msg: "Something went wrong. Try again!",
            });
        })
        .finally(() => {
            setLoading(false);
            setTimeout(() => setResponse(null), 2000);
        });

    // end api
}

export function deepCompare(obj1, obj2) {
    if (obj1 === obj2) return true; // same reference or primitive value

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