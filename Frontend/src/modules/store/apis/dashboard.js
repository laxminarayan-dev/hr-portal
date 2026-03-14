import { Users, Building, Banknote } from "lucide-react";
import React from "react";

export const icon = {
    users: React.createElement(Users, { size: 16 }),
    building: React.createElement(Building, { size: 16 }),
    banknote: React.createElement(Banknote, { size: 16 }),
};

export const fetchInitialData = (setDashboardDataValues) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard`, {
        method: "GET",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data) {
                setDashboardDataValues(data);
            } else {
                setDashboardDataValues([]);
            }
        })
        .catch((err) => console.log(err));
}