const sha1 = require('sha1')

const express = require('express')
const router = express.Router()

const UserModel = require('../models/users')

const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signin 登录页
router.get('/', checkNotLogin, function (req, res, next) {
  // res.send('Login Page')
  res.render('signin.ejs')
})

// POST /signin 用户登录
router.post('/', checkNotLogin, function (req, res, next) {
  // res.send('Login')
  const name = req.fields.name
  const password = req.fields.password

  // 校验参数
  try {
    if (!name.length) {
      throw new Error('enter valid username!')
    }
    if (!password.length) {
      throw new Error('enter valid password!')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  UserModel.getUserByName(name)
    .then(function (user) {
      if (!user) {
        req.flash('error', 'user does not exist!')
        return res.redirect('back')
      }
      // 检查密码是否匹配
      if (sha1(password) !== user.password) {
        req.flash('error', 'username or password not correct')
        return res.redirect('back')
      }
      req.flash('success', 'Successfully logged in!')
      // 用户信息写入 session
      delete user.password
      req.session.user = user
      // 跳转到主页
      res.redirect('/posts')
    })
    .catch(next)
})

module.exports = router
