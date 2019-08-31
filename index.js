const PORT = 3000;
const DEFAULT_TILE_SIZE = 512;
const OUTPUT_DIR = "output/";
const OUTPUT_FILE_NAME = "output.zip";

//Modules ---
const express = require("express");
const sharp = require("sharp");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const app = express();

app.use(fileUpload());

//Routes ---
app.post("/", function(req, res) {
  // Load File From Request ---------
  let keys;
  try {
    keys = Object.keys(req.files);
  } catch (err) {
    console.log("[ERROR]: " + err);
    return res.status(400).send("Could not access file in request");
  }

  if (keys.length == 0) return res.status(400).send("No file Attached");
  if (keys.length > 1)
    return res.status(400).send("Can only process one file at a time");

  let img = req.files[keys[0]];

  console.log("[LOG] Received Image");

  //Convert buffered Image to DZI -------
  sharp(img.data)
    .png()
    .tile({
      size: DEFAULT_TILE_SIZE
    })
    .toFile(OUTPUT_DIR + OUTPUT_FILE_NAME, function(err, info) {
      console.log(
        "[LOG] Image successfully converted | file: " +
          OUTPUT_DIR +
          OUTPUT_FILE_NAME
      );
      res.setHeader("content-type", "zip");
      fs.readFile("./" + OUTPUT_DIR + OUTPUT_FILE_NAME, (err, data) => {
        if (err) {
          console.log("[ERROR] DZI could not be sent: " + err);
          return res.status(500).send("DZI could not be sent");
        }
        console.log("[LOG] DZI was sent");
        return res.end(data);
      });
    });
});

//Open Service ---
app.listen(PORT, function() {
  console.log("[LOG] Opened Service on Port: " + PORT);
});
