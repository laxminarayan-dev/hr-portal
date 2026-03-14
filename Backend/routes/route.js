const express = require("express");
const route = express.Router()
const authRoute = require("./authRoute")
const userModel = require("../models/userModel")
const usersRoute = require("./usersRoute")
const empRoute = require("./empRoute")
const deptRoute = require("./deptRoute")
const salaryRoute = require("./salaryRoute")
const dashboardRoute = require('./dashboardRoute')

route.get("/api", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send({
            message: "Failed to Load User Data "
        })
    }
})
route.use("/api/auth", authRoute)
route.use("/api/users", usersRoute)
route.use("/api/emp", empRoute)
route.use("/api/department", deptRoute)
route.use("/api/salary", salaryRoute)
route.use("/api/dashboard", dashboardRoute)


route.use((req, res) => {
    res.status(404).send(`
        <div style=" height:95vh; display:flex; justify-content:center; align-items:center;">
        <h1>Page Not Found</h1>
        </div>
        `)
})
module.exports = route