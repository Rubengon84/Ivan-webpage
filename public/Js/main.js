// variable to hold the Id of the photo presenter
let idPhoto;

// function for getting the information of each photo from the data-base
async function getData() {

const data = await fetch("/photos");
const response = await data.json();
// for every photo, make div-photo-element and add it to the container for all the photos
response.payload.forEach(element => printData(element));

}

// get the buttons elements to asign the handle click for passing the photos forward and backward
const buttons = document.querySelectorAll(".buttons");
buttons.forEach(element => element.addEventListener("click", handleNextBackPhoto));

// function to construct the html photo element with all the information passed by image object 
function printData(image) {
  // create photo container and assign class and the id 
  const divPhotoContainer = document.createElement("div");
  divPhotoContainer.setAttribute("class", "photoContainer flex-vertical");
  divPhotoContainer.setAttribute("photoId", `${image.id}`);
  // create the div container for the image of the photo
  const divImageContainer = document.createElement("div");
  divImageContainer.setAttribute("class", "imageContainer");
  divImageContainer.style.backgroundImage = `url('${image.path}')`;
  // create the img container for using as template for the shape of the div
  const img = document.createElement("img");
  img.setAttribute("src", `${image.path}`);
  img.setAttribute("class", "image");
  divImageContainer.appendChild(img);
  // create a X span for closing the photos when are big
  const spanX = document.createElement("span");
  spanX.setAttribute("class", "Xsquare");
  spanX.innerText = "X";
  // assing the handleclosinf photo function when the X is clicked 
  spanX.addEventListener("click", handleCloseClickPhoto)
  divImageContainer.appendChild(spanX);
  // create a container for all the information text from the photo
  const divContainerText = document.createElement("div");
  divContainerText.setAttribute("class", "containerText");
  // create a title h2 to hold the title of the photo
  const title = document.createElement("h2");
  title.innerText = image.title;
  title.setAttribute("class", "imageTitle");
  divContainerText.appendChild(title);
  // create a location span to hold the location information of the photo
  const location = document.createElement("span");
  location.innerText = image.location;
  location.setAttribute("class", "location");
  divContainerText.appendChild(location);
  // create a comments div to hold the coments and the form for making a new coment
  const comments = document.createElement("div");
  const spanComents = document.createElement("span");
  spanComents.innerText = "Comments";
  comments.setAttribute("class", "comments");
  comments.appendChild(spanComents);
  divContainerText.appendChild(comments);
  //createCommentsStructure(divContainerText);
  
  // add the image container and the tex container to the main photo container
  divPhotoContainer.appendChild(divImageContainer);
  divPhotoContainer.appendChild(divContainerText);
  // add a click event to the main container to make the photo bigger
  divPhotoContainer.addEventListener("click", handleOpenClickPhoto, false);
  // add the main photo container to the main photo gallery-container
  document.querySelector("#photoGallery").appendChild(divPhotoContainer);

}

