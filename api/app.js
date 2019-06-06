const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Map global promise - get rid of mongo warning
mongoose.Promise = global.Promise;

// Connect to mongoose

// TODO: Connect to MongoDB database here...
mongoose.connect('mongodb://localhost/end2end', {
  useNewUrlParser: true
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err));

const usersModel = require('./models/Users');
const profileModel = require('./models/Profile');
const friendModel = require('./models/Friend');

const auth = require('./auth');
const helper = require('./helper');

const PORT = process.env.PORT || 5000;

// CORS support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a users
// TODO: Endpoint to create all users
app.post('/users', auth.isAuthenticated, (req, res, next) => {
  var userDetails = req.body;
  var newuser = new usersModel(userDetails);
  newuser.save(userDetails, (error, response) => {
    if (error) {
      res.status(500).send('Internal server error');
    }
    else {
      res.status(200).send(response);
    }
  });
});

// Get all users
// TODO: Endpoint to Get all users
app.get('/users', auth.isAuthenticated, (req, res, next) => {
  usersModel.find({}, (error, response) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(response);
    }
  });
});

// Get a user by email
// TODO: Get user by email
app.get('/users/:email', auth.isAuthenticated, (req, res, next) => {
	var emailAddress = req.params.email;
	usersModel.find({ email: { $exists: true, $in: [emailAddress] } }, (error, response) => {
		if (error) {
      res.status(500).send(error);
		} else {
			if(response.length === 0) {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
		}
	});
});

// Validate User
app.post('/users/login', auth.isAuthenticated, (req, res, next) => {
	let emailAddress = req.body.email;
  let password = req.body.password;
  usersModel.find({ email: emailAddress, password : password }, (error, response) => {
		if (error) {
      res.status(500).send(error);
		} else {
      if(response.length === 0) {
        res.status(401).send(error);
      } else {
        res.status(200).send(response);
      }
    }
	});
});


//create a profile
app.post('/home/profile', (req, res, next) => {
  var profileDetails = req.body;
  var id = req.body.profile_id;
  var newprofile = new profileModel(profileDetails);
  newprofile.save(profileDetails, (error, response) => {
    if (error) {
      res.status(500).send('Internal server error');
    } else {
      let profileData = response;
      usersModel.findOneAndUpdate({ _id: id }, { $set: { profile: true } }, (error, data) => {
        if (error) {
          res.status(500).send(error);
        } else {
          let response = helper.helperFunctions.saveFriendList(id).then(
            (data) => res.status(200).send(profileData)
          ).catch(
            (err) => res.status(500).send(err)
            )
        }
      })
    }
  });
});

//get profile details
app.get('/home/profile/:id', (req, res, next) => {
	var profile_id = req.params.id;
	profileModel.find({ profile_id: { $in: [profile_id] } }, (error, response) => {
		if (error) {
      res.status(500).send(error);
		} else {
			res.status(200).send(response);
		}
	});
});

//update profile details
app.post('/home/profile/:id', (req, res, next) => {
  let profileDetails = req.body;
	let profile_id = req.params.id;
  profileModel.findOneAndUpdate({  profile_id: profile_id }, { $set: profileDetails }, { new: true }, (error, doc) => {
		if (error) {
      res.status(500).send(error);
		} else {
			res.status(200).send(doc);
		}
	});
});

//fetch friend map
app.get('/home/friend/:id', (req, res, next) => {
  let profile_id = req.params.id;
	friendModel.find({ profile_id: { $in: [profile_id] } }, (error, response) => {
		if (error) {
      res.status(500).send(error);
		} else {
			res.status(200).send(response);
		}
	});
});


//fetch other friends
app.post('/home/friend/others', (req, res, next) => {
  let idArray = req.body;
  profileModel.find({ profile_id: { $nin: idArray } }, (error, response) => {
		if (error) {
      res.status(500).send(error);
		} else {
			res.status(200).send(response);
		}
	});
});

//fetch request_to and request_by
app.post('/home/friend/request', (req, res, next) => {
  let idArray = req.body;
  profileModel.find({ profile_id: { $in: idArray } }, (error, response) => {
		if (error) {
      res.status(500).send(error);
		} else {
			res.status(200).send(response);
		}
	});
});










// Listen on port
app.listen(PORT, function () {
  console.log('[SERVER]: Running on port ' + PORT);
});

