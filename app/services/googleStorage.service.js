require("dotenv").config()
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID, credentials:{client_email:process.env.GCS_CLIENT_EMAIL, private_key:process.env.GCS_PRIVATE_KEY}
});

const upload = storage.bucket(process.env.GCS_BUCKET_NAME)
  // .file("234234.mp4")
  // .save(fs.readFileSync('uploads/courses-video/51711342926e01c6ae263c51b07bb714'))
  // .then(console.log);
  // upload.file('a/128390182.mp4')
  // .save(fs.readFileSync("TUANANH.mp4"))
  // .then(console.log);
  module.exports = upload