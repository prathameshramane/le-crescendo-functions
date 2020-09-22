const isEmpty = (string) => {
  if (string.trim()) return true;
  else return false;
};

exports.validateReview = (review) => {
  let error = {};

  if (!isEmpty(review.body)) error.body = "Review body required";
  if (!isEmpty(review.studentName)) error.studentName = "Student name required";
  if (!isEmpty(review.ratings.toString()))
    error.ratings = "Rating value required";

  if (Object.keys(error).length !== 0) error.flag = true;
  else error.flag = false;

  return error;
};
