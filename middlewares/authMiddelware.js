import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

const protect = expressAsyncHandler(async(request, response, next) => {
    let token;
    
    if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
        try {
            token = request.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, "gR0unD@GuWu");
            request.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return response.status(401).json({
                error: 'Not Authorized, token failed.'
            });
        }
    }

    if(!token) {
        return response.status(401).json({
            error: 'Not Authorized, invalid token.'
        });
    }
});

export { protect };