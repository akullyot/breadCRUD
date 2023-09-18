//Require Mongoose
const mongoose = require('mongoose');
//Purpose: Shorthand for the Schema constructor
const {Schema} = mongoose;
//Purpose: Define our collection and create validation rules
const breadSchema = new Schema(
  {
      name      : {type : String, required: true},
      hasGluten : {type : Boolean},
      image     : {type : String, default: 'http://placehold.it/500x500.png'},
      baker     : {type : String, enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe'] }  
  }
);
//Purpose: Use said schema to creat a model 
const Bread = mongoose.model('Bread', breadSchema);
//Im going to pull out all my helper methods/restrictions 
// Syntax : key = field Name, value = the restrictions

module.exports = Bread



