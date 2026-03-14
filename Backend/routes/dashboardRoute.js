const express = require("express");
const route = express.Router()
const DeptModel = require("../models/Department");
const { EmpModel } = require("../models/EmpModel");
const SalaryModel = require('../models/SalaryModel')

// 0. Show all Departmentsla tha 
route.get("/", async (req, res) => {
    try {

        const now = new Date();

        const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));

        const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1 + 1, 0, 23, 59, 59, 999));
        console.log(startOfMonth, endOfMonth);


        const employees = await EmpModel.countDocuments()
        const departments = await DeptModel.countDocuments()
        const salariesThisMonth = await SalaryModel.find({
            "salary.lastProccessedMonth": { $gte: startOfMonth, $lte: endOfMonth },
        })
        const totalSalaryPaidThisMonth = salariesThisMonth.reduce(
            (sum, record) => sum + (record.salary?.lastProccessed || 0),
            0
        );

        res.status(200).json({ employees, departments, totalSalaryPaidThisMonth });

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Internal server error." });
    }
})

module.exports = route
