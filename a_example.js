
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/mongolesson', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Ironhacker' });
kitty
  .save()
  .then(newCat => console.log(`A new cat is created: ${newCat}!`))
  .catch(err => console.log(`Error while creating a new cat: ${err}`));


Cat
  .find()
  .then(
    catsFromDB => {
      // catsFromDB is an array of Cat instances
      catsFromDB.forEach(oneCat => console.log(` --> cat: ${oneCat.name}`));
    }
  )
  .catch(err => console.log(`Error occurred during getting cats from DB: ${err}`))