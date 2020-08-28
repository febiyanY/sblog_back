import axios from 'axios'
import mUser from '../models/users'
import mPost from '../models/posts'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import util from 'util'
import path from 'path'

class Users {

    async initAdmin(){
        try{    
            await mUser.findOrCreate({where : {type : 'admin'}, defaults : {
                username : 'blogadmin',
                password : 'adminpassword',
                display_name : 'Admin Blog',
                type : 'admin'
            }})
        }catch(e){
            return e
        }
    }

    async login(req,res){
        try{
            const user = await mUser.findOne({where : {username : req.body.username}})
            if(!user) throw {message : 'Username or Password incorrect', status : 400}
            const match = await bcrypt.compare(req.body.password, user.password)
            if(!match) throw {message : 'Username or Password incorrect', status : 400}
            user.token_expire = new Date(new Date().getTime() + (3600 * 1000))
            user.save()
            let data = {...user}
            const token = jwt.sign(data.dataValues, process.env.JWT_SECRET, {expiresIn : '1h'})
            // res.send({message : 'success', data : {...user, token}})
            res.send({data : data.dataValues, token})
        }catch(e){
            res.status(e.status ? e.status :500).send(e)
        }
    }

    async logout(req,res){
        try{
            const token = req.header('Authorization').replace('Bearer ','')
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = decoded.dataValues
            const token_expire = new Date(new Date().getTime() - (3600 * 1000))
            await mUser.update({token_expire}, {where : {id : user.id}})
            res.send({message : 'success'})
        }catch(e){
            res.status(500).send(e)
        }
    }

    async getUsers(req,res){
        try{
            const users = await mUser.findAll({where : {type : 'client'}, order : [['id','desc']]})
            res.send({message : 'success', data : users})
        }catch(e){
            res.status(500).send({error : e})
        }
    }
    async addUser(req,res){
        try{
            const newUser = req.body
            if(newUser.type==='admin') throw {message : 'Admin exist', status : 400}
            await mUser.create(newUser)
            res.send({message : 'success'})
        }catch(e){
            res.status(e.status ? e.status : 500).send(e)
        }
    }

    async updateUser(req,res){
        try{
            const user = await mUser.findOne({where : {id : req.body.userId}})
            if(req.body.update.password){
                const hashed = await bcrypt.hash(req.body.update.password, 10)
                user.password = hashed
                delete req.body.update.password
            }

            const fields = Object.keys(req.body.update)
            fields.forEach(field => user[field] = req.body.update[field])
            await user.save()

            res.send({message : 'success'})

        }catch(e){
            res.status(500).send(e)
        }
    }

    async deleteUser(req,res) {
        try{
            await mPost.destroy({where : {userId : req.params.id}})
            await mUser.destroy({where : {id : req.params.id}})
            res.send({message : 'success'})
        }catch(e){
            res.status(500).send(e)
        }
    }

    async getOneUser(req,res){
        try{
            const user = await mUser.findOne({where : {id : req.params.id}})
            if(!user) throw {status : 404, message : 'Not found'}
            res.send(user)
        }catch(e){
            res.status(e.status ? e.status : 500).send(e)
        }
    }

    async changeAva(req,res){
        try{
            const filename = req.file.filename
            const unlink = util.promisify(fs.unlink)
            const user = await mUser.findOne({where : {id : req.body.userId}})
            if(user.ava!=='defaultava.png'){
                await unlink(path.join(__dirname, '../../public/images/avatars/'+user.ava))
            }

            user.ava = filename
            await user.save()
            res.send({message : 'success', filename})
        }catch(e){
            res.status(e.status ? e.status : 500).send(e)
        }
    }

}

export default new Users()