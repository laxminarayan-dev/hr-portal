export const fetchAdmins = (setUsers) => {
    fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/allUsers`,
        {
            method: "GET",
        }
    ).then((res) => {
        return res.json()

    }).then((data) => {
        if (data.users) {
            setUsers(data.users)
        } else {
            setUsers([])
        }
    })
}

export const deleteAdmin = (id, setResponse = () => { }, setUsers = () => { }) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`, {
        method: "Delete",
    })
        .then(async (res) => {
            const result = await res.json();
            if (res.ok) {
                setResponse({ success: true, msg: result.message });
                setUsers(result.remainingUser);
            } else {
                console.log(res);
                setResponse({ success: false, msg: result.message });
            }
        })
        .catch((err) => {
            console.log(err);
            setResponse({ success: false, msg: "Internal Server Error!" });
        })
        .finally(() => {
            setTimeout(() => {
                setResponse(null);
            }, 2000);
        });
};

// for adding admin
export const addAdmin = (
    admin,
    onAdd,
    setAdmin,
    onClose,
    setLoading,
    setResponse
) => {
    const updatedAdmin = { ...admin, isAdmin: true }; // ✅ FIX

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAdmin), // ✅ use updated object
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.users) {
                onAdd(data.users);
                setAdmin(null);
                onClose(false);
                setLoading(false);
                setResponse({ success: true, msg: data.message });
            } else {
                setResponse({ success: false, msg: data.message });
            }
        })
        .catch((err) => console.error(err))
        .finally(() => {
            setTimeout(() => {
                setResponse(null);
            }, 2000);
        });
};

// filtering only employees who aren't admin
export const isNotAdmin = (setEmployees) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/emp/allEmployees`)
        .then((res) => res.json())
        .then((data) => {
            const validEmployees = data.emps.filter(
                (emp) => emp.isAdmin == null || emp.isAdmin == false
            );
            if (data.emps) setEmployees(validEmployees);
        })
        .catch((err) => console.log(err));
};