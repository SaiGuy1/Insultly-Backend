const db = require('../models');


const create = async(req, res) => {
  try {
    const createdTodo = await db.Todo.create(req.body);
    const responseObj = {
      id: createdTodo._id,
      title: createdTodo.title,
      content: createdTodo.content,
      time: createdTodo.time,
      location: createdTodo.location
    };
    console.log(req.body)
    res.status(200).json(createdTodo);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: error });
    };
};


const showAll = async(req, res) => {
    try {
        const allTodos = await db.Todo.find(req.query);
        res.status(200).json(allTodos)
    } catch (error) {
      return res.status(500).json({ message: 'Something went wrong, try again', error: error });
    };
};

const show = async(req, res) => {
  let id = req.params.id;
  db.Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
}


module.exports = {
  showAll,
  show,
  create
}
