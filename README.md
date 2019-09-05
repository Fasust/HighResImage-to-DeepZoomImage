# HighResImage-to-DeepZoomImage

NodeJS Service that converts high resolution images to a Deep Zoom Image Tree

I am using the node module [Sharp](https://sharp.pixelplumbing.com/en/stable/api-output/#tile) to cut large images into the [DZI (Deep Zoom Image) Format](https://docs.microsoft.com/en-us/previous-versions/windows/silverlight/dotnet-windows-silverlight/cc645077(v=vs.95)). This service could be used in conjunction with [Open Sea Dragon](https://openseadragon.github.io/) to create Deep Zoom Images on the Web.

[Example Deep Zoom Images](http://feinerarts.com/feiner-arts---deep-zoom.html)

# Setup

```
git clone https://github.com/Fasust/HighResImage-to-DeepZoomImage.git
```

```
npm install
```

```
npm start 
```

The console should say: _"[LOG] Opened Service on Port: 3000"_

# Endpoints

The service has to end-points

| End Point      | HTTP Verb | Use                                   | Request                | Response                                                     |
| -------------- | --------- | ------------------------------------- | ---------------------- | ------------------------------------------------------------ |
| /              | POST      | Convert an attached img to DZI format | Needs an attached file | A zip file containing the DZI image, it is send via a stream |
| /download-test | GET       | Download the last converted DZI zip   | can be empty           | A zip file containing the DZI image, it is send via a stream |

The DZI Zip files are very large in size. Especially when the service converts a large Image. That is why I am using streams as a response type instead of sending the entire file at once.

# Structure of the DZI zip file
```
output.zip
|
output
|
├── output.dzi      //Deep Zoom XML definition
└── output_files    //Contains 512x512 tiles grouped by zoom level
    ├── 0
    |   └── 0_0.png
    ├── 1
    |   └── ...
    ├── 2
    |   └── ...
    └── ...
```
# How to Request
```javascript
//Node Modules
const request = require('request');
const fs = require('fs');

//Build the Form to Attach to the Post
const formData = {
    file: fs.createReadStream(__dirname + '/test-input.jpg') //Load img as buffer
}

//send Post
request.post({ url: 'http://localhost:3000/', formData: formData })
    .pipe(fs.createWriteStream('dzi.zip')); //write response stream to zip file
```
