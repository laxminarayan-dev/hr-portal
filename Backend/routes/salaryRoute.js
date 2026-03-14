const express = require("express");
const route = express.Router()
const mongoose = require("mongoose");
const SalaryModel = require("../models/SalaryModel");
const { EmpModel } = require("./../models/EmpModel")

route.get("/", async (req, res) => {
    try {
        const salaryEntries = await SalaryModel.find()

        if (salaryEntries == null || salaryEntries.length === 0) {
            res.status(404).json({
                "message": "no Salary Entry found!"
            })
        }
        else {
            res.status(200).json({
                "message": "Salary Entries found.",
                salaryEntries
            })
        }

    } catch (error) {
        console.error("Salary Entry load error:", error);
        res.status(500).json({ message: "Internal server error" });
    }


})

route.get("/detail/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const salaryEntry = await SalaryModel.findOne({ _id: id });
        if (!salaryEntry) {
            return res.status(404).json({ message: "no Salary Entry found" });
        }
        return res.status(200).json({ message: "Salary Entry found", salaryEntry });
    } catch (error) {
        console.error("Salary Entry load error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

route.post("/pay", async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { updatedEmp, paySlip } = req.body;

        // Update employee
        await EmpModel.findByIdAndUpdate(updatedEmp._id, updatedEmp, { session });

        // Add Pay Slip
        await SalaryModel.create([{ ...paySlip }], { session });

        await session.commitTransaction();

        res.status(200).send({
            success: true,
            message: "Salary processed successfully!",
        })
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({
            success: false,
            message: "Transaction failed!"
        })
    } finally {
        session.endSession();
    }

})

module.exports = route
