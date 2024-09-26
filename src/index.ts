import exp, { Express } from 'express'
import beeferControllers from './controllers/beeferControllers'
import personControllers from './controllers/personController'
import 'dotenv/config'


const app: Express = exp()
app.use(exp.json());
app.use('/api/beepers', beeferControllers)
app.use('/api/persons', personControllers)

app.listen(process.env.PORT, ():void => console.log(`See you at http::localhost:${process.env.PORT}`))