import { User } from "../models/index.js";
import jwtService from "../service/jwt.service.js"
const { UserJwt } = jwtService;
export const authController = {
    async register(req, res, next) {
        try {
            const { email, username, password } = req.body;

            if (!email || !username || !password) {
                throw new Error('Username, Email, and password are required');

            }
            const oldUser = await User.findOne({ email })
            if (oldUser) {
                return res.status(400).send({ message: "user olready exists" })
            }


            const user = await User.create({
                email,
                username,
                password,
            })
            console.log(user);
            
            // const user = new User({
            //     email,
            //     username,
            //     password,
            // });

            // await user.save();
            const payload = {
                id: user._id,
                email: user.email,
                role: "user"
            }

            const tokens = await UserJwt.generateTokens(payload)


            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id:user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
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
            const users = await User.find()
            return res.status(200).send(users)

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
