import express from 'express'
import http from 'http'
import cors from 'cors'
import path from 'path'
import * as models from './models'
import db from './db/db'

import r_users from './routes/users'
import r_posts from './routes/posts'
import r_comments from './routes/comments'

import c_users from './controllers/users'

const app = express()
const server = http.createServer(app)
const publicPath = path.join(__dirname, '../public')
// const corsOptions = {
//     origin: 'http://127.0.0.1:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

db.sync().then(() => {
    c_users.initAdmin()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(publicPath))
app.use(cors())

app.use('/users', r_users)
app.use('/posts', r_posts)
app.use('/comments', r_comments)


app.get('/', (req, res) => res.send({ welcome: 'home' }))
app.post('/login', c_users.login)
app.get('/logout', c_users.logout)

export {
    app, server
}
