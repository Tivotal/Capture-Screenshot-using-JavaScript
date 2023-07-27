/* Created by Tivotal */

let srcBtn = document.querySelector(".src-btn");
let srcPreview = document.querySelector(".src-preview");
let closeBtn = document.querySelector(".close-btn");

let captureScreenshot = async () => {
  try {
    //asking permissions to use media input to record current tab
    let stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
    });

    //creating new video element
    let video = document.createElement("video");

    video.addEventListener("loadedmetadata", () => {
      //creating new canvas element
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      //passing video width and height as canvas height and width
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      //playing the video to avoid blank or black image
      video.play();
      //drawing image of captured video stream
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      //terminating first video track of stream
      stream.getVideoTracks()[0].stop();

      //passing canvas data to preview img
      srcPreview.querySelector("img").src = canvas.toDataURL();
      srcPreview.classList.add("show");
    });

    //passing stream as video source
    video.srcObject = stream;
  } catch (error) {
    console.log(error);
  }
};

srcBtn.addEventListener("click", captureScreenshot);

closeBtn.addEventListener("click", () => {
  srcPreview.classList.remove("show");
});
