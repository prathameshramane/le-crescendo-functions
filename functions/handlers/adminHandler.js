const { auth } = require("../utils/firebase");
const { validateLogin } = require("../utils/validators");

exports.loginAdmin = (req, res, next) => {
  const error = validateLogin(req.body);

  if (error.flag) return res.status(400).json(error);

  const email = req.body.email;
  const password = req.body.password;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token: token });
    })
    .catch((error) => {
      console.log(error);
      if (error.code === "auth/user-not-found")
        res
          .status(403)
          .json({ message: "Invalid Credentials", success: false });
      if (error.code === "auth/invalid-email")
        res
          .status(403)
          .json({ message: "Email is Invalid", success: false });
      if (error.code === "auth/wrong-password")
        res
          .status(403)
          .json({ message: "Password is Invalid", success: false });
      return res.status(500).json({ error: error.code });
    });
};
