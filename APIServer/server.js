//Variables
var express     = require('express');
var cors 		= require('cors');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport  	= require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var port        = process.env.PORT || 8080;
var jwt         = require('jwt-simple');
//var nodemailer = require('nodemailer');
var fs = require('fs');
var multer = require('multer');
var crypto = require('crypto');

//Schemas
var Settings     = require('./app/models/settings');
var LoginTime     = require('./app/models/loginTimes');
var RefridgerationUnit= require('./app/models/refridgerationUnit');
var Supplier= require('./app/models/suppliers');
var Delivery     = require('./app/models/delivery');
var Fitness     = require('./app/models/FitnessToWork');
var Refridgeration= require('./app/models/refridgeration');
var Hothold= require('./app/models/Hothold');
var HygieneInspection= require('./app/models/hygieneInspection');
var HygieneTraining= require('./app/models/hygieneTraining');
var Transport= require('./app/models/transport');
var Temperature= require('./app/models/temperature');
var Food= require('./app/models/food');

//Some of user auth Code adapted from http://devdactic.com/restful-api-user-authentication-1

//works but google suspend account
/*var transporter = nodemailer.createTransport({
   service: "Gmail",
   auth: {
       user: "haccpapzpass@gmail.com",
       //pass: "Upupandaway1"
   }
});*/

app.use(cors());

// get our request parameters
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

//Multer for photos
//var upload =multer({dest:'C:/uploads'});

var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: 'C:/uploads',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }//end fileName
})

var upload = multer({ storage: storage })

// demo Route (GET http://localhost:8080)
//can be removed
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

//Allows CORS
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// connect to Mongodb database using mongoose
var db =mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);

// bundle our routes
var apiRoutes = express.Router();

////////////////////////////////////////////////////////////////////////////////////
//ROUTES///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// creates a new user account
apiRoutes.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Email already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
      //add new settings
      createSettings(req.body.email);

    });
  }
});
//end signup////////////////////////////////////////////////////////////////////////

//checks if email and pass are in db and returns a token in json form
apiRoutes.post('/authenticate', function(req, res) {

  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. Email not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
          //save time of login
          var loginTime = new LoginTime();
          var date = new Date();
          var time = date.toTimeString();
          var date = date.toDateString();

          loginTime.email=user.email;
          loginTime.time=time;
          loginTime.date=date;

          //save to db
          loginTime.save(function(err) {});

        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
//end authenticate/////////////////////////////////////////////////////////////////

apiRoutes.post('/forgot', function(req, res) {

    //if email in DB send password in email.
    User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Email not found.'});
    } else {
     //send email
      res.send({success: false, msg: 'Email Sent To your email address.'});

       //send pass

        //Update to different mail delivery service
        /*var mailOptions = {
            from: 'HACCP <haccpapzpass@gmail.com>',
            to: 'haccpapzpass@gmail.com',
            subject:'Password Request',
            text:'test text',
            html:'<p>Password Here</p>'
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });*/



        }//end else
    });

});
//end forgot///////////////////////////////////////////////////////////////////////

