import exp, { Express } from 'express'
// import authController from './controllers/authController'
// import userController from './controllers/userController'
// import postController from './controllers/postController'

// load enviroment variables
import 'dotenv/config'

const app: Express = exp()
app.use(exp.json());
// app.use('/auth', authController)
// app.use('/user', userController)
// app.use('/post', postController)

app.listen(process.env.PORT, ():void => console.log(`See you at http::localhost:${process.env.PORT}`))