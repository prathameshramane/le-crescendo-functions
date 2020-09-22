const { db } = require("../utils/firebase");
const { validateReview } = require("../utils/validators");

exports.createReview = (req, res) => {
  const error = validateReview(req.body);

  if (error.flag) {
    return res.status(400).json(error);
  }

  const newReview = {
    body: req.body.body,
    studentName: req.body.studentName,
    ratings: req.body.ratings,
    imageUrl: req.body.imageUrl,
    featured: req.body.featured ? true : false,
  };

  db.collection("reviews")
    .add(newReview)
    .then((doc) => {
      return res.json({
        reviewId: doc.id,
        message: "Succesfully uploaded",
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteReview = (req, res) => {
  db.doc(`/reviews/${req.params.id}`)
    .delete()
    .then((data) => {
      return res.json({ message: "Deleted successfully", success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateReview = (req, res) => {
  db.doc(`/reviews/${req.params.id}`)
    .delete()
    .then((data) => {
      return res.json({ message: "Updated successfully", success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getAllReview = (req, res, next) => {
  db.collection("reviews")
    .get()
    .then((data) => {
      let reviews = [];
      if (!data.empty) {
        data.forEach((doc) => {
          reviews.push(doc.data());
        });
      }
      return res.json(reviews);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
};
