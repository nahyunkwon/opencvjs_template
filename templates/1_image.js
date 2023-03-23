function onOpenCvReady() {
  document.getElementById('status').innerHTML = 'OpenCV.js is ready.';

  let imgElement = document.getElementById('imageSrc');
  let inputElement = document.getElementById('fileInput');

  inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
  }, false);

  imgElement.onload = function() {
    
    /* Your code starts here */
    
    // read an image
    // cv.imread(imageSource) can read an image from imageSource

    // create a new variable to save the image
    // new cv.Mat(); creates an empty opencv image


    // show the image
    // cv.imshow (canvasSource, imageMat) can show imageMat on the canvasSource


    // empty the memory
    // yourMat.delete() method can be used

    /* Your code ends here */

  };
}