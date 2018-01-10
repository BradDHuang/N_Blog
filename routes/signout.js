const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

// GET /signout 登出
router.get('/', checkLogin, function (req, res, next) {
  // res.send('Sign Out')

  // 清空 session 中用户信息
  req.session.user = null
  req.flash('success', 'Successfully logged out!')
  res.redirect('/posts')
})

module.exports = router
