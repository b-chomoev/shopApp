import express from "express";
import {Error} from "mongoose";
import User from "../models/User";
import user from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";

const userRouter = express.Router();

userRouter.post('/register', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();
        await user.save();
        res.send({user, message: "Register success"});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

userRouter.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(404).send({error: 'Username not found'});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Password is wrong'});
            return;
        }

        user.generateToken();
        await user.save();
        res.send({message: 'Username and password are correct', user});
        return;
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

userRouter.post('/secret', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    res.send({message: 'Secret message from server', user: user});
});

export default userRouter;