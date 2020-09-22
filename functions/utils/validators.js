const isEmpty = (string) => {
  if (string != undefined) {
    if (string.toString().trim()) return true;
    else return false;
  } else return false;
};

exports.validateReview = (review) => {
  let error = {};

  if (!isEmpty(review.body)) error.body = "Review body required";
  if (!isEmpty(review.studentName)) error.studentName = "Student name required";
  if (!isEmpty(review.ratings))
    error.ratings = "Rating value required";

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
