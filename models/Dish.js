import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
  idDish: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  isVegetarian: { type: Boolean, required: true },
  value: { type: Number, required: true },
  comments: { type: String },
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
