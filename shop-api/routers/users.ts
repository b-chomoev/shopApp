import express from "express";
import {Error} from "mongoose";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";
import {OAuth2Client} from "google-auth-library";
import config from "../config";

const client = new OAuth2Client(config.google.clientId);
const userRouter = express.Router();

userRouter.post('/google', async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credentials,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            res.status(400).send({error: 'Invalid credentials. Google login failed.'});
            return;
        }

        const email = payload.email;
        const id = payload.sub; // Google ID
        const displayName = payload.name;

        if (!email) {
            res.status(400).send({error: 'No enough data from Google login'});
            return;
        }

        let user = await User.findOne({googleID: id});

        if (!user) {
            user = new User({
                username: email,
                password: crypto.randomUUID(),
                googleID: id,
                displayName: displayName,
            });
        }

        user.generateToken();
        await user.save();
        res.send({user, message: 'Google login success'});
    } catch (error) {
        next(error);
    }
});

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
            res.status(400).send({error: 'Username not found'});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Password is wrong!'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: 'Username and password is correct', user});

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

userRouter.delete('/sessions', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const userFromAuth = expressReq.user;

    try{
        const user = await User.findOne({_id: userFromAuth._id});
        if (user) {
            user.generateToken();
            await user.save();
            res.send({message: 'Success Log Out'});
        }
    } catch (error) {
        next(error);
    }
});

userRouter.post('/secret', auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;

    const user = expressReq.user;

    console.log(user);

    res.send({message: 'Secret material from Attractor', user: user});
});

export default userRouter;