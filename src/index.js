//Modules ---
const express = require("express");
const sharp = require("sharp");
const app = express();

const PORT = 3000;
const DEFAULT_TILE_SIZE = 512;
const DZI_OUTPUT = "img/output.zip";

//Routes ---
app.get("/", function(req, res) {
  sharp("test-input.jpg")
    .png()
    .tile({
      size: DEFAULT_TILE_SIZE
    })
    .toFile(DZI_OUTPUT, function(err, info) {
      // output.dzi is the Deep Zoom XML definition
      // output_files contains 512x512 tiles grouped by zoom level
      console.log(
        "[LOG] Image successfully converted | schema: " +
          DZI_OUTPUT +
          "/output/output.dzi | files: " +
          DZI_OUTPUT +
          "/output/output_files"
      );
      res.send("Image has ben successfully converted");
    });
});

//Open Service ---
app.listen(PORT, function() {
  console.log("[LOG] Opened Service on Port: " + PORT);
});
