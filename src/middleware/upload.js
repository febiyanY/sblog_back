const multer = require('multer')
const path = require('path')
const {v4 : uuidv4} = require('uuid') 

const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return cb({message : 'File must be JPG, JPEG or PNG'})
    }
    cb(null, true)
}

const filename = (req, file, cb) => {
    cb(null, uuidv4()+'.'+file.originalname.split('.').pop())
}

const uploadMid = (location, type, name, count=false) => {
    const storage = multer.diskStorage({
        destination : (req, file, cb) => {
            cb(null, path.join(__dirname, '../../public/images/'+location))
        },filename
    })

    let upload
    if(type==='single'){
        upload = multer({
            storage,
            fileFilter,
            limits : {
                fileSize : 500000
            }
        }).single(name)
    }else{
        upload = multer({
            storage,
            fileFilter,
            limits : {
                fileSize : 500000
            }
        }).array(name, count)
    }

    const cb = async(req, res, next) => {
        upload(req, res, err => {
            if(err) return res.status(500).send(err)
            next()
        })
    }
    return cb

}

module.exports = uploadMid