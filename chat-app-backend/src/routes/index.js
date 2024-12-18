"use strict"
const router = require('express').Router()


// auth:
router.use('/auth', require('./auth'))

// user:
router.use('/users', require('./user'))

// token:
router.use('/tokens', require('./token'))

// room:
router.use('/rooms', require('./room'))

// message:
router.use('/messages', require('./message'))

module.exports = router