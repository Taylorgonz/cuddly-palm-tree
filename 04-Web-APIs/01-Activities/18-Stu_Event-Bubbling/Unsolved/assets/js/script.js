// TODO: Which element is the following line of code selecting?
// The div that will display the carousel images
var carousel = document.querySelector(".carouselbox");
// TODO: Which element is the following line of code selecting?
// the next and previous buttons using the parent carousel element
var next = carousel.querySelector(".next");
var prev = carousel.querySelector(".prev");
var index = 0;
var currentImage;

var images = [
  "https://picsum.photos/300/200",
  "https://picsum.photos/300/201",
  "https://picsum.photos/300/202",
  "https://picsum.photos/300/203"
];

carousel.style.backgroundImage = "url('https://picsum.photos/300/200')";

function navigate(direction) {
  index = index + direction;
  if (index < 0) { 
    index = images.length - 1; 
  } else if (index > images.length - 1) { 
    index = 0;
  }
  currentImage = images[index];
  carousel.style.backgroundImage = "url('" + currentImage + "')";
}

// TODO: Describe the functionality of the following event listener.
// clicking on the image opens a new window containing the image
carousel.addEventListener("click", function() {
  window.location.href = images[index];
});

// TODO: Describe the functionality of the following event listener.
// goes to the next photo in the carousel
next.addEventListener("click", function(event) {
  // TODO: What is the purpose of the following line of code?
  // it keeps the photo from bubbling up and new window opening
  event.stopPropagation();

  navigate(1);
});

// TODO: Describe the functionality of the following event listener.
// goes to the previous photo in the carousel
prev.addEventListener("click", function(event) {
    // TODO: What would happen if we didn't add the following line of code?
    // event bubbling and a new window would open with the image.
  event.stopPropagation();

  navigate(-1);
});

navigate(0);
