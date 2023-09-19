//Initialize Express
const express  = require('express');
//Intialize the router of breads
const breads   = express.Router();


// Load in Data from models 
const Bread = require('../models/bread.js');
const Baker = require('../models/baker.js');


// Static Routes first
breads.get('/', (request, response) => 
{
  //Search the collection for all breads
  Bread.find()
  .populate('baker')
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
  //Purpose: get all the current potential bakers to fill in the form
  Baker.find()
  .then(foundBakers => {
    response.render('newBread',
    {
      bakers: foundBakers,
      defaultData : {
                      title      : 'Create a New Bread',
                      pageCSS    : ''
                    }
    });
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
    //Populate is done to get the information from out baker.id to populate into bread.baker as a nested object
    Bread.findById(request.params.id)
    .populate('baker')
    .then(foundBread => 
    {
        //Lets use our new helper method
        const bakedBy = foundBread.getBakedBy();
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
    //First lets check to make sure validations are fine on this end
    let schemaInformation = Bread.schema;
    let isValid = true;
    for (let i=0; i< Object.keys(request.body).length; i++)
    {
        let currentField = [Object.keys(request.body)[i]];
        let pathInfo  = schemaInformation.paths[currentField];
        if ( pathInfo.enumValues !== undefined && pathInfo.enumValues.length > 0)
        {
            //Purpose: do a validation check 
            if (!pathInfo.enumValues.includes(request.body[currentField]))
            {
                //theyve entered an invalid enum value, throw it out before updating
                isValid = false;
                response.status(400).send('<h1> New entry attempt did not pass validation. </h1>');

            }
        }
        else if (pathInfo.instance === 'Boolean')
        {
          //Purpose: switch check to Boolean
          if(request.body[currentField] === 'on')
          {
            request.body[currentField] = true
          } 
          else 
          {
            request.body.request.body[currentField] = false
          }
        }
    }
    if (isValid)
    {
      Bread.findByIdAndUpdate(request.params.id, request.body, { new: true }) 
      .then(updatedBread => {

        console.log(updatedBread); 
        response.redirect(`/breads/${request.params.id}`) 
      })
      .catch(err => {
        response.send('<h1> There was an unknown error when attempting editing this entry. please try again. </h1>');
      });
    }
});

// EDIT
breads.get('/:id/edit', (request, response) => 
{
  Baker.find()
  .then(foundBakers =>
  {
      Bread.findById(request.params.id)
      .then(foundBread => 
      {
          response.render('editPage', 
          {
              bread: foundBread,
              bakers: foundBakers,
              defaultData : {
                              title      : 'Edit Bread: ' + foundBread.name,
                              pageCSS    : ''
                            }
          });
      })
  })
  .catch(err => {
    response.status(404).send('<h1> 404 Page not Found </h1>');
  })
})


  



module.exports = breads;
