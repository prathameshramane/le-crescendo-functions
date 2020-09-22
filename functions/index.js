const functions = require("firebase-functions");
const app = require("express")();

const {
  getAllReview,
  deleteReview,
  updateReview,
  createReview,
} = require("./handlers/reviewHandles");

//Review Routes
app.get("/reviews", getAllReview);
app.put("/review/:id", updateReview);
app.post("/create/review", createReview);
app.delete("/delete/:id", deleteReview);

//Firebase functions
exports.api = functions.region("asia-south1").https.onRequest(app);

//admin
//user admin@firebase.com
//password admin@123
