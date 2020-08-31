const {server} = require('./app')

server.listen(process.env.PORT || 3001, () => console.log('listening....'))