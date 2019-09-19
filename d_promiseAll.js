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
    /*
    [ [ { _id: 5a4e462048841e65562c465a, firstName: 'Alice', __v: 0 },
      { _id: 5a4e462048841e65562c465b, firstName: 'Bob', __v: 0 } ],
    [ { _id: 5a4e462048841e65562c465c, name: 'Madrid', __v: 0 },
      { _id: 5a4e462048841e65562c465d, name: 'Barcelona', __v: 0 },
      { _id: 5a4e462048841e65562c465e, name: 'Paris', __v: 0 } ] ]
    */
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