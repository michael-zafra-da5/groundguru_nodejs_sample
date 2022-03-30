import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    return jwt.sign({ id }, "gR0unD@GuWu", { expiresIn: '1h' })
};
