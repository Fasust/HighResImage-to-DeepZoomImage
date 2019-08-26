//Modules ---
const express = require("express");
const sharp = require("sharp");
const app = express();

const PORT = 3000;
const DEFAULT_TILE_SIZE = 512;
const DZI_OUTPUT = "img/output";

//Routes ---
app.get("/", function(req, res) {
  sharp("input.jpg")
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
          ".dzi | files: " +
          DZI_OUTPUT +
          "_files"
      );
      res.send("Image has ben successfully converted");
    });
});

//Open Service ---
app.listen(PORT, function() {
  console.log("[LOG] Opened Service on Port: " + PORT);
});
