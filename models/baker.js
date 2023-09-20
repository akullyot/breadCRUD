// dependencies
const mongoose = require('mongoose');
const Bread = require('./bread');
const { Schema } = mongoose

// schema
const bakerSchema = new Schema
(
    {
        name: 
        {
            type: String,
            required: true,
            enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
        }, 
        startDate: 
        {
            type: Date,
            required: true
        },
        bio: String
    }
    , { toJSON: { virtuals: true }
});
//creating virtuals
bakerSchema.virtual('breads', 
{
    ref         : 'Bread', //name of the Models Schema we are reffing
    localField  : '_id',   //field in baker that matches the field in the ref
    foreignField: 'baker'  //field in the breads model that we will match to 
});
//Creating Hooks
// hooks 
bakerSchema.post('findOneAndDelete', function() 
{
    Bread.deleteMany({ baker: this._conditions._id })
        .then(deleteStatus => {
            console.log(deleteStatus)
        })
  })
        

// model and export
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker;
