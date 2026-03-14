const express = require("express")
const app = express();
const PORT = 3003 || process.env.PORT
const cors = require("cors")
const dbConnection = require("./db/dbConnection")
const route = require("./routes/route")

// middlewares
app.use(cors()) // cross origin resource share
app.use(express.json()) // data only accessible in json format not any other 

// database connection
dbConnection()

// route
app.use("/", route);

// listen
app.listen(PORT, () => {
    console.log(`
==============================
server running on port ${PORT}
==============================
        `);
})
