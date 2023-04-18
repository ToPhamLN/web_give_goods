const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.headers.token;
  const refreshToken = req.cookies.refreshToken;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            res.status(403).json("Token is not valid!");
        }
        req.user = user;
        // console.log(req.user);                     
        next();
    });
    } else {
        res.status(401).json("You're not authenticated");
    }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
        verifyToken(req, res, () => {
        if (req.user.id === req.params.id|| req.user.isAdmin) {
        next();
        } else {
        res.status(403).json("You're not allowed to do that!");
        }
    });
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You're not allowed to do that!");
        }
    });
};

const verifyTokenAndUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            return res.status(403).json({message: 'You are admin or not authorized'})
        } else {
            next();
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndUserAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndUser,
};