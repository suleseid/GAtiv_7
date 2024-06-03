const User = require("../models/user");//This model is used to interact with the user data in the database.
const bcrypt = require("bcrypt");//This bcrypt librery used for hashing passwords to securely store them in the database.
const jwt = require("jsonwebtoken");//This jwt library is used for creating and verifying JSON Web Tokens,
                                     // which are used for secure user authentication.

// Controller function for user registration
exports.register = async (req, res) => {
  try {
    //This line checks if there is already a user in the database with the same email address provided in the request.
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");//If the email is already in use, this sends a response to the client 
    //with a status code of 400 (Bad Request) and a message saying "Email already exists".
    
    //This line generates a salt (a random string) to use for hashing the password.
    const salt = await bcrypt.genSalt(10);// bcrypt.genSalt(10) creates a salt with 10 rounds of processing.
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    
    const savedUser = await user.save();//This line tries to save the new user in the database.
    res.send({ user: user._id });//If saving the user works, this line sends back the new user's ID to the client.
  } catch (err) {
    res.status(400).send(err);//If there's a problem while saving, this part catches the error and
  } //sends a message to the client saying something went wrong.
  
  
};

// Controller function for user login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email not found");
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ "auth-token": token }); // Ensure correct response format
  } catch (err) {
    res.status(400).send(err);
  }
};
