// dependencies
const mongoose = require('mongoose')
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

bakerSchema.virtual('breads', 
{
    ref         : 'Bread', //name of the Models Schema we are reffing
    localField  : '_id',   //field in baker that matches the field in the ref
    foreignField: 'baker'  //field in the breads model that we will match to 
})
// model and export
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker;
