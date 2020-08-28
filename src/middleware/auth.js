import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const adminAuth = (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = decoded
        res.locals.user = decoded
        if(user.type !== 'admin'){
            throw {message : 'Unauthorized', status : 401}
        }
        // if(new Date(user.token_expire) < new Date()){
        //     throw {message : 'token expire', status : 400}
        // }
        next()
    }catch(e){  
        res.status(e.status ? e.status : 500).send(e)
    }
}
export const clientAuth = (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = decoded
        res.locals.user = user
        if(new Date(user.token_expire) < new Date()){
            throw {message : 'token expire', status : 400}
        }
        next()
    }catch(e){  
        res.status(e.status ? e.status : 500).send(e)
    }
}

