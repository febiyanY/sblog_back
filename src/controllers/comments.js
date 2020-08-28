import mComment from '../models/comments'
import mUser from '../models/users'
import mPost from '../models/posts'

class Comment {

    async getCommentPerPost(req,res){
        try{
            if(!req.query.postId) throw {message : 'request invalid', status : 400}
            const comments = await mComment.findAll({where : {postId : req.query.postId}, include : [
                {model : mUser, attributes : ['id', 'username', 'display_name']},
                {model : mComment, as : 'reply', include : [{
                    model : mUser, attributes : ['id', 'username']
                }]}
            ], order : [['time', 'desc']]})
            res.send(comments)
        }catch(e){
            res.status(e.status ? e.status : 500).send(e)
        }
    }

    async addComment(req,res){
        try{
            const newComment = req.body
            await mComment.create({...newComment, userId : res.locals.user.id})
            res.send({message : 'success'})
        }catch(e){
            res.status(500).send(e)
        }
    }

    async updateComment(req,res){
        try{
            const updateData = {...req.body.update}
            await mComment.update({...updateData}, {where : {id : req.body.commentId}})
            res.send({message : 'success'})
        }catch(e){
            res.status(500).send(e)
        }
    }

    async deleteComment(req,res){
        try{
            await mComment.destroy({where : {id : req.params.id}})
            res.send({message : 'success'})
        }catch(e){ 
            res.send(e.message ? e.message : 500).send(e)
        }
    }

    async getOneComment(req,res){
        try{
            const comment = await mComment.findOne({where : {id : req.params.id}})
            res.send(comment)
        }catch(e){
            res.status(500).send(e)
        }
    }

}

export default new Comment()