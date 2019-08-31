# HighResImage-to-DeepZoomImage

NodeJS Service that converts high resolution images to a Deep Zoom Image Tree

I am using the node module [sharp](https://sharp.pixelplumbing.com/en/stable/api-output/#tile) to cut large images into the [DZI (Deep Zoom Image) Format](https://docs.microsoft.com/en-us/previous-versions/windows/silverlight/dotnet-windows-silverlight/cc645077).
This service will be used in conjunction with [Open Sea Dragon](<https://docs.microsoft.com/en-us/previous-versions/windows/silverlight/dotnet-windows-silverlight/cc645077(v=vs.95)>) to create Deep Zoom Images on the Web.

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
|----------------|-----------|---------------------------------------|------------------------|--------------------------------------------------------------|
| /              | POST      | Convert an attached img to DZI format | Needs an attached file | A zip file containing the DZI image, it is send via a stream |
| /download-test | GET       | Download the last converted DZI zip   | can be empty           | A zip file containing the DZI image, it is send via a stream |

# Structure of the DZI zip file
```java
output.zip
|
output
|
├── output.dzi //Deep Zoom XML definition
└── output_files //Contains 512x512 tiles grouped by zoom level
    ├── 0
        └── 0_0.png
    ├── 1
        └── ...
    ├── 2
        └── ...
    └── ...
```
# How to Request
