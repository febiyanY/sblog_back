const express = require('express')
const http = require('http')
const cors = require('cors')
const path = require('path')
const { sequelize: db } = require('./models/index')
const session = require('express-session')
const connect_session_sequelize = require('connect-session-sequelize')

const SequelizeStore = connect_session_sequelize(session.Store)

var SessionStore = new SequelizeStore({
    db: db
})

const r_users = require('./routes/users')
const r_posts = require('./routes/posts')
const r_comments = require('./routes/comments')

const c_users = require('./controllers/users')

const app = express()
const server = http.createServer(app)
const publicPath = path.join(__dirname, '../public')
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
    credentials: true
}
const sessConfig = {
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2,
    },
    store: SessionStore
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessConfig.cookie.secure = true // serve secure cookies
}


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(publicPath))
app.use(cors(corsOptions))
app.use(session(sessConfig))
SessionStore.sync()

app.use('/users', r_users)
app.use('/posts', r_posts)
app.use('/comments', r_comments)


app.get('/', (req, res) => res.send({ welcome: 'home' }))
app.post('/login', c_users.login)
app.get('/logout', c_users.logout)

module.exports = {
    app, server
}