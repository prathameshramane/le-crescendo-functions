const functions = require("firebase-functions");
const { uploadImage } = require("./handlers/imageHandler");
const { loginAdmin } = require("./handlers/adminHandler");
const app = require("express")();

const {
  getAllReview,
  deleteReview,
  updateReview,
  createReview,
} = require("./handlers/reviewHandles");
const FBauth = require("./utils/FBauth");

//Review Routes
app.get("/reviews", getAllReview);
app.post("/review", FBauth, createReview);
app.put("/review/:id", FBauth, updateReview);
app.delete("/review/:id", FBauth, deleteReview);
app.post("/review/:id/uploadimg", FBauth, uploadImage);
app.post("/admin/login", loginAdmin);

//Firebase functions
exports.api = functions.region("asia-south1").https.onRequest(app);

//admin
//user admin@firebase.com
//password admin@123
