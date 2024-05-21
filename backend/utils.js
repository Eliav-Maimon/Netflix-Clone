import jwt from 'jsonwebtoken';

export const generateToken = ({ _id, username, email }) => {
    return jwt.sign({ _id: _id, username: username, email: email }, process.env.JWT_PW, { expiresIn: '7d' })
}

export const generatePWDToken = (_id, email, oldPassword) => {
    const secret = process.env.JWT_PW + oldPassword;
    return jwt.sign({ _id: _id, email: email }, secret, { expiresIn: '5m' })
}

export const isAuth = (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth) {
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_PW, (error, decode) => {
            if (error) {
                res.status(401).send({ message: error.message })
            }
            else {
                req.user = decode;
                next();
            }
        })
    }
    else {
        res.status(401).send({ message: "Not authorized, no token" });
    }
}

export function paginatedResults(model, filter, populateOptions) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let totalCount = await model.countDocuments().exec();

        if (limit > totalCount) {
            limit = 0;
        }

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {}

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        if (endIndex < totalCount) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        const contentQuery = model.find(filter).skip(startIndex).limit(limit);

        results.result = await contentQuery.populate(populateOptions).exec();

        res.paginatedResults = results;

        next();
    }
}