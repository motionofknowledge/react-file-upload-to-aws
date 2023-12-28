import express from "express";
import dotenv from 'dotenv'
import Routes from "./server-route.js";
import cors from 'cors'

const app = express()

dotenv.config()

app.use(cors())

app.use('/', Routes)

const PORT = 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))