//Initialize Express
const express  = require('express');
//Intialize the router of breads
const breads   = express.Router();


// Load in Data from models
const Bread = require('../models/bread.js');


// Static Routes first
breads.get('/', (request, response) => 
{
  //Search the collection for all breads
  Bread.find()
    .then(foundBreads => {
      response.render('index',
      {
          breadsData  : foundBreads,
          defaultData : {
                          title      : 'Bread Inventory List',
                          pageCSS    : ''
                        }
      });
    })
});

breads.post('/', (request,response) =>
{
    if (!request.body.image) 
    {
        request.body.image = undefined;
    }
    if(request.body.hasGluten === 'on') 
    {
      request.body.hasGluten = true;
    }
    else 
    {
      request.body.hasGluten = false;
    }
    Bread.create(request.body)
    response.redirect('/breads')
});

//Purpose: Create one new Bread
breads.get('/new', (request, response) => 
{
    response.render('newBread',
    {
      defaultData : {
                      title      : 'Create a New Bread',
                      pageCSS    : ''
                    }
    });
});
//Purpose: Create many new breads
breads.get('/data/seed', (request, response) =>
{
    const newBreadsBulkDataArray = require('../seed/breadBulkData.js');
    Bread.insertMany(newBreadsBulkDataArray)
    .then(createdBreads => {
        response.redirect('/breads')
    })
    .catch(err => {
      response.status(404).send('<h1> 404 Page not Found </h1>');
    })
}
)
//Dynamic Routes
//Purpose: show the information for every existing bread
breads.get('/:id', (request, response) => 
{
    Bread.findById(request.params.id)
    .then(foundBread => 
    {
        response.render('showBreadInfo', 
        {
            bread       : foundBread,
            defaultData : {
                            title      : 'Bread Entry: ' + foundBread.name,
                            pageCSS    : ''
                          }
        });
    })
    .catch(err => {
      response.status(404).send('<h1> 404 Page not Found </h1>');
    })
});

//DELETE a bread
breads.delete('/:id', (request, response) =>
{
  Bread.findByIdAndDelete(request.params.id)
  .then(deleteBread => 
  {
      response.status(303).redirect('/breads');
  })
});

// UPDATE
breads.put('/:id', (request, response) => 
{
    if(request.body.hasGluten === 'on')
    {
      request.body.hasGluten = true
    } 
    else 
    {
      request.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(request.params.id, request.body, { new: true }) 
      .then(updatedBread => {
        console.log(updatedBread); 
        response.redirect(`/breads/${request.params.id}`) 
      })
});

// EDIT
breads.get('/:id/edit', (request, response) => 
{
  Bread.findById(request.params.id)
  .then(foundBread => 
  {
      response.render('editPage', 
      {
          bread: foundBread,
          defaultData : {
                          title      : 'Edit Bread: ' + foundBread.name,
                          pageCSS    : ''
                        }
      });
  })
  .catch(err => {
    response.status(404).send('<h1> 404 Page not Found </h1>');
  })
})


  



module.exports = breads;
