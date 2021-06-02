require("dotenv").config()
const fs = require("fs");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID, credentials:{client_email:process.env.GCS_CLIENT_EMAIL, privateKey:process.env.GCS_PRIVATE_KEY}
});

storage
  .bucket("fake-api-video-course")
  .file("asdadasd.png")
  .save(fs.readFileSync("Screenshot from 2021-04-20 19-58-53.png"))
  .then(console.log);