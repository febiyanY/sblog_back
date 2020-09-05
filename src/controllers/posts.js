const {
    Post: mPost,
    User: mUser,
    Sequelize,
    sequelize: db,
    PostUpvote: mPostUpvote,
    PostDownvote: mPostDownvote
} = require('../models/index')
const { v4: uuidv4 } = require('uuid')

class Post {

    async getAll(req, res) {
        try {
            const user = req.session.user
            let posts
            if (user) {
                posts = await mPost.findAll({
                    attributes: ['id', 'key', 'title', 'body', 'time', 'votes',
                        [Sequelize.literal('(select COUNT(*) from "Comments" where "Comments"."postId"="Post".id)'), 'commentsCount']
                    ],
                    include: [
                        { model: mUser, as: 'PostUpvotes', attributes: ['id'], where: { id: user.id }, required: false },
                        { model: mUser, as: 'PostDownvotes', attributes: ['id'], where: { id: user.id }, required: false }
                    ],
                    order: [['time', 'desc']]
                })
            } else {
                posts = await mPost.findAll({
                    attributes: ['id', 'key', 'title', 'body', 'time', 'votes',
                        [Sequelize.literal('(select COUNT(*) from "Comments" where "Comments"."postId"="Post".id)'), 'commentsCount']
                    ],
                    order: [['time', 'desc']]
                })
            }
            res.send(posts)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async addPost(req, res) {
        try {
            const newPost = req.body
            let key = newPost.title.toLowerCase().trim()
            key = key.replace(/ /g, '-') + '-' + uuidv4()
            await mPost.create({ ...newPost, key, userId: req.session.user.id })
            res.send({ message: 'success' })
        } catch (e) {
            res.status(e).send(e)
        }
    }

    async updatePost(req, res) {
        try {
            const updateData = { ...req.body.update }
            await mPost.update({ ...updateData }, { where: { id: req.body.postId } })
            res.send({ message: 'success' })
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async deletePost(req, res) {
        try {
            if (!req.params.id) throw { message: 'request error' }
            await mPost.destroy({ where: { id: req.params.id } })
            res.send({ message: 'success' })
        } catch (e) {
            res.status(e.status ? e.status : 500).send(e)
        }
    }

    async getOnePost(req, res) {
        try {
            const user = req.session.user
            let post
            if (user) {
                post = await mPost.findOne({
                    where: { key: req.params.id }, include: [
                        { model: mUser, attributes: ['id', 'username', 'display_name', 'ava'] },
                        { model: mUser, as: 'PostUpvotes', attributes: ['id'], where: { id: user.id }, required: false },
                        { model: mUser, as: 'PostDownvotes', attributes: ['id'], where: { id: user.id }, required: false }
                    ]
                })
            } else {
                post = await mPost.findOne({
                    where: { key: req.params.id }, include: [
                        { model: mUser, attributes: ['id', 'username', 'display_name', 'ava'] }
                    ]
                })
            }
            if (!post) throw { status: 404, message: 'not found' }
            res.send(post)
        } catch (e) {
            res.status(e.status ? e.status : 500).send(e)
        }
    }

    async getPostPerUser(req, res) {
        try {
            const posts = await mPost.findAll({ where: { userId: req.params.userid }, order: [['time', 'desc']] })
            res.send(posts)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async upvote(req, res) {
        try {
            const vote = await mPostUpvote.findOne({ where: { userId: req.session.user.id, postId: req.body.postId } })
            if (vote) throw { status: 400, message: 'you already upvote this post' }
            const deleted = await mPostDownvote.destroy({ where: { userId: req.session.user.id, postId: req.body.postId } })
            db.query('INSERT INTO "PostUpvotes" VALUES (?,?)', {
                replacements: [req.session.user.id, req.body.postId],
                type: Sequelize.QueryTypes.INSERT
            })
            if (deleted) {
                mPost.increment({ votes: 2 }, { where: { id: req.body.postId } })
            } else {
                mPost.increment('votes', { where: { id: req.body.postId } })
            }

            res.send({ message: 'post upvotted' })
        } catch (e) {
            res.status(e.status ? e.status : 500).send(e)
        }
    }
    async downvote(req, res) {
        try {
            const vote = await mPostDownvote.findOne({ where: { userId: req.session.user.id, postId: req.body.postId } })
            if (vote) throw { status: 400, message: 'you already downvote this post' }
            const deleted = await mPostUpvote.destroy({ where: { userId: req.session.user.id, postId: req.body.postId } })
            db.query('INSERT INTO "PostDownvotes" VALUES (?,?)', {
                replacements: [req.session.user.id, req.body.postId],
                type: Sequelize.QueryTypes.INSERT
            })
            if (deleted) {
                mPost.decrement({ votes: 2 }, { where: { id: req.body.postId } })
            } else {
                mPost.decrement('votes', { where: { id: req.body.postId } })
            }

            res.send({ message: 'post downvotted' })
        } catch (e) {
            res.status(e.status ? e.status : 500).send(e)
        }
    }

    async undoUpvote(req, res) {
        try {
            const vote = await mPostUpvote.destroy({ where: { userId: req.session.user.id, postId: req.body.postId } })
            if (!vote) throw { status: 400, message: 'you have not upvote this post' }
            mPost.decrement('votes', { where: { id: req.body.postId } })
            res.send({ message: 'undo post upvote' })
        } catch (e) {
            res.status(e.status ? e.status : 500).send(e)
        }
    }
    async undoDownvote(req, res) {
        try {
            const vote = await mPostDownvote.destroy({ where: { userId: req.session.user.id, postId: req.body.postId } })
            if (!vote) throw { status: 400, message: 'you have not downvote this post' }
            mPost.increment('votes', { where: { id: req.body.postId } })
            res.send({ message: 'undo post downvote' })
        } catch (e) {
            res.status(e.status ? e.status : 500).send(e)
        }
    }

}

module.exports = new Post()