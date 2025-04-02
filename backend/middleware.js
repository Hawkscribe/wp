import jwt from 'jsonwebtoken';

const JWT_SECRET = "I love mumma";

export const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ msg: 'No token provided, authentication failed' });
        }

        // Verify the token
        const decodedData = jwt.verify(token, JWT_SECRET);

        req.userId = decodedData.id; // Attach the user ID to req
        next(); // Continue to the next middleware
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token, authentication failed' });
    }
};