// function to handle the photo opening when are clicked
function handleOpenClickPhoto(event) {
event.preventDefault();
// assing all the other photos a z-index 0
const photos = document.querySelectorAll(".photoContainer");
photos.forEach(photo => photo.style.zIndex ="0");
// create a photo variable and assing the photo container that had been clicked
let photo;

  if(event.target.getAttribute("class") === "imageContainer") {
    photo = event.target.parentElement;

  }else if (event.target.getAttribute("class") === "image") {
    photo = event.target.parentElement.parentElement;
  }
 // idPhoto = photo.getAttribute("photoId")
// call the moving photo function to make bigger the photo and position it in the right place  
openPhotoMoving(photo);
// move the navigation buttons close to the photo and make them functionals
moveButtons();

// remove the click event listener to all the photos, so not other photo can be actionated  
photos.forEach(photo => photo.removeEventListener("click", handleOpenClickPhoto)); 
// disable the scrolling in the page
document.querySelector("body").setAttribute("class","stop-scrolling");
}
// function to handle the photo closing when are clicked
function handleCloseClickPhoto(event) {

  event.preventDefault();
  // create a photo variable to assing the main photo container
  const photo = event.target.parentElement.parentElement;
  // call the moving-photo-closing to return the photo to his position
  closePhotoMoving(photo);
  // call the function for moving the navigation buttons away
  moveButtons();
  //event.target.style.display = "none";

  // add the open photo click event againt to all the photos 
  const photos = document.querySelectorAll(".photoContainer");
  photos.forEach(photo => photo.addEventListener("click", handleOpenClickPhoto));

 // const comments = document.querySelectorAll(".comments");
 // comments.forEach(comment => comment.style.display = "none");

  // allow scrolling again in the webpage
  document.querySelector("body").setAttribute("class","");
  
}
// function to handle the click on the navigation buttons and get the next or the back photo
function handleNextBackPhoto(event) {
  event.preventDefault();
  // get the the name of the botton 'back' or 'next' to identify wich action is require
  let name = event.target.getAttribute("name");
  // call the the function with the id of the photo and the name-action "next" or "back"
  nextBackPhoto(name, idPhoto);
}
// function for moving the photos to the center of the screen and make them bigger
function openPhotoMoving(photo) {
  // make the navigation buttons vissibles in case that the last open photo was the last one or the fist one
  buttons.forEach( button => button.style.visibility = "visible");
  // get the width of the actual size of the screen
  let deviceWidth = window.innerWidth;
  // create a variable for the porcentage of increment of the photo depending of the screen-size
  let porcentIncrement = deviceWidth < 665 ? 0.95 : deviceWidth < 900 ? 0.8 : 0.6;
  // get x, y , porcentage, from calling the function pixel to move, passing the photo selected
  const {Ypx: yPhotoTranslate , Xpx:xPhotoTranslate, photoPorcent: photoWPorcent} = pxToMove(`${porcentIncrement}`, photo);
  // translate and scale the photo to the right place
  photo.style.transform = `translate(${xPhotoTranslate}px, ${yPhotoTranslate}px) scale(${photoWPorcent})`;
  
  // create a square variable and assing the square element from the photo
  square = photo.firstChild.lastChild;
  //comments = photo.lastChild.lastChild;
  photo.style.zIndex = "2";
  // make the X square visible
  square.style.display = "block";
  // depends is la photo is portrait or landscape, adjust the position of the X square
  if (photo.firstChild.firstChild.offsetWidth < 250) {
    square.style.left = "82%";
  }
  //comments.style.display = "inline-block";
  // get the Id of the photo passed to the function
  idPhoto = photo.getAttribute("photoId")
  // if the photo is the first-one or the last one hide the navigation button Next or Back
  if (idPhoto === "1") {
    document.querySelector("#buttonLeft").style.visibility = "hidden";
  } else if(idPhoto === "33") {
    document.querySelector("#buttonRight").style.visibility = "hidden";
  }
}
// function for moving the photos and make them smaller to his initial position
function closePhotoMoving(photo) {
  photo.style.transform = "translate(0,0) scale(1)"
  photo.style.zIndex = "0";
  // no photo is assigned, so the variable it will be empty
  idPhoto = "";
  //comments = photo.lastChild.lastChild;
  square = photo.firstChild.lastChild;
  //comments.style.display = "none";
  square.style.display = "none";
  
}

