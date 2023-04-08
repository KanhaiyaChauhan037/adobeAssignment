const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
     try {
          const user = new User(req.body);
          await user.save();
          res.status(201).json(user);
     } catch (error) {
          res.status(400).json({ message: error.message });
     }
};

// Get a user by id
exports.getUserById = async (req, res) => {
     try {
          const user = await User.findById(req.params.id);
          if (!user) throw Error('User not found');
          res.json(user);
     } catch (error) {
          res.status(404).json({ message: error.message });
     }
};

// Update a user by id
exports.updateUserById = async (req, res) => {
     try {
          const user = await User.findByIdAndUpdate(req.params.id, req.body, {
               new: true,
               runValidators: true,
          });
          if (!user) throw Error('User not found');
          res.json(user);
     } catch (error) {
          res.status(400).json({ message: error.message });
     }
};

// Delete a user by id
exports.deleteUserById = async (req, res) => {
     try {
          const user = await User.findByIdAndDelete(req.params.id);
          if (!user) throw Error('User not found');
          res.json({ message: 'User deleted successfully' });
     } catch (error) {
          res.status(400).json({ message: error.message });
     }
};

// Get the total number of users
exports.getTotalNumberOfUsers = async (req, res) => {
     try {
          const count = await User.countDocuments();
          res.json({ count });
     } catch (error) {
          res.status(500).json({ message: error.message });
     }
};

// Get the top 5 most active users based on the number of posts
exports.getTopActiveUsers = async (req, res) => {
     try {
          const topUsers = await User.aggregate([
               {
                    $lookup: {
                         from: 'posts',
                         localField: '_id',
                         foreignField: 'user_id',
                         as: 'posts',
                    },
               },
               {
                    $project: {
                         id: '$_id',
                         name: 1,
                         email: 1,
                         bio: 1,
                         created_at: 1,
                         updated_at: 1,
                         post_count: { $size: '$posts' },
                    },
               },
               { $sort: { post_count: -1 } },
               { $limit: 5 },
          ]);
          res.json(topUsers);
     } catch (error) {
          res.status(500).json({ message: error.message });
     }
};
