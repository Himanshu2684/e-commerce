const { login, signup, users } = require('../controllers/AuthControler')

const router = require('express').Router()

router.post('/login', login)

router.post('/signup', signup)

router.get('/users', users)


module.exports = router