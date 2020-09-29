const { credential } = require("firebase-admin");

const isEmpty = (string) => {
  if (string !== undefined) {
    if (string.toString().trim()) return false;
    else return true;
  } else return true;
};

exports.validateReview = (review) => {
  let error = {};

  if (isEmpty(review.body)) error.body = "Review body required";
  if (isEmpty(review.studentName)) error.studentName = "Student name required";
  if (isEmpty(review.ratings)) error.ratings = "Rating value required";

  if (Object.keys(error).length !== 0) error.flag = true;
  else error.flag = false;

  return error;
};

exports.reducedReviewBody = (review) => {
  let reducedBody = {};

  if (review.body) reducedBody.body = review.body;
  if (review.featured) reducedBody.featured = review.featured;
  if (review.ratings) reducedBody.ratings = review.ratings;

  return reducedBody;
};

exports.validateLogin = (credential) => {
  let errors = {};

  if (isEmpty(credential.email)) errors.email = "Admin email required";
  if (isEmpty(credential.password))
    errors.password = "Admin password required";

  if (Object.keys(errors).length !== 0) errors.flag = true;
  else errors.flag = false;

  return errors;
};

exports.validateAchievement = (achievement) => {
  let error = {};

  if (isEmpty(achievement.body)) error.body = "Review body required";
  if (isEmpty(achievement.studentName)) error.studentName = "Student name required";

  if (Object.keys(error).length !== 0) error.flag = true;
  else error.flag = false;

  return error;
};

exports.reducedAchievementBody = (achievement) => {
  let reducedBody = {};

  if (achievement.body) reducedBody.body = achievement.body;
  if (achievement.studentName) reducedBody.studentName = achievement.studentName;
  if (achievement.designation) reducedBody.designation = achievement.designation;

  return reducedBody;
};
