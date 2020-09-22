const functions = require("firebase-functions");
const { uploadImage } = require("./handlers/imageHandler");
const app = require("express")();

const {
  getAllReview,
  deleteReview,
  updateReview,
  createReview,
} = require("./handlers/reviewHandles");

//Review Routes
app.get("/reviews", getAllReview);
app.post("/review", createReview);
app.put("/review/:id", updateReview);
app.delete("/review/:id", deleteReview);
app.post("/review/:id/uploadimg", uploadImage);

//Firebase functions
exports.api = functions.region("asia-south1").https.onRequest(app);

//admin
//user admin@firebase.com
//password admin@123
