/**
 * Created by hemant on 25/1/17.
 */
// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');
const Vision = require('@google-cloud/vision');
const projectId = 'mediaagilitybot';

// Instantiates a client
const storageClient = Storage({
    projectId: projectId
});


// Instantiates a client
const visionClient = Vision({
    projectId: projectId
});

// The name of the image file to annotate
const fileName = './resources/wakeupcat.jpg';
// The name for the new bucket
const bucketName = 'ocr-photos';
var bucket = storageClient.bucket(bucketName);

//Storage.bucket(bucketName).
bucket.upload('/local/path/image.png', function(err, file, apiResponse) {
    console.log(err);
    console.log(file);
    console.log(apiResponse);
});



// visionClient.detectLabels(fileName)
//     .then(function(results){
//     const labels = results[0];
//
// console.log('Labels:');
// console.log(labels);
// });