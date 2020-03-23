const bcrypt = require('bcryptjs');
const db = require('../models');

// INDEX ALL USERS ================ //

const index = (request, response) => {
    db.User.find({}, (error, allUsers) => {
      if (error) return response.status(500).json({message: 'Something went wrong here. Try again'});
      response.status(200).json(allUsers);
    });
};

// SIGNUP SINGLE USER ================ //
const signup = async (req, res) => {
    const userData = req.body;
    let hash;

    try {
      hash = await bcrypt.hashSync(req.body.password, 10);
      userData.password = hash;
    } catch (err) {
      res.status(400).json({status: 400, error: 'Bad Request!'});
    }

    console.log("in submit form")

    db.User.create(req.body, (err, savedUser) => {
        if (err) {
            return res.json({message: 'lol'})
         }
         console.log(`saved new user: ${savedUser}`)
         res.json({savedUser});
    });
};

// Show (READ) Single User
const show = (req, res) => {
  db.User.findById(req.session.currentUser, (error, foundUser) => {
    if (error) res.status(400).json({status: 400, message: 'Something went wrong, please try again.'});
    res.status(200).json(foundUser);
  });
};

// UPDATE SINGLE USER
const update = (req, res) => {
  db.User.findByIdAndUpdate(req.session.currentUser, req.body, {new: true}, (err, updatedUser) => {
    if (err) return res.status(400).json({error: 'Bad request!'});
    res.status(200).json(updatedUser)
  });
};


// LOGIN SINGLE USER ================ //
const login = (req, res) => {
    const { firstName, lastName, email, password} = req.body;

    db.User.findOne({email}, async (err, foundUser) => {
      let passwordsMatch;
      if (err) res.status(400).json({status: 540, error: 'Bad request(A)'});

      if(!foundUser) {
        return res.status(400).json({status: 400, message: 'Username or password is incorrect.'});
      }

      try {
        passwordsMatch = await bcrypt.compare(password, foundUser.password);
        // console.log(passwordsMatch);
      } catch (err) {
        res.status(400).json({status: 400, message: 'Bad request(B).'});
      }

      req.session.currentUser = foundUser._id;
      req.session.createdAt = new Date().toDateString();
      req.session.user = foundUser;

      // console.log(req.session);



      if (passwordsMatch) {
        res.status(200).json({status: 200, message: 'Success!'});
        // console.log(req.session.user)
      } else {
        res.status(400).json({status: 400, error: 'Invalid credentials.'});
      }

    });
};

// VERIFY SINGLE USER ================ //
const verify = (req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({status: 401, error: 'Unauthorized, please login and try again.'})
    }
    res.status(200).json(req.session.user);
};

// LOGOUT SINGLE USER ================ //
const logout = (req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({status: 401, message: 'Unauthorized plese login and try again.'});
    }

    req.session.destroy((err) => {
      if (err) return res.status(400).json({status: 400, error: 'Bad request!'});
      res.status(200).json({status: 200}).redirect('/');
    });
};

// DELETE SINGLE USER ================ //

const destroy = (req, res) => {
  const { email, password } = req.body;
  db.User.findOneAndDelete({email}, async (err, deletedUser) => {
    let passwordsMatch;
    if (err) res.status(400).json({status: 400, error: 'Bad request A!'});

    if (!deletedUser) {
      return res.status(400).json({status: 400, message: 'Username or password is incorrect.'});
    }

    try {
      passwordsMatch = await bcrypt.compare(password, deletedUser.password);
    } catch (err) {
      res.status(400).json({status: 400, message: 'Bad request B!'});
    };

    console.log(deletedUser)
    if (err) res.status(400).json({status: 400, error: 'Bad request, please try again.'});
    const responseObj = {
      status: 200,
      data: deletedUser,
      requestedAt: new Date().toLocaleString()
    };

      res.status(200).json(responseObj);

    });
};


module.exports = {
    index,
    signup,
    show,
    login,
    verify,
    logout,
    destroy,
    update,
};
