const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exampleApp', {useNewUrlParser: true, useUnifiedTopology: true});

let Student = mongoose.model('Student', { firstName: String });
let City = mongoose.model('City', { name: String });

let promise1 = Student.insertMany([{ firstName: 'Alice' }, { firstName: 'Bob' }]);
let promise2 = City.insertMany([{ name: 'Madrid' }, { name: 'Barcelona' }, { name: 'Paris' }]);

Promise.all([promise1, promise2])
  .then(values => {
    console.log("students and cities have been inserted");
    console.log(values);
    mongoose.connection.close();
  })
  .catch(err => console.error(err));

let readStudents = Student.find();
let readCities = City.find();

Promise.all([readStudents,readCities])
.then(values =>{
    console.log("both collections are read")
    console.log(values);
})