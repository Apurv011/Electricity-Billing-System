require("dotenv").config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
//const stripe = require("stripe")(process.env.STRIPE_KEY);

const User = require('../models/user');

exports.signUp = (req, res, next) => {
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                var salt = bcrypt.genSaltSync(10)
                return bcrypt.hash(req.body.password, salt, null, (err, hash) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            zoneId: req.body.zoneId,
                            contactNo: req.body.contactNo,
                            address: req.body.address,
                            role: req.body.role
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
            const error = new Error();
            error.message = 'User Exists!';
            throw error;
        })
        .catch((error) => {
            console.log(error)
        });
};

exports.logIn = (req, res, next) => {
    let email = undefined, userId = undefined;
    User
        .find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    errror: "No user found!"
                });
            }
            email = user[0].email;
            userId = user[0]._id;
            return bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: email,
                            userId: userId
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "365d"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth Successful!',
                        token: token,
                        user: user[0],
                    });
                }
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            });
        })
        .catch(error => {
            next(error);
        });
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User
        .remove({ _id: userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User Deleted Successfully!'
            });
        })
        .catch(error => {
            error.message = 'Could Not Delete User!';
            next(error);
        });
};

// function createUser(email, hash) {
//     return new User({
//         _id: new mongoose.Types.ObjectId(),
//         email: email,
//         password: hash
//     });
// }

exports.getAllUsers = (req, res, next) => {
	User
		.find({ role: { $ne: "admin" } })
		.exec()
		.then(users => {
			const response = {
				count: users.length,
				users: users.map(user => {
					return {
						_id: user._id,
            uId: user.uId,
						email: user.email,
						name: user.name,
            contactNo: user.contactNo,
            address: user.address,
            role: user.role,
            zoneId: user.zoneId
					}
				})
			};
			res.status(200).json(response);
		})
		.catch(error => {
			next(error);
		})
};

exports.getOneUser = (req, res, next) => {
    const userId = req.params.userId;
    User
        .findById(userId)
        .select('_id uId email name contactNo role address zoneId')
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({
                    error: 'User not found',
                });
            }
            return res.status(200).json({
                user: result,
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
            });
        });
}

exports.getOneUserById = (req, res, next) => {
    const uId = req.params.uId;
    User
        .find({uId: uId})
        .select('_id uId email name contactNo role address zoneId')
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({
                    error: 'User not found',
                });
            }
            return res.status(200).json({
                user: result,
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err,
            });
        });
}

exports.editUser = (req, res, next) => {
    const userId = req.params.userId;

      User
          .update({ _id: userId }, { $set: req.body })
          .exec()
          .then(updatedUser => {
              res.status(200).json({
          message: 'Updated User Successfully!',
          user: updatedUser
        });
          })
          .catch(err => {
              next(err);
          });
}

exports.editUserPass = (req, res, next) => {
    const userId = req.params.userId;

    var salt = bcrypt.genSaltSync(10)
    return bcrypt.hash(req.body.password, salt, null, (err, hash) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                error: err
            });
        } else {
          User
              .update({ _id: userId }, { $set: {password: hash} })
              .exec()
              .then(updatedUser => {
                  res.status(200).json({
              message: 'Updated User Successfully!',
              user: updatedUser
            });
              })
              .catch(err => {
                  next(err);
              });
        }
    });
}


// exports.payment = async (req, res, next) => {
//   let error;
//   let status;
//
//   try {
//     const customer = await stripe.customers.create({
//       email: req.body.token.email,
//       source: req.body.token.id
//     });
//
//       const charge = await stripe.charges.create(
//         {
//           amount: req.body.billAmt*100,
//           currency: "inr",
//           customer: customer.id,
//           receipt_email: req.body.token.email,
//           description: "Payment Successful!",
//           shipping: {
//             name: req.body.token.card.name,
//             address: {
//               line1: req.body.token.card.address_line1,
//               line2: req.body.token.card.address_line2,
//               city: req.body.token.card.address_city,
//               country: req.body.token.card.address_country,
//               postal_code: req.body.token.card.address_zip
//             }
//           }
//         }
//       );
//       status = "success";
//   } catch (error) {
//     console.error("Error:", error);
//     status = "failure";
//   }
//
//   res.json({ error, status });
//}


exports.sendMail = (req, res, next) => {
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.MAIL,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({
          result: "Email Send Successfully",
      });
    }
  });
};
