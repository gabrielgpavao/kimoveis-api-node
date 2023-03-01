import express, { Application } from 'express'
import 'express-async-errors'
import { handleErros } from './errors'

const app: Application = express()

app.use(express.json())

app.use(handleErros)

export default app