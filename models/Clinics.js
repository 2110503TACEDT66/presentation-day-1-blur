const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required : [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength:[50, 'Name can not be more than 50 characters']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  province :{
    type: String,
    required: [true, 'Please add a province']
  },
  postalcode: {
    type: String,
    required: [true, 'Please add a postalcode'],
    maxlength: [5, 'PostalCode can not be more than 5 digits']
  },
  tel: {
    type: String
  },
  region: {
    type: String,
    required: [true, 'Please add a region']
  }
},{
  toJSON: {virtuals:true},
  toObject:{virtuals:true}
});