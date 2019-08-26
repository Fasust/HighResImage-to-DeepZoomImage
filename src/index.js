//Modules ---
const express = require("express");
const sharp = require("sharp");
const fileUpload = require("express-fileupload");
const app = express();

// default options
app.use(fileUpload());

const PORT = 3000;
const DEFAULT_TILE_SIZE = 512;
const OUTPUT_DIR = "output/";
const OUTPUT_FILE_NAME = "output";
const OUTPUT_FILE_EXTENSION = ".zip";
const INPUT_DIR = "input/";

//Routes ---
app.post("/", function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }

  let img = req.files.file;

  // Use the mv() method to place the file somewhere on your server
  img.mv(INPUT_DIR + "in.jpg", function(err) {
    if (err) return res.status(500).send(err);

    console.log("[LOG] Upload successful");

    sharp(INPUT_DIR + "in.jpg")
      .png()
      .tile({
        size: DEFAULT_TILE_SIZE
      })
      .toFile(OUTPUT_DIR + OUTPUT_FILE_NAME + OUTPUT_FILE_EXTENSION, function(err, info) {
        // output.dzi is the Deep Zoom XML definition
        // output_files contains 512x512 tiles grouped by zoom level
        console.log(
          "[LOG] Image successfully converted | schema: " +
            OUTPUT_DIR +
            OUTPUT_FILE_NAME +
            OUTPUT_FILE_EXTENSION +
            "/" +
            OUTPUT_FILE_NAME +
            "/" +
            OUTPUT_FILE_NAME +
            ".dzi | files: " +
            OUTPUT_DIR +
            OUTPUT_FILE_NAME +
            OUTPUT_FILE_EXTENSION +
            "/" +
            OUTPUT_FILE_NAME +
            "/" +
            OUTPUT_FILE_NAME +
            "_files"
        );
        res.send("Image has ben successfully converted");
      });
  });
});

//Open Service ---
app.listen(PORT, function() {
  console.log("[LOG] Opened Service on Port: " + PORT);
});
