const express = require('express') 
const http = require('http') 
const cors = require('cors') 
const path = require('path') 

const r_users = require('./routes/users') 
const r_posts = require('./routes/posts') 
const r_comments = require('./routes/comments') 

const c_users = require('./controllers/users')

const app = express()
const server = http.createServer(app)
const publicPath = path.join(__dirname, '../public')
// const corsOptions = {
//     origin: 'http://127.0.0.1:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }


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

module.exports = {
    app, server
}