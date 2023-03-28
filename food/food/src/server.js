require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const router = require('./routes')
const fileupload = require("express-fileupload")
const PORT = process.env.PORT || 5000

const app = express()


app.use(fileupload())
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))
app.use(router)


const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()