const db = require('../models');


const create = async(req, res) => {
  try {
    const createdTodo = await db.Todo.create(req.body);
    const responseObj = {
      id: createdTodo._id,
      title: createdTodo.title,
      content: createdTodo.content,
      time: createdTodo.time,
      location: createdTodo.location,
      lat: createdTodo.lat,
      lng: createdTodo.lng
    };
    console.log(req.body)
    res.status(200).json(createdTodo);
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: error });
    };
};


const update = async (req, res) => {
  console.log(req.params)
    try {
        let foundTodo = await db.Todo.findById(req.params.id);
            foundTodo.title = req.body.title;
            foundTodo.content = req.body.content;
            foundTodo.location = req.body.location;
            foundTodo.time = req.body.time;
            foundTodo.lat = req.body.lat;
            foundTodo.lng = req.body.lng;
            foundTodo.save();
            const responseObj = {
              id: foundTodo._id,
              title: foundTodo.title,
              content: foundTodo.content,
              time: foundTodo.time,
              location: foundTodo.location,
              lat: foundTodo.lat,
              lng: foundTodo.lng
            };
            res.status(200).json(responseObj)
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong, try again', error: error });
    }
}

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

const destroy = async(req, res) => {
    try {
        const foundTodo = await db.Todo.findById(req.params.id);
        console.log(foundTodo)
        console.log(foundTodo.id)
        responseObj = {
            id: foundTodo.id,
            title: foundTodo.title,
            content: foundTodo.content,
            location: foundTodo.location,
        }
        await db.Todo.findByIdAndDelete(foundTodo.id);
        res.status(200).json(responseObj)
    } catch (error) {
        res.status(500).json({message: 'Something went wrong, please try again', error: error});
    };
};


module.exports = {
  showAll,
  show,
  create,
  destroy,
  update
}
