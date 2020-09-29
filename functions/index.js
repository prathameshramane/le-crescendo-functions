const functions = require("firebase-functions");
const { uploadReviewImage } = require("./handlers/reviewImageHandler");
const {uploadAchievementImage} = require("./handlers/achievementImageHandler")
const { loginAdmin } = require("./handlers/adminHandler");
const app = require("express")();

const {
  getAllReview,
  deleteReview,
  updateReview,
  createReview,
} = require("./handlers/reviewHandles");
const FBauth = require("./utils/FBauth");
const { getAllAchievement, createAchievement, updateAchievement, deleteAchievement } = require("./handlers/achievementHandler");

//Review Routes
app.get("/reviews", getAllReview);
app.post("/review", FBauth, createReview);
app.put("/review/:id", FBauth, updateReview);
app.delete("/review/:id", FBauth, deleteReview);
app.post("/review/:id/uploadimg", FBauth, uploadReviewImage);


//Achievement Routes
app.get("/achievements", getAllAchievement);
app.post("/achievement", FBauth, createAchievement);
app.put("/achievement/:id", FBauth, updateAchievement);
app.delete("/achievement/:id", FBauth, deleteAchievement);
app.post("/achievement/:id/uploadimg", FBauth, uploadAchievementImage);


//Admin Route
app.post("/admin/login", loginAdmin);

//Firebase functions
exports.api = functions.region("asia-south1").https.onRequest(app);

//admin
//user admin@firebase.com
//password admin@123
