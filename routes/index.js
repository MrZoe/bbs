/**
 * Created by Administrator on 2017/6/16.
 */

const express = require('express')

const index = express.Router()

index.get('/', (request, response) => {
    response.sendfile('templates/index.html')
})

module.exports = {
    index: index,
}
