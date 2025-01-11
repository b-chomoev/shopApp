import {NextFunction, Request, Response} from 'express';

export interface RequestWithSomething extends Request {
    something?: string;
}

const auth = (req: RequestWithSomething, res: Response, next: NextFunction) => {
    console.log('auth middleware');
    req.something = 'something';
    next();
};

export default auth;