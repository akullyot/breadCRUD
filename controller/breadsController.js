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
          breadsData : foundBreads,
          title : 'Bread Inventory List'
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
    response.render('newBread');
});
//Purpose: Create many new breads
breads.get('/breads/data/seed', (request, response) =>
{
  
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
            bread: foundBread,
            title: 'Bread Entry: ' + foundBread.name
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
      response.status(303).redirect('/breads', 
        {
          //TODO write in a delete alert
        });
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
          title: 'Bread Entry: ' + foundBread.name + "Edit"
      });
  })
  .catch(err => {
    response.status(404).send('<h1> 404 Page not Found </h1>');
  })
})


  



module.exports = breads;
