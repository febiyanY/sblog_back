const { 
    Comment: mComment, User: mUser, Sequelize, sequelize : db,
    CommentUpvote : mCommentUpvote, CommentDownvote : mCommentDownvote 
} = require('../models/index')

class Comment {

    async getCommentPerPost(req, res) {
        try {
            if (!req.query.postId) throw { message: 'request invalid', status: 400 }
            let comments
            if(req.session.user){
                comments = await mComment.findAll({
                    attributes : [
                        'id','body','time','votes'
                    ],
                    where: { postId: req.query.postId }, include: [
                        { model: mUser, attributes: ['id', 'username', 'display_name'] },
                        { model: mUser, as :'CommentUpvotes', attributes: ['id'], where : {id : req.session.user.id}, required : false },
                        { model: mUser, as :'CommentDownvotes', attributes: ['id'], where : {id : req.session.user.id}, required : false },
                        {
                            model: mComment, as: 'reply', include: [{
                                model: mUser, attributes: ['id', 'username']
                            }]
                        }
                    ], 
                    order: [['time', 'desc']]
                })
            }else{
                comments = await mComment.findAll({
                    attributes : [
                        'id','body','time','votes'
                    ],
                    where: { postId: req.query.postId }, include: [
                        { model: mUser, attributes: ['id', 'username', 'display_name'] },
                        {
                            model: mComment, as: 'reply', include: [{
                                model: mUser, attributes: ['id', 'username']
                            }]
                        }
                    ], 
                    order: [['time', 'desc']]
                })
            }
            
            res.send(comments)
        } catch (e) {
            res.status(e.status ? e.status : 500).send(e)
        }
    }

    async addComment(req, res) {
        try {
            const newComment = req.body
            await mComment.create({ ...newComment, userId: req.session.user.id })
            res.send({ message: 'success' })
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async updateComment(req, res) {
        try {
            const updateData = { ...req.body.update }
            await mComment.update({ ...updateData }, { where: { id: req.body.commentId } })
            res.send({ message: 'success' })
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async deleteComment(req, res) {
        try {
            await mComment.destroy({ where: { id: req.params.id } })
            res.send({ message: 'success' })
        } catch (e) {
            res.send(e.message ? e.message : 500).send(e)
        }
    }

    async getOneComment(req, res) {
        try {
            const comment = await mComment.findOne({ where: { id: req.params.id } })
            res.send(comment)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async upvote(req, res) {
        try {
            const vote = await mCommentUpvote.findOne({where : {userId : req.session.user.id, commentId : req.body.commentId}})
            if(vote) throw {status : 400, message : 'you already upvote this comment'}
            const deleted = await mCommentDownvote.destroy({where : {userId : req.session.user.id, commentId : req.body.commentId}})
            db.query('INSERT INTO "CommentUpvotes" VALUES (?,?)', {
                replacements: [req.session.user.id, req.body.commentId],
                type: Sequelize.QueryTypes.INSERT
            })
            if(deleted){
                mComment.increment({votes : 2}, { where: { id: req.body.commentId } })
            }else{
                mComment.increment('votes', { where: { id: req.body.commentId } })
            }
            res.send({ message: 'comment upvotted' })
        } catch (e) {
            res.status(e.status ? e.status : 500).send(e)
        }
    }
    async downvote(req, res) {
        try {
            const vote = await mCommentDownvote.findOne({where : {userId : req.session.user.id, commentId : req.body.commentId}})
            if(vote) throw {status : 400, message : 'you already downvote this comment'}
            const deleted = await mCommentUpvote.destroy({where : {userId : req.session.user.id, commentId : req.body.commentId}})
            db.query('INSERT INTO "CommentDownvotes" VALUES (?,?)', {
                replacements: [req.session.user.id, req.body.commentId],
                type: Sequelize.QueryTypes.INSERT
            })
            if(deleted){
                mComment.decrement({votes : 2}, { where: { id: req.body.commentId } })
            }else{
                mComment.decrement('votes', { where: { id: req.body.commentId } })
            }
            res.send({ message: 'comment downvotted' })
        } catch (e) {
            res.status(e.status ? e.status : 500).send(e)
        }
    }
    
    async undoUpvote(req,res){
        try{
            const vote = await mCommentUpvote.destroy({where : {userId : req.session.user.id, commentId : req.body.commentId}})
            if(!vote) throw {status : 400, message : 'you have not upvote this comment'}
            mComment.decrement('votes', { where: { id: req.body.commentId } })
            res.send({ message: 'undo comment upvote'})
        }catch(e){
            res.status(e.status ? e.status : 500).send(e)
        }
    }
    async undoDownvote(req,res){
        try{
            const vote = await mCommentDownvote.destroy({where : {userId : req.session.user.id, commentId : req.body.commentId}})
            if(!vote) throw {status : 400, message : 'you have not downvote this comment'}
            mComment.increment('votes', { where: { id: req.body.commentId } })
            res.send({ message: 'undo comment downvote'})
        }catch(e){
            res.status(e.status ? e.status : 500).send(e)
        }
    }

}

module.exports = new Comment()