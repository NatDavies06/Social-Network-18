const connection = require('../config/connection');
const { user, thought } = require('../models');
const { username, email, thought } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Delete exsisting user
    await user.deleteMany({});
    // Delete exsisting thought
    await thought.deleteMany({});
    console.log();
    
    // Array to hold users and thoughts
    const users = [];
    const userThoughts = [];

    // Loop through user and thought data
    for (let i = 0; i < username.length; i++) {
        const userObj = {
          username: username[i],
          email: email[i],
        };
        const newUser = await users.create(userObj);
        users.push({
          _id: newUser._id.toString(),
          username: newUser.username,
        });
      }
    
      for (let i = 0; i < thought.length; i++) {
        const thoughtsObj = {
          username: username[i],
          thoughtText: thought[i],
        };
        const newThought = await thought.create(thoughtsObj);
        userThoughts.push({
          _id: newThought._id.toString(),
          username: newThought.username,
        });
      }
    
      // Attach seeded user data to seeded thought data
      for (let i = 0; i < userThoughts.length; i++) {
        const userId = users.filter(
          (user) => user.username === userThoughts[i].username
        );
        console.log("USER ID", userId);
        const updatedUser = await users.findOneAndUpdate(
          { _id: userId[0]._id },
          { $push: { thoughts: userThoughts[i]._id } },
          { new: true }
        );
        console.log(updatedUser);
      }
    
      console.info("================USERS & THEIR THOUGHTS SEEDED================");
   
      process.exit(0);
    });