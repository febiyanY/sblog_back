
const adminAuth = (req, res, next) => {
    try{
        if(!req.session.user) throw {message : 'Unauthorized', status : 401}
        if(req.session.user.type!=='admin') throw {message : 'Unauthorized', status : 401}
        next()
    }catch(e){  
        res.status(e.status ? e.status : 500).send(e)
    }
}
const clientAuth = (req, res, next) => {
    try{
        if(!req.session.user) throw {message : 'Unauthorized', status : 401}
        next()
    }catch(e){  
        res.status(e.status ? e.status : 500).send(e)
    }
}

module.exports = {
    adminAuth, clientAuth
}
