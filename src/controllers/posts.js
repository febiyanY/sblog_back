import mPost from '../models/posts'
import mUser from '../models/users'
import {v4 as uuidv4} from 'uuid'

class Post {

    async getAll(req, res) {
        try {
            // const user = res.locals.user
            // let posts
            // if (user.type === 'admin') {
            //     posts = await mPost.findAll()
            // } else {
            //     posts = await mPost.findAll({ where: { userId: user.id } })
            // }
            const posts = await mPost.findAll({order : [['time','desc']]})
            res.send(posts)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async addPost(req,res){
        try{
            const newPost = req.body
            let key = newPost.title.toLowerCase().trim()
            key = key.replace(/ /g, '-') + '-'+ uuidv4()
            await mPost.create({...newPost, key, userId : res.locals.user.id})
            res.send({message : 'success'})
        }catch(e){
            res.status(e).send(e)
        }
    }

    async updatePost(req,res){
        try{
            const updateData = {...req.body.update}
            await mPost.update({...updateData}, {where : {id : req.body.postId}})
            res.send({message : 'success'})
        }catch(e){
            res.status(500).send(e)
        }
    }

    async deletePost(req,res){
        try{
            if(!req.params.id) throw {message : 'request error'}
            await mPost.destroy({where : {id : req.params.id}})
            res.send({message : 'success'})
        }catch(e){
            res.status(e.status ? e.status : 500).send(e)
        }
    }

    async getOnePost(req,res){
        try{
            const post = await mPost.findOne({where : {key : req.params.id}, include : [
                {model : mUser, attributes : ['id', 'username', 'display_name','ava']}
            ]})
            if(!post) throw {status : 404, message : 'not found'}
            res.send(post)
        }catch(e){
            res.status(e.status ? e.status : 500).send(e)
        }
    }

    async getPostPerUser(req,res){
        try{
            const posts = await mPost.findAll({where : {userId : req.params.userid}, order : [['time','desc']]})
            res.send(posts)
        }catch(e){
            res.status(500).send(e)
        }
    }

}

export default new Post()