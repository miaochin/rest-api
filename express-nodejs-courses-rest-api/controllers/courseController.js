const { v4: uuidv4 } = require('uuid');

let courses = [ 
    {
        id: "1", 
        name: "Algebra",
        credit: "5"
    },
    {
        id: "2", 
        name: "Linear Programming",
        credit: "4"
    },
    {
        id: "3", 
        name: "Nonlinear Optimization",
        credit: "4"
    } 
]

const getCourses = (req, res) => {
    res.status(200).send(courses);
}

const getSingleCourse =  (req, res) => {
    const course = courses.find((c) => c.id === req.params.id);
    if (!course) return res.status(404).send(`Course with Id ${req.params.id} Not Found.`);
    res.status(200).send(course);
}

const createCourse =  (req, res) => {
    const {name, credit} = req.body;
    if (!name) return res.status(400).send(`"name" is required.`);
    if (!credit) return res.status(400).send(`"credit" is required.`);
    if (keysNotDefined(req, res)) return;
    const course = {id: uuidv4(), ...req.body};
    courses.push(course);
    res.status(200).send(course);
}

const updateCourse =  (req, res) => {
    course = courses.find((c) => c.id === req.params.id);
    if (!course) return res.status(404).send(`Course with Id ${req.params.id} Not Found.`);
    if (keysNotDefined(req, res)) return;
    const {name, credit} = req.body;
    if (name) course.name = name;
    if (credit) course.credit = credit;
    res.status(200).send(course); 
}

const deleteCourse = (req, res) => {
    const course = courses.find( (c) => c.id === req.params.id);
    if (!course) return res.status(404).send(`Course with Id ${req.params.id} Not Found.`);
    courses = courses.filter((c) => c.id !== req.params.id);
    res.status(200).send(`Course with id ${req.params.id} has been deleted.`);
}

const keysNotDefined = (req, res) => {
    const keys = ['name', 'credit'];
    for (let i in req.body) {
        if (!keys.includes(i)) {
            return res.status(400).send(`"${i}" is not defined.`);
        }
    }
}

module.exports = {
    getCourses,
    getSingleCourse,
    createCourse,
    updateCourse,
    deleteCourse 
}