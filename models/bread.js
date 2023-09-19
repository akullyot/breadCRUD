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
      baker     : {type : Schema.Types.ObjectID,
                   ref: 'Baker'
                  }  
  }
);
//Purpose: Helper method that returns the standard baked with love message
breadSchema.methods.getBakedBy = function(){
  //this.baker.name is populated using Baker model
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}



//Purpose: Use said schema to create a model 
const Bread = mongoose.model('Bread', breadSchema);
//Im going to pull out all my helper methods/restrictions 
// Syntax : key = field Name, value = the restrictions

module.exports = Bread



