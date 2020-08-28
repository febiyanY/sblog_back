import {server} from './app'

server.listen(process.env.PORT || 3001, () => console.log('listening....'))