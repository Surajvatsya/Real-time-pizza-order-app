const mongoose = require('mongoose');

const pizza = {
  name: {type: String,required: true},
  image: {type: String,required: true},
  price: {type: String,required: true},
  sizes: {type: String,required: true},
}
const Menu = mongoose.model('Menu',pizza);

module.exports = Menu;