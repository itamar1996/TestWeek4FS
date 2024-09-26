import exp, { Express } from 'express'
import beeferControllers from './controllers/beeferControllers'
import 'dotenv/config'


const app: Express = exp()
app.use(exp.json());
app.use('/api/beepers', beeferControllers)

app.listen(process.env.PORT, ():void => console.log(`See you at http::localhost:${process.env.PORT}`))