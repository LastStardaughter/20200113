// scott Temp pass SsbCiFRVfvWwCkPl
const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://scott:SsbCiFRVfvWwCkPl@cluster0-adjjy.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:',err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
});

const result = await course.save();
console.log(result);
}

async function getCourses() {
// eq equal
//ne not equal
// gt >
// gte >=
// lt < etc
// in
// nin not in

    const courses = await Course.find({ author: 'Mosh', isPublished: true})
    .limit(10)
    .sort({ name: 1 })
    //.select({ name: 1, tags: 1 });
    .count();
    console.log(courses);
};

async function getCourses1() {
       const courses = await Course.find({ tags: 'backend', isPublished: true})
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
        console.log(courses);
    };

async function getCourses2() {
        const courses = await Course.find({isPublished: true, $or:[ {tags: 'backend'}, {tags:'frontend'}]})
         .sort({ price: -1 })
         .select({ name: 1, author: 1 });
         console.log(courses);
    };

async function getCourses3() {
const courses = await Course.find({ $or: [{price: {$gte: 15}}, {name: /.*by.*/}]})
         console.log(courses);
     };

//createCourse();
console.log("Exercise 1:");
getCourses1();
console.log("Exercise 2:");
getCourses2();
console.log("Exercise 3:");
getCourses3();