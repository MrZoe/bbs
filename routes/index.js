/**
 * Created by Administrator on 2017/6/16.
 */

const express = require('express')
const index = express.Router()
const User = require('../models/user')
const { currentUser } = require('./main')

index.get('/', (request, response) => {
    const user = currentUser(request)
    const args = {
        user:user,
    }
    response.render('index.html', args)
})

module.exports = {
    index: index,
}
