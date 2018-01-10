const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

const CommentModel = require('../models/comments')

// POST /comments 创建一条留言
router.post('/', checkLogin, function (req, res, next) {
  // res.send('post a comment')
  const author = req.session.user._id
  const postId = req.fields.postId
  const content = req.fields.content

  // 校验参数
  try {
    if (!content.length) {
      throw new Error('enter valid comment')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  const comment = {
    author: author,
    postId: postId,
    content: content
  }

  CommentModel.create(comment)
    .then(function () {
      req.flash('success', 'Comment successful!')
      // 留言成功后跳转到上一页
      res.redirect('back')
    })
    .catch(next)
})

// GET /comments/:commentId/remove 删除一条留言
router.get('/:commentId/remove', checkLogin, function (req, res, next) {
  // res.send('delete a comment')
  const commentId = req.params.commentId
  const author = req.session.user._id

  CommentModel.getCommentById(commentId)
    .then(function (comment) {
      if (!comment) {
        throw new Error('Comment not exist')
      }
      if (comment.author.toString() !== author.toString()) {
        throw new Error('unauthorized')
      }
      CommentModel.delCommentById(commentId)
        .then(function () {
          req.flash('success', 'Comment deleted!')
          // 删除成功后跳转到上一页
          res.redirect('back')
        })
        .catch(next)
    })
})

module.exports = router
