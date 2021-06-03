require("dotenv").config()
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID, credentials:{client_email:process.env.GCS_CLIENT_EMAIL, private_key:process.env.GCS_PRIVATE_KEY}
});

storage
  .bucket(process.env.GCS_BUCKET_NAME)
  .file("asdadasd.png")
  .save(fs.readFileSync("cpanel.jpg"))
  .then(console.log);