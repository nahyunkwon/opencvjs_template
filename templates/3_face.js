

function onOpenCvReady() {
  document.getElementById('status').innerHTML = 'OpenCV.js is ready.';

  if (cv.getBuildInformation) {
    console.log(cv.getBuildInformation());
    onloadCallback();
  } else {
    //wait for opencv.js compilation;
    cv["onRuntimeInitialized"] = () => {
      console.log(cv.getBuildInformation());
      onloadCallback();
    };
  }
}
function onloadCallback() {
  let streaming = false;
  let startAndStop = document.getElementById("start");
  let canvasOutput = document.getElementById("canvasOutput");
  let canvasContext = canvasOutput.getContext("2d");

  startAndStop.addEventListener("click", () => {
    if (!streaming) {
      startCamera("qvga", onVideoStarted, "videoInput");
    }
  });

  function onVideoStarted() {
    streaming = true;
    startAndStop.innerText = "streaming";


  /* Your code starts here */
  // get the video element
  //---your code---//


  // create two empty 8bit 4 channel images: src and dst
  //---your code---//

  
  // fetch video capture from the video element
  //---your code---//


  /* Your code ends here */

  
  let gray = new cv.Mat();          // another empty image (single channel)
  let faces = new cv.RectVector();  // to hold the face coordinates
  let classifier = new cv.CascadeClassifier(); // opencv's powerful haarCascadeClassifier
  
  let utils = new Utils('errorMessage');  // to show errors
  let faceCascadeFile = 'haarcascade_frontalface_default.xml'; // path to xml
  
  utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
    classifier.load(faceCascadeFile); // in the callback, load the cascade from file 
  });

  const FPS = 30;

  function processVideo() {
      let begin = Date.now();

      /* Your code starts here */

      // read a frame to the src
      // use cap.read() method
      //---your code---//


      // copy src image to dst so that we have one copy
      // use src.copyTo() method
      //---your code---//


      // convert the dst image to gray
      // use cv.cvtColor() method
      //---your code---//



      // here we are testing haar model for face
      try{
          classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
          console.log(faces.size());
      }catch(err){
          console.log(err);
      }

      // if we got any face then draw a rectange over it
      for (let i = 0; i < faces.size(); ++i) {
          let face = faces.get(i);
          let point1 = new cv.Point(face.x, face.y);
          let point2 = new cv.Point(face.x + face.width, face.y + face.height);

          // draw a rectangle between point1 and point2 over your dst image
          // use cv.rectangle(destinationImage, point1, point2, [R, G, B, Alpha]);
          // in opencv [R, G, B, Alpha] values ranges from 0 to 255
          //---your code---//



      }
      

      // show the dst image on your cavasOutput
      // use cv.imshow() method
      //---your code---//



      /* Your code ends here */

      
      // schedule next one.
      let delay = 1000/FPS - (Date.now() - begin);
      setTimeout(processVideo, delay);
}


  // schedule first one.
  setTimeout(processVideo, 0);
}

}

//utils: same as our previous example
startCamera = function (resolution, callback, videoId) {
  const constraints = {
    qvga: { width: { exact: 320 }, height: { exact: 240 } },
    vga: { width: { exact: 640 }, height: { exact: 480 } }
  };
  let video = document.getElementById(videoId);
  if (!video) {
    video = document.createElement("video");
  }

  let videoConstraint = constraints[resolution];
  if (!videoConstraint) {
    videoConstraint = true;
  }

  navigator.mediaDevices
    .getUserMedia({ video: videoConstraint, audio: false })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
      callback();
    })
    .catch(function (err) {
      console.log("An error occurred! " + err);
    });
};
