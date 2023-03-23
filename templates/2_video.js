

function onOpenCvReady() {
  

  // we will only invoke rest of the code when the opencv is ready
  if (cv.getBuildInformation) {
    console.log(cv.getBuildInformation());

    document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
    onloadCallback();
  } else {
    // wait for opencv.js compilation;
    cv["onRuntimeInitialized"] = () => {
      console.log(cv.getBuildInformation());

      document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
      onloadCallback();
    };
  }
}

function onloadCallback() {
  let streaming = false;
  let startAndStop = document.getElementById("start");
  let canvasOutput = document.getElementById("canvasOutput");
  let canvasContext = canvasOutput.getContext("2d");

  // here we aer adding button event listener using native js event listener
  startAndStop.addEventListener("click", () => {
    if (!streaming) {
      startCamera("qvga", onVideoStarted, "videoInput");
    } 
  });

  function onVideoStarted() {
    streaming = true;

    // changing the button text
    startAndStop.innerText = "Streaming";


    /* Your code starts here */
    
    // get video element from html
    // you can use let video = document.getElementById("yourVideoInputId")
    //---your code---//



    // here are the required empty images
    // here 8U is unsigned 8 bit and C4 means 4 channel (common image format in opencv)
    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
    
    // this one to fetch the video
    // if you have changed "let video" to a different variable name, make sure to change 
    // the following "video" variable as well
    let cap = new cv.VideoCapture(video);
    
    /* Your code ends here */

    // fixing the fps
    const FPS = 30;
    function processVideo() {
      try {
        if (!streaming) {
          // clean and stop.
          src.delete();
          dst.delete();
          return;
        }
        let begin = Date.now();

        /* Your code starts here */

        // get a frame
        // use cap.read(src) that will store the current frame in src variable
        //---your code---//

        

        // make your image grayscale
        // you can use cv.cvtColor(sourceImageVariable, destinationImageVariable, cv.COLOR_RGBA2GRAY); to make it grayscale
        //---your code---//


        
        // use cv.threshold(sourceImageVariable, destinationImageVariable, lowerThreshold, upperThreshold, cv.THRESH_BINARY)
        // to set a desired threshold
        //---your code---//
       

        // show the image on your canvasOutput
        // use cv.imshow
        //---your code---//


        /* Your code ends here */
        

        // recursively call the function after a certain delay
        let delay = 1000 / FPS - (Date.now() - begin);
        // setTimeout will call the function once the delay time is over
        setTimeout(processVideo, delay);
      } catch (err) {
        console.log(err);
      }
  }
    // schedule the first call.
    setTimeout(processVideo, 0);
  }
}

//utils
startCamera = function (resolution, callback, videoId) {

  // setting the resolution
  const constraints = {
    qvga: { width: { exact: 320 }, height: { exact: 240 } },
    vga: { width: { exact: 640 }, height: { exact: 480 } }
  };

  // get the video element from your HTML
  let video = document.getElementById(videoId);
  if (!video) {
    video = document.createElement("video");
  }

  // now we apply the resolution here
  let videoConstraint = constraints[resolution];
  if (!videoConstraint) {
    videoConstraint = true;
  }

  // this part is to fetch video over your browser using navigator
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