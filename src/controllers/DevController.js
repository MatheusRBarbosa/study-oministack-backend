const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringToArray = require('../utils/parseStringToArray')
const { findConnection, sendMessage } = require('../websocket')

module.exports = {
    async index(req, res){
        const devs = await Dev.find()
        return res.json(devs)
    },

    async store(req, res){
        const { github_username, techs, latitude, longitude } = req.body
        
        let dev = await Dev.findOne({github_username})
        if(!dev){
            const github_response = await axios.get(`https://api.github.com/users/${github_username}`)
        
            let {name = login, avatar_url, bio} = github_response.data
            
            const techsArray = parseStringToArray(techs)
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })

            // Filtros
            const sendMessageTo = findConnection(
                { latitude, longitude },
                techsArray
            )

            sendMessage(sendMessageTo, 'new-dev', dev)
        }


        return res.json(dev)
    }
}