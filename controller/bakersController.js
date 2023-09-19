// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')



baker.get('/', (request,response) => {
  Baker.find()
  .populate('breads')
  .then(foundBakers => {
    response.send(foundBakers)
  })
});

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


//Dynamic Routes
// Show: 
baker.get('/:id', (request, response) => {
  Baker.findById(request.params.id)
      .populate('breads')
      .then(foundBaker => {
        response.render('bakerShow', {
              baker: foundBaker,
              defaultData : 
              {
                title      : 'Bread Inventory List',
                pageCSS    : ''
              }
          })
      })
})



// export
module.exports = baker                    
