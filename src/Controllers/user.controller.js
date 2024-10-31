import { User } from '../models/user.model.js'
import expressAsyncHandler from 'express-async-handler'
import generateToken from '../Config/generateToken.js'

//Login
const loginController = expressAsyncHandler(async (req, res) => {
    // console.log(req.body); //check
    
    const { name, password } = req.body;

    // check for all fields
    if (!name || !password) {
        res.send(400);
        throw  Error("All necessary input fields have not been filled");
    }

    const user = await User.findOne({ name })

    if (!user) {
        throw new Error("User does not exist")
    }

    
    // console.log("fetched user Data", user); //check

    const isPasswordValid = await user.matchPassword(password);

    // console.log("password valid :", isPasswordValid); //check

    if (!isPasswordValid) {
        throw new Error("Invalid user credentials")
    }

    if (user && isPasswordValid ) {
        const response = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        };

        console.log(response);
        res.json(response);
    } else {
        res.status(401);
        throw new Error("Invalid UserName or Password");
    }

})

//register

const registerController = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // check for all fields
    if (!name || !email || !password) {
        res.send(400);
        throw Error("All necessary input fields have not been filled");
    }

    // pre-existing user
    const existedUser = await User.findOne({
        $or: [{ name }, { email }]
    })

    if (existedUser) {
        res.send(409);
        throw new Error("User already Exists");
    }

    // userName already Taken
    const userNameExist = await User.findOne({ name });
    if (userNameExist) {
        res.send(406);
        throw new Error("UserName already taken");
    }

    // create an entry in the db

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Registration Error");
    }
})


//logout
const logoutController = expressAsyncHandler(async (req, res) => {
    try {
        // Assuming you have a token blacklist mechanism
        const token = req.headers.authorization.split(" ")[1];
        
        // Add the token to a blacklist (this is a conceptual example)
        await TokenBlacklist.add(token);

        res.status(200).send({ message: 'Successfully logged out' });
    } catch (error) {
        res.status(500).send({ message: 'An error occurred during logout' });
    }
})

//fetchAllUser

const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};
    
    const users = await User.find(keyword).find({
        _id: { $ne: req.user._id },
    });
    res.send(users);
})

export {
    loginController,
    registerController,
    fetchAllUsersController,
}