apiRoutes.post('/fitnessToWork', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {

          var fitness = new Fitness();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
          var fitVal =fitnessValidation(req.body.q1,req.body.q2,req.body.q3,req.body.q4,
            req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9,req.body.q10,
            req.body.q11,req.body.q12);

          if (fitVal) {
            fitness.email=user.email;
            fitness.q1EmpName=req.body.q1;
            fitness.q2DateOfAssessment=req.body.q2;
            fitness.q3ReasonForAssessment=req.body.q3;
            fitness.q4=req.body.q4;
            fitness.q5=req.body.q5;
            fitness.q6=req.body.q6;
            fitness.q7=req.body.q7;
            fitness.q8=req.body.q8;
            fitness.q9=req.body.q9;
            fitness.q10ActionTaken=req.body.q10;
            fitness.q11OwnerManager=req.body.q11;
            fitness.q12DateSigned=req.body.q12;

            //save to db
            fitness.save(function(err) {
              if (err)
                  res.send(err);

            res.json({success: true, msg: 'Form Saved'});
          });
        }//end if Fitval
        else {
          res.send({success: false, msg: 'Not enough information provided.'});
        }//end Else

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end Fitness/////////////////////////////////////////////////////////////////////

//Get Settings
apiRoutes.get('/settings', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get settings
          Settings.findOne({
            email: user.email
          }, function (err, settings) {
            if (err) throw err;
            if (!settings) {
              return res.status(403).send({success: false, msg: 'Settings not found.'});
            } else {

            //return settings
            res.json({success: true, msg: 'Here are the settings for ' + user.email + '!',
            Nofridges:settings.noOfRef});
            //console.log(settings.noOfRef);

          }
          })
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getSettings////////////////////////////////////////////////////////////////////

//First time setup only
apiRoutes.post('/settings', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {


          var settings = new Settings();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
            var valid = settingsValidation(req.body.noOfRef);

            if (valid) {
              //save user.email in settings
              settings.email=user.email;

              settings.noOfRef=req.body.noOfRef;

              //save to db
              settings.save(function(err) {
                if (err)
                    res.send(err);
                    res.json({success: true, msg: 'Settings Saved'});
              });
            }//end ifValid
            else {
              return res.status(403).send({success: false, msg: 'Incorrect info provided.'});
            }

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end postSettings/////////////////////////////////////////////////////////////////////

//Update settings with PUT
apiRoutes.put('/settings', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get settings
          Settings.findOne({
            email: user.email
          }, function (err, settings) {
            if (err) throw err;
            if (!settings) {
              return res.status(403).send({success: false, msg: 'Settings not found.'});
            } else {

              var valid = settingsValidation(req.body.noOfRef);

              if (valid) {
                //update settings
                settings.noOfRef=req.body.noOfRef;

                //save to db
                settings.save(function(err) {
                  if (err)
                      res.send(err);
                      res.json({success: true, msg: 'Settings Updated'});
                });
              }//end ifValid
              else {
                return res.status(403).send({success: false, msg: 'Incorrect info provided.'});
              }

          }
          })
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end /////////////////////////////////////////////////////////////////////

apiRoutes.post('/refridgeration', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {


          var refridgeration = new Refridgeration();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
          var refVal =refridgerationValidation(req.body.tempAM,req.body.tempPM);

          if (refVal) {

            refridgeration.email=user.email;
            refridgeration.name=req.body.name;
            refridgeration.tempAM=req.body.tempAM;
            refridgeration.tempPM=req.body.tempPM;
            refridgeration.date=req.body.date;

            //save to db
            refridgeration.save(function(err) {
              if (err)
                  res.send(err);

            res.json({success: true, msg: 'Temp Saved'});
          });
        }//end if
        else {
          res.send({success: false, msg: 'Not enough information provided.'});
        }//end Else

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end refridgeration/////////////////////////////////////////////////////////////////////

apiRoutes.post('/hothold', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {


          var hothold = new Hothold();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
          var hotholdVal =hotholdValidation(req.body.date,req.body.food,req.body.time,req.body.firstTemp,req.body.secondTemp,req.body.thirdTemp,req.body.comment,req.body.sign);

          if (hotholdVal) {

            hothold.email=user.email;
            hothold.date=req.body.date;
            hothold.food=req.body.food;
            hothold.time=req.body.time;
            hothold.firstTemp=req.body.firstTemp;
            hothold.secondTemp=req.body.secondTemp;
            hothold.thirdTemp=req.body.thirdTemp;
            hothold.comment=req.body.comment;
            hothold.sign=req.body.sign;
            hothold.checkon=req.body.checkon;
            hothold.managersign=req.body.managersign;


            //save to db
            hothold.save(function(err) {
              if (err)
                  res.send(err);

            res.json({success: true, msg: 'Temp Saved'});
          });
        }//end if
        else {
          res.send({success: false, msg: 'Not enough information provided.'});
        }//end Else

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end hothold/////////////////////////////////////////////////////////////////////

apiRoutes.post('/suppliers', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {


          var suppliers = new Supplier();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
            var valid = supplierValidation(req.body.Supplier1,req.body.Supplier2);

            if (valid) {
              //save user.email in settings
              suppliers.email=user.email;
              suppliers.Supplier1=req.body.Supplier1;
              suppliers.Supplier2=req.body.Supplier2;
              suppliers.Supplier3=req.body.Supplier3;
              suppliers.Supplier4=req.body.Supplier4;
              suppliers.Supplier5=req.body.Supplier5;
              suppliers.Supplier6=req.body.Supplier6;
              suppliers.Supplier7=req.body.Supplier7;
              suppliers.Supplier8=req.body.Supplier8;
              suppliers.Supplier9=req.body.Supplier9;
              suppliers.Supplier10=req.body.Supplier10;

              //save to db
              suppliers.save(function(err) {
                if (err)
                    res.send(err);
                    res.json({success: true, msg: 'Suppliers Saved'});
              });
            }//end ifValid
            else {
              res.send({success: false, msg: 'Not enough information provided.'});
            }

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end postsuppliers/////////////////////////////////////////////////////////////////////

apiRoutes.get('/suppliers', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get settings
          Supplier.findOne({
            email: user.email
          }, function (err, supplier) {
            if (err) throw err;
            if (!supplier) {
              return res.status(403).send({success: false, msg: 'Suppliers not found.'});
            } else {

              //console.log(supplier.supplierName);

            //return settings
            res.json({Supplier1:supplier.Supplier1,
          Supplier2:supplier.Supplier2,Supplier3:supplier.Supplier3,Supplier4:supplier.Supplier4,
          Supplier5:supplier.Supplier5,Supplier6:supplier.Supplier6,Supplier7:supplier.Supplier7,
          Supplier8:supplier.Supplier8,Supplier9:supplier.Supplier9,Supplier10:supplier.Supplier10,});
          }
          })
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getSuppliers////////////////////////////////////////////////////////////////////

apiRoutes.put('/suppliers', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get settings
          Supplier.findOne({
            email: user.email
          }, function (err, suppliers) {
            if (err) throw err;
            if (!suppliers) {
              return res.status(403).send({success: false, msg: 'Suppliers not found.'});
            } else {

              var valid = supplierValidation(req.body.Supplier1);

              if (valid) {
                //update supplier
                suppliers.Supplier1=req.body.Supplier1;
                suppliers.Supplier2=req.body.Supplier2;
                suppliers.Supplier3=req.body.Supplier3;
                suppliers.Supplier4=req.body.Supplier4;
                suppliers.Supplier5=req.body.Supplier5;
                suppliers.Supplier6=req.body.Supplier6;
                suppliers.Supplier7=req.body.Supplier7;
                suppliers.Supplier8=req.body.Supplier8;
                suppliers.Supplier9=req.body.Supplier9;
                suppliers.Supplier10=req.body.Supplier10;

                //save to db
                suppliers.save(function(err) {
                  if (err)
                      res.send(err);
                      res.json({success: true, msg: 'Suppliers Updated'});
                });
              }//end ifValid
              else {
                res.send({success: false, msg: 'Not enough information provided.'});
              }

          }
          })
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end putSuppliers/////////////////////////////////////////////////////////////////////

apiRoutes.post('/hygieneInspection', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {
          var hygieneInspection = new HygieneInspection();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
          var hygVal =hygInspectionValidation(req.body.date,req.body.frequency,req.body.name,req.body.position,req.body.sign,req.body.q1 ,req.body.q2,req.body.q3 ,req.body.q4,req.body.q5,req.body.q6,req.body.q7,req.body.q8,req.body.q9 ,req.body.q10,req.body.q11,req.body.q12,req.body.q13,req.body.q14,req.body.q15,req.body.q16,req.body.q17,req.body.q18,req.body.q19,req.body.q20,req.body.q21,req.body.q22,req.body.q23,req.body.q24,req.body.q25,req.body.q26,req.body.q27,req.body.q28,req.body.q29,req.body.q30,req.body.q31,req.body.q32,req.body.q33,req.body.q34,req.body.q35,req.body.q36,req.body.q37,req.body.q38,req.body.q39,req.body.q40,req.body.q41,req.body.q42,req.body.q43,req.body.q44,req.body.q45);

          if (hygVal) {
            hygieneInspection.email=user.email;
            hygieneInspection.q1    =req.body.q1.selection;
            hygieneInspection.action1 =req.body.q1.action;
            hygieneInspection.q2    =req.body.q2.selection;
            hygieneInspection.action2 =req.body.q2.action;
            hygieneInspection.q3    =req.body.q3.selection;
            hygieneInspection.action3 =req.body.q3.action;
            hygieneInspection.q4    =req.body.q4.selection;
            hygieneInspection.action4 =req.body.q4.action;
            hygieneInspection.q5    =req.body.q5.selection;
            hygieneInspection.action5 =req.body.q5.action;
            hygieneInspection.q6    =req.body.q6.selection;
            hygieneInspection.action6 =req.body.q6.action;
            hygieneInspection.q7    =req.body.q7.selection;
            hygieneInspection.action7 =req.body.q7.action;
            hygieneInspection.q8    =req.body.q8.selection;
            hygieneInspection.action8 =req.body.q8.action;
            hygieneInspection.q9    =req.body.q9.selection;
            hygieneInspection.actio9  =req.body.q9.action;
            hygieneInspection.q10   =req.body.q10.selection;
            hygieneInspection.action10  =req.body.q10.action;
            hygieneInspection.q11   =req.body.q11.selection;
            hygieneInspection.action11  =req.body.q11.action;
            hygieneInspection.q12   =req.body.q12.selection;
            hygieneInspection.action12  =req.body.q12.action;
            hygieneInspection.q13   =req.body.q13.selection;
            hygieneInspection.action13  =req.body.q13.action;
            hygieneInspection.q14   =req.body.q14.selection;
            hygieneInspection.action14  =req.body.q14.action;
            hygieneInspection.q15   =req.body.q15.selection;
            hygieneInspection.action15  =req.body.q15.action;
            hygieneInspection.q16   =req.body.q16.selection;
            hygieneInspection.action16  =req.body.q16.action;
            hygieneInspection.q17   =req.body.q17.selection;
            hygieneInspection.action17  =req.body.q17.action;
            hygieneInspection.q18   =req.body.q18.selection;
            hygieneInspection.action18  =req.body.q18.action;
            hygieneInspection.q19   =req.body.q19.selection;
            hygieneInspection.actio19 =req.body.q19.action;
            hygieneInspection.q20   =req.body.q20.selection;
            hygieneInspection.action20  =req.body.q20.action;
            hygieneInspection.q21        =req.body.q21.selection;
            hygieneInspection.action21   =req.body.q21.action;
            hygieneInspection.q22        =req.body.q22.selection;
            hygieneInspection.action22   =req.body.q22.action;
            hygieneInspection.q23        =req.body.q23.selection;
            hygieneInspection.action23   =req.body.q23.action;
            hygieneInspection.q24        =req.body.q24.selection;
            hygieneInspection.action24   =req.body.q24.action;
            hygieneInspection.q25        =req.body.q25.selection;
            hygieneInspection.action25   =req.body.q25.action;
            hygieneInspection.q26        =req.body.q26.selection;
            hygieneInspection.action26   =req.body.q26.action;
            hygieneInspection.q27        =req.body.q27.selection;
            hygieneInspection.action27   =req.body.q27.action;
            hygieneInspection.q28        =req.body.q28.selection;
            hygieneInspection.action28   =req.body.q28.action;
            hygieneInspection.q29       =req.body.q29.selection;
            hygieneInspection.action29    =req.body.q29.action;
            hygieneInspection.q30       =req.body.q30.selection;
            hygieneInspection.action30  =req.body.q30.action;
            hygieneInspection.q31        =req.body.q31.selection;
            hygieneInspection.action31   =req.body.q31.action;
            hygieneInspection.q32        =req.body.q32.selection;
            hygieneInspection.action32   =req.body.q32.action;
            hygieneInspection.q33        =req.body.q33.selection;
            hygieneInspection.action33   =req.body.q33.action;
            hygieneInspection.q34        =req.body.q34.selection;
            hygieneInspection.action34   =req.body.q34.action;
            hygieneInspection.q35        =req.body.q35.selection;
            hygieneInspection.action35   =req.body.q35.action;
            hygieneInspection.q36        =req.body.q36.selection;
            hygieneInspection.action36   =req.body.q36.action;
            hygieneInspection.q37        =req.body.q37.selection;
            hygieneInspection.action37   =req.body.q37.action;
            hygieneInspection.q38        =req.body.q38.selection;
            hygieneInspection.action38   =req.body.q38.action;
            hygieneInspection.q39       =req.body.q39.selection;
            hygieneInspection.actio39   =req.body.q39.action;
            hygieneInspection.q40       =req.body.q40.selection;
            hygieneInspection.action40  =req.body.q40.action;
            hygieneInspection.q41        =req.body.q41.selection;
            hygieneInspection.action41   =req.body.q41.action;
            hygieneInspection.q42        =req.body.q42.selection;
            hygieneInspection.action42   =req.body.q42.action;
            hygieneInspection.q43        =req.body.q43.selection;
            hygieneInspection.action43   =req.body.q43.action;
            hygieneInspection.q44        =req.body.q44.selection;
            hygieneInspection.action44   =req.body.q44.action;
            hygieneInspection.q45        =req.body.q45.selection;
            hygieneInspection.action45   =req.body.q45.action;
            hygieneInspection.date       =req.body.date;
            hygieneInspection.frequency  =req.body.frequency;
            hygieneInspection.name       =req.body.name;
            hygieneInspection.position   =req.body.position;
            hygieneInspection.sign       =req.body.sign;

            //save to db
            hygieneInspection.save(function(err) {
              if (err)
                  res.send(err);

            res.json({success: true, msg: 'Form Saved'});
          });
        }//end if Fitval
        else {
          res.send({success: false, msg: 'Not enough information provided.'});
        }//end Else

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end hygieneInspection/////////////////////////////////////////////////////////////////////

apiRoutes.post('/hygieneTraining', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {


          var hygieneTraining = new HygieneTraining();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
          var hygVal =hygTrainingValidation(req.body.name,req.body.position,req.body.dateEmp,req.body.type,req.body.date,
            req.body.trainer,req.body.empsign,req.body.furthertraining,req.body.provider,
            req.body.furtherdate,req.body.empsignfurther,req.body.empsignfurther);

          if (hygVal) {
            hygieneTraining.email=user.email;
            hygieneTraining.name=req.body.name;
            hygieneTraining.position=req.body.position;
            hygieneTraining.dateOfEmployment=req.body.dateEmp;
            hygieneTraining.NatureOfTraining=req.body.type;
            hygieneTraining.date=req.body.date;
            hygieneTraining.trainer=req.body.trainer;
            hygieneTraining.EmployeeSignature=req.body.empsign;
            hygieneTraining.furtherTrainingNature=req.body.furthertraining;
            hygieneTraining.furtherProvider=req.body.provider;
            hygieneTraining.furtherDateCompeted=req.body.furtherdate;
            hygieneTraining.furtherEmpSig=req.body.empsignfurther;
            hygieneTraining.furtherEmployeeSig=req.body.empsignfurther;

            //save to db
            hygieneTraining.save(function(err) {
              if (err)
                  res.send(err);

            res.json({success: true, msg: 'Form Saved'});
          });
        }//end if Fitval
        else {
          res.send({success: false, msg: 'Not enough information provided.'});
        }//end Else

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end hygieneTraining/////////////////////////////////////////////////////////////////////

apiRoutes.post('/transport', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {


          var transport = new Transport();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
          var transportVal =transportValidation(req.body.date,req.body.food,req.body.batch,req.body.customer,req.body.separation,req.body.temp,req.body.sign);

          if (transportVal) {
            transport.email=user.email;
            transport.date= req.body.date;
            transport.food=req.body.food;
            transport.batch=req.body.batch;
            transport.customer=req.body.customer;
            transport.separation=req.body.separation;
            transport.temp=req.body.temp;
            transport.comment=req.body.comment;
            transport.sign=req.body.sign;
            transport.checkon=req.body.checkon;
            transport.managersign=req.body.managersign;
            transport.lat=req.body.lat;
            transport.long=req.body.long;
			
			      //console.log("lat: "+req.body.lat);
			      //console.log("long: "+req.body.long);

            //save to db
            transport.save(function(err) {
              if (err)
                  res.send(err);

            res.json({success: true, msg: 'Form Saved'});
          });
        }//end if Fitval
        else {
          res.send({success: false, msg: 'Not enough information provided.'});
        }//end Else

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end transport/////////////////////////////////////////////////////////////////////

apiRoutes.post('/refridgerationUnit', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {


          var refridgerationUnit = new RefridgerationUnit();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
          var refVal =refridgerationUnitValidation(req.body.name1);

          if (refVal) {
            refridgerationUnit.email=user.email;
            refridgerationUnit.name1=req.body.name1;
            refridgerationUnit.name2=req.body.name2;
            refridgerationUnit.name3=req.body.name3;
            refridgerationUnit.name4=req.body.name4;
            refridgerationUnit.name5=req.body.name5;
            refridgerationUnit.name6=req.body.name6;

            //save to db
            refridgerationUnit.save(function(err) {
              if (err)
                  res.send(err);

            res.json({success: true, msg: 'Refridgeration Unit Saved'});
          });
        }//end if
        else {
          res.send({success: false, msg: 'Not enough information provided.'});
        }//end Else

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end refridgerationUnit /////////////////////////////////////////////////////////////////////

apiRoutes.put('/refridgerationUnit', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get settings
          RefridgerationUnit.findOne({
            email: user.email
          }, function (err, refridgerationUnit) {
            if (err) throw err;
            if (!refridgerationUnit) {
              return res.status(403).send({success: false, msg: 'Units not found.'});
            } else {

              var valid = refridgerationUnitValidation(req.body.Fridge1);

              if (valid) {

                refridgerationUnit.name1=req.body.Fridge1;
                refridgerationUnit.name2=req.body.Fridge2;
                refridgerationUnit.name3=req.body.Fridge3;
                refridgerationUnit.name4=req.body.Fridge4;
                refridgerationUnit.name5=req.body.Fridge5;
                refridgerationUnit.name6=req.body.Fridge6;

                //save to db
                refridgerationUnit.save(function(err) {
                  if (err)
                      res.send(err);
                      res.json({success: true, msg: 'Units Updated'});
                });
              }//end ifValid
              else {
                return res.status(403).send({success: false, msg: 'Incorrect info provided.'});
              }

          }
          })
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end refridgerationUnit /////////////////////////////////////////////////////////////////////

apiRoutes.get('/refridgerationUnit', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

       if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get refUnits
          RefridgerationUnit.findOne({
            email: user.email
          }, function (err, refridgerationUnit) {
            if (err) throw err;
            if (!refridgerationUnit) {
              res.status(403).send({success: false, msg: 'RefridgerationUnits not found.'});
            } else {

            //return settings
            res.json({
            Fridge1:refridgerationUnit.name1,Fridge2:refridgerationUnit.name2,
            Fridge3:refridgerationUnit.name3,Fridge4:refridgerationUnit.name4,
            Fridge5:refridgerationUnit.name5,Fridge6:refridgerationUnit.name6});

          }
          })

        }//end Else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end refridgerationUnit /////////////////////////////////////////////////////////////////////

apiRoutes.post('/temperature', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {


          var temperature = new Temperature();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
          var temperatureVal =temperatureValidation(req.body.date,req.body.food,req.body.startTime,req.body.finishTime,req.body.cookTemp,req.body.cookSign,req.body.fridgeTime, req.body.coolSign,req.body.reheatTemp,req.body.reheatSign,req.body.comment);

          if (temperatureVal) {

            temperature.email=user.email;
            temperature.date=req.body.date;
            temperature.food=req.body.food;
            temperature.startTime=req.body.startTime;
            temperature.finishTime=req.body.finishTime;
            temperature.cookTemp=req.body.cookTemp;
            temperature.cookSign=req.body.cookSign;
            temperature.fridgeTime=req.body.fridgeTime;
            temperature.coolSign=req.body.coolSign;
            temperature.reheatTemp=req.body.reheatTemp;
            temperature.reheatSign=req.body.reheatSign;
            temperature.comment=req.body.comment;
            temperature.checkon=req.body.checkon;
            temperature.managersign=req.body.managersign;

            //save to db
            temperature.save(function(err) {
              if (err)
                  res.send(err);

            res.json({success: true, msg: 'Temperature Record Saved'});
          });
        }//end if
        else {
          res.send({success: false, msg: 'Not enough information provided.'});
        }//end Else

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end temperature/////////////////////////////////////////////////////////////////////

apiRoutes.post('/food', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {


          var food = new Food();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
            var valid = foodValidation(req.body.Food1);

            if (valid) {
              //save user.email in settings
              food.email=user.email;
              food.Food1=req.body.Food1;
              food.Food2=req.body.Food2;
              food.Food3=req.body.Food3;
              food.Food4=req.body.Food4;
              food.Food5=req.body.Food5;
              food.Food6=req.body.Food6;
              food.Food7=req.body.Food7;
              food.Food8=req.body.Food8;
              food.Food9=req.body.Food9;
              food.Food10=req.body.Food10;

              //save to db
              food.save(function(err) {
                if (err)
                    res.send(err);
                    res.json({success: true, msg: 'Food Saved'});
              });
            }//end ifValid
            else {
              res.send({success: false, msg: 'Not enough information provided.'});
            }

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end postfood/////////////////////////////////////////////////////////////////////

apiRoutes.get('/food', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get settings
          Food.findOne({
            email: user.email
          }, function (err, food) {
            if (err) throw err;
            if (!food) {
              return res.status(403).send({success: false, msg: 'food not found.'});
            } else {

            //return settings
            res.json({Food1:food.Food1,
          Food2:food.Food2,Food3:food.Food3,Food4:food.Food4,
          Food5:food.Food5,Food6:food.Food6,Food7:food.Food7,
          Food8:food.Food8,Food9:food.Food9,Food10:food.Food10});
          }
          })
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end food////////////////////////////////////////////////////////////////////

apiRoutes.put('/food', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get settings
          Food.findOne({
            email: user.email
          }, function (err, food) {
            if (err) throw err;
            if (!food) {
              return res.status(403).send({success: false, msg: 'Food not found.'});
            } else {

              var valid = foodValidation(req.body.Food1);

              if (valid) {
                //update food
                food.Food1=req.body.Food1;
                food.Food2=req.body.Food2;
                food.Food3=req.body.Food3;
                food.Food4=req.body.Food4;
                food.Food5=req.body.Food5;
                food.Food6=req.body.Food6;
                food.Food7=req.body.Food7;
                food.Food8=req.body.Food8;
                food.Food9=req.body.Food9;
                food.Food10=req.body.Food10;

                //save to db
                food.save(function(err) {
                  if (err)
                      res.send(err);
                      res.json({success: true, msg: 'Food Updated'});
                });
              }//end ifValid
              else {
                res.send({success: false, msg: 'Not enough information provided.'});
              }

          }
          })
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end putfood/////////////////////////////////////////////////////////////////////

apiRoutes.get('/getFitnessToWork', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {

          //get Forms
          Fitness.
            find({'email': decoded.email}, function (err, fitforms) {
              if(err) {
                return res.status(403).send({success: false});
                }
              else{
              //return forms
              //return res.status(200).send({forms:fitforms});
          //return res.status(200).send(fitforms);
          return res.status(200).json(fitforms);
              }
            });//end getForms

        }//end else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getFitnessToWork////////////////////////////////////////////////////////////////////

apiRoutes.post('/fridgetemp', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {


          var refridgeration = new Refridgeration();

          //add validation here for data coming from ionic to make sure is correct and has all required fields
          var refVal =refridgerationValidation(req.body.temp);

          if (refVal) {

            refridgeration.email=user.email;
            refridgeration.name=req.body.name;
            refridgeration.temp=req.body.temp;
            refridgeration.timeAMPM=req.body.timeAMPM;
            refridgeration.date=req.body.date;

            //save to db
            refridgeration.save(function(err) {
              if (err)
                  res.send(err);

            res.json({success: true, msg: 'Fridge Temp Saved'});
          });
        }//end if
        else {
          res.send({success: false, msg: 'Not enough information provided.'});
        }//end Else

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end fridgetemp/////////////////////////////////////////////////////////////////////

apiRoutes.get('/getFridgetemp', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get Forms
          Refridgeration.
            find({'email': decoded.email}, function (err, tempforms) {
              if(err) {
                return res.status(403).send({success: false});
                }
              else{
              //return forms
              return res.status(200).json(tempforms);
              }
            });//end getForms
        }//end else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getFridgetemp////////////////////////////////////////////////////////////////////

apiRoutes.get('/getTransport', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get Forms
          Transport.
            find({'email': decoded.email}, function (err, Transportforms) {
              if(err) {
                return res.status(403).send({success: false});
                }
              else{
                //return forms
                return res.status(200).json(Transportforms);
              }
            });//end getForms

        }//end else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getTransport//////////////////////////////////////////////////////////////////////////////

apiRoutes.get('/getTempRecords', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get Forms
          Temperature.
            find({'email': decoded.email}, function (err, Temperatureforms) {
              if(err) {
                return res.status(403).send({success: false});
                }
              else{
                //return forms
                return res.status(200).json(Temperatureforms);
              }
            });//end getForms

        }//end else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getTempRecords//////////////////////////////////////////////////////////////////////////////

apiRoutes.get('/getHothold', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get Forms
          Hothold.
            find({'email': decoded.email}, function (err, Hotholdforms) {
              if(err) {
                return res.status(403).send({success: false});
                }
              else{
                //return forms
                return res.status(200).json(Hotholdforms);
              }
            });//end getForms

        }//end else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getHothold//////////////////////////////////////////////////////////////////////////////

apiRoutes.get('/getHygieneInspection', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get Forms
          HygieneInspection.
            find({'email': decoded.email}, function (err, HygieneInspectionforms) {
              if(err) {
                return res.status(403).send({success: false});
                }
              else{
                //return forms
                return res.status(200).json(HygieneInspectionforms);
              }
            });//end getForms

        }//end else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getHygieneInspection//////////////////////////////////////////////////////////////////////////////

apiRoutes.get('/getHygieneTraining', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get Forms
          HygieneTraining.
            find({'email': decoded.email}, function (err, HygieneTrainingforms) {
              if(err) {
                return res.status(403).send({success: false});
                }
              else{
                //return forms
                return res.status(200).json(HygieneTrainingforms);
              }
            });//end getForms

        }//end else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getHygieneInspection//////////////////////////////////////////////////////////////////////////////

apiRoutes.get('/getfood', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get settings
          Food.findOne({
            email: user.email
          }, function (err, food) {
            if (err) throw err;
            if (!food) {
              return res.status(403).send({success: false, msg: 'food not found.'});
            } else {

            //return settings
            return res.status(200).json([food]);
          }
          })
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getfood////////////////////////////////////////////////////////////////////

apiRoutes.get('/getrefridgerationUnit', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

       if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get refUnits
          RefridgerationUnit.findOne({
            email: user.email
          }, function (err, refridgerationUnit) {
            if (err) throw err;
            if (!refridgerationUnit) {
              res.status(403).send({success: false, msg: 'RefridgerationUnits not found.'});
            } else {

            //return settings
            return res.status(200).json([refridgerationUnit]);

          }
          })

        }//end Else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getRefridgerationUnit /////////////////////////////////////////////////////////////////////

apiRoutes.get('/getsuppliers', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get settings
          Supplier.findOne({
            email: user.email
          }, function (err, supplier) {
            if (err) throw err;
            if (!supplier) {
              return res.status(403).send({success: false, msg: 'Suppliers not found.'});
            } else {

            //return settings
             return res.status(200).json([supplier]);
          }
          })
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getSuppliers////////////////////////////////////////////////////////////////////

apiRoutes.get('/getFoodDelivery', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          //get Forms
          Delivery.
            find({'email': decoded.email}, function (err, Deliveryforms) {
              if(err) {
                return res.status(403).send({success: false});
                }
              else{
                //return forms
                return res.status(200).json(Deliveryforms);
              }
            });//end getForms

        }//end else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getFoodDelivery//////////////////////////////////////////////////////////////////////////////

apiRoutes.post('/foodDelivery',upload.single('photo'), passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed.'});
        } else {
			
			//console.log(req.body);
			//console.log(req.body.photo);
			
			var foodDelivery = new Delivery();

			//add validation here for data coming from ionic to make sure is correct and has all required fields
			var foodDelVal =foodDeliveryValidation(req.body.date,req.body.food);
		
			

			if(foodDelVal){
				
				foodDelivery.email=user.email;
				foodDelivery.date=req.body.date;
				foodDelivery.food=req.body.food;
				foodDelivery.batchCode=req.body.batchCode;
				foodDelivery.supplier=req.body.supplier;
				foodDelivery.useBy=req.body.useBy;
				foodDelivery.temp=req.body.temp;
				foodDelivery.vehicleCheck=req.body.vehicleCheck;
				foodDelivery.comment=req.body.comment;
				foodDelivery.sign=req.body.sign;
				foodDelivery.lat=req.body.lat;
				foodDelivery.long=req.body.long;

				if(req.body.photo != ""){
					foodDelivery.photo=req.body.photo;
					foodDelivery.photoComment=req.body.photoComment;
				}
				

            //save to db
            foodDelivery.save(function(err) {
              if (err)
                  res.send(err);

				res.json({success: true, msg: 'Form Saved'});
			  });

        }//end if 
      
        else {
          res.send({success: false, msg: 'Error Saving Form.'});
        }//end Else

        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end FoodDeliveryPhoto/////////////////////////////////////////////////////////////////////

apiRoutes.get('/getDeliveryTrend', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {		
          var validForms=[];
          var results=[];
          var willQueryFood=0;
          
          var queryDate = req.query.date;
          var months = req.query.months;
          var queryFood = req.query.food;

          var lat = req.query.lat;
          var lng = req.query.lng;
          var km = req.query.km;
          
      
          if(queryDate){
            var queryDate = new Date(queryDate);
            if(queryDate=="Invalid Date"){
              var queryDate = new Date();
            }
          }
          else{
            var queryDate = new Date();
          }
          
          if(!months){
            months=6;
          }

          if(!km){
            km=30;
          }

          if(!lat||!lng){
            console.log("No lat or long Provided");
          }
          
          if(queryFood){
            //dont filter by food type
            willQueryFood=1;
          }
						
          //sets date back 6 months
          queryDate.setMonth(queryDate.getMonth() - months);
			
			    deliveryAnalysis().then(function(forms) {
            //loop forms
            for (i = 0; i < forms.length; i++) {	
              var date = new Date(forms[i].date);

              //if date newer than query date
              if(date>queryDate){	
                //add to valid array
                validForms.push(forms[i]);	
              }
            
          }//end if date
          
          var centerpoint={}
          centerpoint.lat=lat;
          centerpoint.lng=lng;

          //loop forms with valid date
          for (i = 0; i < validForms.length; i++) {
            var tempForm = {};
			
            var querypoint={}
            querypoint.lat=validForms[i].lat;
            querypoint.lng=validForms[i].long;

            //check if within radius 
            if(isPointWithinRadius(querypoint,centerpoint,km)){
				//if searching for food type
				if(willQueryFood==1){
				  //all where query food matches forms food
				  if(forms[i].food==queryFood){
					tempForm.date=forms[i].date;
					tempForm.food=forms[i].food;
					results.push(tempForm);
				  }//end if	
				}//end if
				//if not seatching for food type add all
				else{
				  tempForm.date=forms[i].date;
				  tempForm.food=forms[i].food;
				  results.push(tempForm);
				}//end else
				  
			}//end if within range 
				  
    }//for
		  
		  if(results.length==0){
			  return res.status(200).send({success: false, msg: 'Nothing found.'});
		  }
		  return res.status(200).json(results);
		});//end then	
      }//end else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getDeliveryTrend//////////////////////////////////////////////////////////////////////////////

apiRoutes.get('/getFormDate', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {		
          var p1 = getDelivery(user.email);
          var p2 = getFitness(user.email);
          var p3 = getRefridgeration(user.email);
          var p4 = getHothold(user.email);
          var p5 = getHygieneInspection(user.email);
          var p6 = getHygieneTraining(user.email);
          var p7 = getTransport(user.email);
          var p8 = getTemperature(user.email);

          Promise.all([p1, p2, p3, p4, p5, p6, p7, p8]).then(forms => { 
            var results=[];
            var temp={};     
            var tempforms=[];

            tempforms=forms[0];
            temp.DeliveryDate=tempforms[tempforms.length-1].date;

            tempforms=forms[1];
            temp.fitnessDate=tempforms[tempforms.length-1].q2DateOfAssessment;

            tempforms=forms[2];
            temp.RefridgerationDate=tempforms[tempforms.length-1].date;

            tempforms=forms[3];
            temp.HotholdDate=tempforms[tempforms.length-1].date;

            tempforms=forms[4];
            temp.HygieneInspectionDate=tempforms[tempforms.length-1].date;

            tempforms=forms[5];
            temp.TemperatureDate=tempforms[tempforms.length-1].date;

            tempforms=forms[6];
            temp.TransportDate=tempforms[tempforms.length-1].date;

            tempforms=forms[7];
            temp.TemperatureDate=tempforms[tempforms.length-1].date;

            results.push(temp);

            if(results.length==0){
			        return res.status(200).send({success: false, msg: 'Nothing found.'});
            }
            
            return res.status(200).json(results);
          });//end then
        }//end else
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
//end getFormDate///////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
//Init + Start Server
////////////////////////////////////////////////////////////////////////////////////////////////

// connect the api routes under /api/*
app.use('/api', apiRoutes);

// Start the server
app.listen(port);
console.log('Server live on: http://localhost:' + port);

////////////////////////////////////////////////////////////////////////////////////////////////
//Functions and Validation 
////////////////////////////////////////////////////////////////////////////////////////////////
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

function settingsValidation(noOfRef) {
  if (!noOfRef) {
    return false;
  }
  else {
    return true;
  }
}//End settingsValidation

function fitnessValidation(q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12) {
  if (!q1||q2==null||!q3||!q4||!q8||!q9||!q10||!q11||q12==null) {
    return false;
  }
  else {
    return true;
  }
}//End fitnessValidation

function refridgerationValidation(temp) {
  if (!temp) {
    return false;
  }
  else {
    return true;
  }
}//End refridgerationValidation

function hotholdValidation(date,food,time,firstTemp,secondTemp,thirdTemp,comment,sign) {
  if (date==''||!food||time==''||!firstTemp||!secondTemp||!thirdTemp||!comment||!sign) {
    return false;
  }
  else {
    return true;
  }
}//End hotholdValidation

function hygInspectionValidation(date,frequency,name,position,sign,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18,q19,q20,q21,q22,q23,q24,q25,q26,q27,q28,q29,q30,q31,q32,q33,q34,q35,q36,q37,q38,q39,q40,q41,q42,q43,q44,q45) {
    //||!frequency
  if (!date||!name||!position||!sign||!q1||!q2||!q3||!q4||!q5||!q6||!q7||!q8||!q9||!q10||!q11||!q12||!q13||!q14||!q15||!q16||!q17||!q18||!q19||!q20||!q21||!q22||!q23||!q24||!q25||!q26||!q27||!q28||!q29||!q30||!q31||!q32||!q33||!q34||!q35||!q36||!q37||!q38||!q39||!q40||!q41||!q42||!q43||!q44||!q45) {
      console.log(date,name,position,sign,q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q21,q22,q23,q24,q25,q26,q27,q28,q29,q30,q31,q32,q33,q34,q35,q36,q37,q38,q39,q40,q41,q42,q43,q44,q45);
    return false;
  }
  else {
    return true;
  }
}//End hygInspectionValidation

function hygTrainingValidation( name,position,dateEmp,type,date,
            trainer,empsign,furthertraining,provider,
            furtherdate,empsignfurther,empsignfurther) {
  if (!name||!position||!dateEmp||!type||date==''||
              !trainer||!empsign||!furthertraining||!provider||
              !furtherdate||!empsignfurther||!empsignfurther) {
    return false;
  }
  else {
    return true;
  }
}//End hygTrainingValidation

function transportValidation(date,food,batch,customer,separation,temp,sign) {
  if (!date||!food||!batch||!customer||!separation||!temp||!sign) {
    return false;
  }
  else {
    return true;
  }
}//End transportValidation

function refridgerationUnitValidation(name) {
  if (!name) {
    return false;
  }
  else {
    return true;
  }
}//End refridgerationValidation

function getFridgesQuery(email){

   //RefridgerationUnit.find({ email: email});

   var query = RefridgerationUnit.find({ email: email});
   var promise = query.exec();
   promise.addBack(function (err, docs) {});

   //console.log(query);
   return query;
}

function temperatureValidation(date,food,startTime,finishTime,cookTemp,cookSign,fridgeTime,coolSign,reheatTemp,reheatSign,comment) {
  if (  date==''||!food||!startTime||!finishTime||!cookTemp||!cookSign||!fridgeTime||!coolSign||!reheatTemp||!reheatSign||!comment) {
    return false;
  }
  else {
    return true;
  }
}//End refridgerationValidation

function supplierValidation(Supplier1) {
  if (!Supplier1) {
    return false;
  }
  else {
    return true;
  }
}//End settingsValidation

function foodValidation(Food1) {
  if (!Food1) {
    return false;
  }
  else {
    return true;
  }
}//End settingsValidation

function createSettings(newEmail) {
  var newSupplier = new Supplier({
      email: newEmail
    });
    // save the user
    newSupplier.save(function(err) {});

    var newFood = new Food({
      email: newEmail
    });
    // save the user
    newFood.save(function(err) {});

    var newRefridgerationUnit = new RefridgerationUnit({
      email: newEmail
    });
    // save the user
    newRefridgerationUnit.save(function(err) {});
    
}//End createSettings

function foodDeliveryValidation(date,food) {
  if (date == "undefined" || date == "null" || food == "undefined" || food == "null") {
    return false;
  }
  else {
    return true;
  }
}//End foodDeliveryValidation

//returns true if checkpoint is within given km from centerpoint
function isPointWithinRadius(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

//Querys database and returns all delivery forms	
function deliveryAnalysis() {	
	var query = Delivery.find({});

	query.exec(function (err, forms) {
	  if (err) return handleError(err);
	});
	
	return query;
}//end deliveryAnalysis

//Querys database and returns all forms	by email
function getDelivery(email) {	
	var query = Delivery.find({email: email});

	query.exec(function (err, forms) {
	  if (err) return handleError(err);
	});
	
	return query;
}//end deliveryFroms

//Querys database and returns all forms	by email
function getFitness(email) {	
	var query = Fitness.find({email: email});

	query.exec(function (err, forms) {
	  if (err) return handleError(err);
	});
	
	return query;
}//end FitnessFroms

//Querys database and returns all forms	by email
function getRefridgeration(email) {	
	var query = Refridgeration.find({email: email});

	query.exec(function (err, forms) {
	  if (err) return handleError(err);
	});
	
	return query;
}//end getRefridgeration

//Querys database and returns all forms	by email
function getHothold(email) {	
	var query = Hothold.find({email: email});

	query.exec(function (err, forms) {
	  if (err) return handleError(err);
	});
	
	return query;
}//end getHothold

//Querys database and returns all forms	by email
function getHygieneInspection(email) {	
	var query = HygieneInspection.find({email: email});

	query.exec(function (err, forms) {
	  if (err) return handleError(err);
	});
	
	return query;
}//end getHygieneInspection

//Querys database and returns all forms	by email
function getHygieneTraining(email) {	
	var query = HygieneTraining.find({email: email});

	query.exec(function (err, forms) {
	  if (err) return handleError(err);
	});
	
	return query;
}//end getHygieneTraining

//Querys database and returns all forms	by email
function getTransport(email) {	
	var query = Transport.find({email: email});

	query.exec(function (err, forms) {
	  if (err) return handleError(err);
	});
	
	return query;
}//end getTransport

//Querys database and returns all forms by email
function getTemperature(email) {	
	var query = Temperature.find({email: email});

	query.exec(function (err, forms) {
	  if (err) return handleError(err);
	});
	
	return query;
}//end getTemperature
