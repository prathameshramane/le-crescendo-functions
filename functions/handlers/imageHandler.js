const { db, admin, firebaseConfig } = require("../utils/firebase");

exports.uploadImage = (req, res, next) => {
  const Busboy = require("busboy");
  const fs = require("fs");
  const os = require("os");
  const path = require("path");
  const busboy = new Busboy({ headers: req.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (
      mimetype !== "image/jpeg" &&
      mimetype !== "image/png" &&
      mimetype !== "image/jpg"
    ) {
      return res.status(400).json({ errors: "File type not supported" });
    }

    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${Math.round(
      Math.random() * 100000000000
    )}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath: filepath, mimetype: mimetype };

    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: { metadata: { contentType: imageToBeUploaded.mimetype } },
      })
      .then((data) => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
        return db
          .doc(`/reviews/${req.params.id}`)
          .update({ imageUrl: imageUrl });
      })
      .then(() => {
        return res.json({
          message: "Image uploaded successfully",
          success: "true",
        });
      })
      .catch((err) => {
        console.error(err.code);
        return res.status(500).json({ error: err.code });
      });
  });

  busboy.end(req.rawBody);
};
