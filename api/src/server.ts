import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { router } from './router'

const port = 3000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(router)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
