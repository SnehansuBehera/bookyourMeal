import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.SECRETKEY, {
        expiresIn: '30d'
    });

    // set JWT as an HTTP-Only Cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    })

    return token
}

export default generateToken