import express, { Application } from 'express'
import 'express-async-errors'
import { handleErros } from './errors'
import { categoriesRoutes } from './routes/categories/categories.routes'
import { loginRoutes } from './routes/login/login.routes'
import { realEstatesRoutes } from './routes/realEstate/realEstate.routes'
import { schedulesRoutes } from './routes/schedules/schedules.routes'
import { usersRoutes } from './routes/users/users.routes'

const app: Application = express()

app.use(express.json())

app.use('/users', usersRoutes)
app.use('/login', loginRoutes)
app.use('/categories', categoriesRoutes)
app.use('/realEstate', realEstatesRoutes)
app.use('/schedules', schedulesRoutes)

app.use(handleErros)

export default app