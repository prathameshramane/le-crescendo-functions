const { db } = require("../utils/firebase");
const {
  validateAchievement,
  reducedAchievementBody,
} = require("../utils/validators");

exports.createAchievement = (req, res) => {
  const error = validateAchievement(req.body);

  if (error.flag) {
    return res.status(400).json(error);
  }

  const newAchievement = {
    body: req.body.body,
    studentName: req.body.studentName,
    designation: req.body.designation ? req.body.designation : "",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/la-crescendo-academy.appspot.com/o/no-image.jpg?alt=media",
    createdAt: new Date().toISOString(),
  };

  db.collection("achievements")
    .add(newAchievement)
    .then((doc) => {
      return res.json({
        AchievementId: doc.id,
        message: "Succesfully uploaded",
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Failed to create an achievement" });
    });
};

exports.deleteAchievement = (req, res) => {
  db.doc(`/achievements/${req.params.id}`)
    .delete()
    .then((data) => {
      return res.json({ message: "Deleted successfully", success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: "Could not delete achievement" });
    });
};

exports.updateAchievement = (req, res) => {
  const reducedAchievement = reducedAchievementBody(req.body);
  if (Object.keys(reducedAchievement).length !== 0) {
    db.doc(`/achievements/${req.params.id}`)
      .update(reducedAchievement)
      .then((data) => {
        return res.json({ message: "Updated successfully", success: true });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Could not update achievement" });
      });
  } else {
    res.status(400).json({ error: "No updates to be done" });
  }
};

exports.getAllAchievement = (req, res, next) => {
  db.collection("achievements")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let achievements = [];
      if (!data.empty) {
        data.forEach((doc) => {
          achievements.push(doc.data());
        });
      }
      return res.json(achievements);
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Could not get Achievements at the moment" });
    });
};
