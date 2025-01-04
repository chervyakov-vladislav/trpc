import express from 'express'
import { applyTrpcToExpressApp } from './lib/trpc'
import { trpcRouter } from './router'
import cors from 'cors'

const expressApp = express()
expressApp.use(cors())
applyTrpcToExpressApp(expressApp, trpcRouter)

expressApp.listen(3000, () => {
  console.log('Server is running: http://localhost:3000/')
})
