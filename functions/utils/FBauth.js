const { admin } = require("./firebase");

module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split(" ")[1];
  } else {
    return res.status(403).json({ err: "Unauthorised" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      if (req.user.email === "admin@firebase.com") return next();
      else return res.status(403).json({ error: "Unauthorised" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json(err);
    });
};
