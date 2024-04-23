require('dotenv').config()
module.exports ={
    token: process.env['TOKEN'],
    mongodb: process.env['MONGODB']
}