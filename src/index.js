//Modules ---
const express = require("express");
const sharp = require("sharp");
const fileUpload = require("express-fileupload");
const app = express();

// default options
app.use(fileUpload());

const PORT = 3001;
const DEFAULT_TILE_SIZE = 512;
const OUTPUT_DIR = "output/";
const OUTPUT_FILE_NAME = "output.zip";
const INPUT_DIR = "input/";

//Routes ---
app.post("/", function(req, res) {
  let keys;
  try {
    keys = Object.keys(req.files);
  } catch (err) {
    return res.status(400).send("Could not access file in request");
  }

  if (keys.length == 0) return res.status(400).send("No file Attached");
  if (keys.length > 1)
    return res.status(400).send("Can only process one file at a time");

  let img = req.files[keys[0]];

  // Use the mv() method to place the file somewhere on your server
  img.mv(INPUT_DIR + "in.jpg", function(err) {
    if (err) return res.status(500).send(err);

    console.log("[LOG] Upload successful");

    sharp(INPUT_DIR + "in.jpg")
      .png()
      .tile({
        size: DEFAULT_TILE_SIZE
      })
      .toFile(OUTPUT_DIR + OUTPUT_FILE_NAME, function(err, info) {
        // output.dzi is the Deep Zoom XML definition
        // output_files contains 512x512 tiles grouped by zoom level
        console.log(
          "[LOG] Image successfully converted | file: " +
            OUTPUT_DIR +
            OUTPUT_FILE_NAME
        );
        res.send("Image has ben successfully converted");
      });
  });
});

//Open Service ---
app.listen(PORT, function() {
  console.log("[LOG] Opened Service on Port: " + PORT);
});
