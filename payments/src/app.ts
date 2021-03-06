import { addNewRoute } from './routes'
import { currentUser, errorHandler, NotFoundError } from '@ije-ticketapp/common'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express from 'express'
import 'express-async-errors'

const app = express()
app.set('trust proxy', true)
app.use(json())

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)

app.use(currentUser)

addNewRoute(app)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