// function for checking in with position is the photo passed
function elementPosition(element) {
  // get the witdth of the screen
  const screenWidth = window.innerWidth;
  const halfScreen = screenWidth / 2;
  // get the distance from the left side of the screen to the lef side of the element passed
  const {left: elementLeft} = element.getBoundingClientRect();
  // get the width of the element passed
  const elementWidth = element.offsetWidth;
  // define in which side the element is depends of the distance to the midle of the screen
  if(((elementWidth / 2) + elementLeft) > (halfScreen - 2) && ((elementWidth / 2) + elementLeft) < (halfScreen + 2 )) {
    return "center";
  } else if ((halfScreen - elementLeft) > 0) {
    return "left";
  } else {
    return "right";
  }
}
// function to define how many pixel and porcentage the photo has to move and change depends of the porcentage passed and the position of the photo
function pxToMove(porcent, element) {
  // get the width of the element passed
  const elementWidth = element.offsetWidth;
  // get the height of the element passed
  const elementHeight = element.offsetHeight;
  const halfElementWidth = elementWidth / 2;
  const halfElementHeight = elementHeight / 2;
  // get the width of the screen
  const screenWidth = window.innerWidth;
  // get the height of the screen
  const screenHeight = window.innerHeight;
  //calculate the porcentage to change depends of the screen size and photo size 
  const elementWPorcent =  (porcent * screenWidth) / elementWidth;
  // get the left and top distance of the element to the side and the eop of the screen
  const {top: actualTopPosition, left: actualLeftPosition} = element.getBoundingClientRect();
  // know the positio that the element needs to get for been in the center
  const centralElementLeftPosition = (screenWidth / 2) - halfElementWidth;
  const centralElementTopPosition = (screenHeight / 2) - halfElementHeight;
  

  const position = elementPosition(element);

  if (position === "center") {
    return {
     Ypx: centralElementTopPosition - actualTopPosition ,
     Xpx: 0 ,
     photoPorcent: elementWPorcent
    }
  } else {
    return {
     Ypx: centralElementTopPosition - actualTopPosition ,
     Xpx: centralElementLeftPosition - actualLeftPosition ,
     photoPorcent: elementWPorcent
    }
  }
}

function nextBackPhoto(string, idPhoto) {
 const photos = document.querySelectorAll(".photoContainer");
 const actualPhoto = photos[idPhoto - 1];
 closePhotoMoving(actualPhoto);
  if (string === "back") {
    openPhotoMoving(photos[idPhoto - 2]);
  } else {
    openPhotoMoving(photos[idPhoto]);
  }
}

function createCommentsStructure(comment){

  const form = document.createElement("form");
  const label = document.createElement("label");
  label.innerText = "Introduce tu comentario";
  const inputText = document.createElement("input");
  inputText.setAttribute("type","text");
  inputText.setAttribute("id", "comentInput");

  const inputButton = document.createElement("input");
  inputButton.setAttribute("type", "submit");
  form.appendChild(label);
  form.appendChild(inputText);
  form.appendChild(inputButton);
  comment.appendChild(form);

}

function moveButtons() {
  const buttons = document.querySelector("#nextBackButtons");
  let action = buttons.getAttribute("action");
  if(action === "close") {

    buttons.setAttribute("class", "flex-horizontal open");
    buttons.setAttribute("action", "open");
    document.querySelector(".blur").setAttribute("class", "blur blur-open");

  } else {
  
    buttons.setAttribute("class", "flex-horizontal close");
    buttons.setAttribute("action", "close");
    document.querySelector(".blur").setAttribute("class", "blur");

  }
}

function handleAnimationClick(event) {
  event.preventDefault();
  activateAnimation();
}

function handleReturnIntroClick(event) {
  event.preventDefault();
  document.querySelector("#introduction").style.display = "flex";
  document.querySelector("#photoGallery").innerHTML = "";

}


function activateAnimation() {
  document.querySelector("#introduction").style.animationName = "shutterEffect";
  document.querySelector("#circule").style.animationName = "shutter";
  document.querySelector("#light").style.animationName = "light";
  
  setTimeout(() => {
    const audio = new Audio('../css/camera-long-shutter.wav');
    audio.play();
  }, 3800);

  setTimeout(() => {
    getData();
    document.querySelector("#introduction").style.display = "none";
    resetAnimation();
  }, 5000);
}

function resetAnimation() {
  document.querySelector("#introduction").style.animationName = "";
  document.querySelector("#circule").style.animationName = "";
  document.querySelector("#light").style.animationName = "";
}

document.querySelector("#galleryButton").addEventListener("click", handleAnimationClick);
document.querySelector("#backToIntroduction").addEventListener("click", handleReturnIntroClick);