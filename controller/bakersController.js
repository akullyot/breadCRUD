// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')




baker.get('/data/seed', (request, response) => 
{
    const newBakersBulkDataArray = require('../seed/bakerBulkData.js');
    Baker.insertMany(newBakersBulkDataArray)
    .then(createdBakers => {
        response.redirect('/breads')
    })
    .catch(err => {
      response.status(404).send('<h1> 404 Page not Found </h1>');
    })
})


// export
module.exports = baker                    
