import { User } from "../models/index.js";

export const authController = {
    async register(req, res, next) {
        try {
            const { email, username, password } = req.body;

            if (!email || !username || !password) {
                throw new Error('Username, Email, and password are required');
            }

            const user = new User({
                email,
                username,
                password,
            });

            await user.save();

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                throw new Error('Username and password are required');
            }

            const user = await User.findOne({ username });

            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await user.matchPassword(password);

            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            res.status(200).json({
                message: 'Login successful',
                user: {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            next(error);
        }
    },
    async profile(req, res, next) {
        try {
          if (req.user) {
            res.json(req.user); 
          } else {
            return res.status(404).json({ error: 'User not found' });
          }
        } catch (error) {
          next(error); 
        }
      },
      
      
    

    async logout(req, res, next) {
        try {
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            next(error);
        }
    },
};
