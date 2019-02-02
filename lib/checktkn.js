const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    // Comprueba si viene Authorization y si contiene el string "Bearer " para partirlo en array y coger la pos [1], que es donde que todo lo que no sea el "Bearer "
    const token = req.headers.authorization && req.headers.authorization.includes("Bearer ") && req.headers.authorization.split("Bearer ")[1] || req.headers.authorization;

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).send();
        }

        // Si todo va OK metemos una prop a la petición (solo dura durante esta petición) para mandar el ID y el username que tiene el payload del JWT
        req.user = decoded;

        next();
    });

}