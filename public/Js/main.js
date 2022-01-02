
let idPhoto;

async function getData() {

const data = await fetch("/photos");
const response = await data.json();
//console.log(response.payload);

response.payload.forEach(element => printData(element));

}

//getData();

const buttons = document.querySelectorAll(".buttons");
buttons.forEach(element => element.addEventListener("click", handleNextBackPhoto));

function printData(image) {
  
  const divPhotoContainer = document.createElement("div");
  divPhotoContainer.setAttribute("class", "photoContainer flex-vertical");
  divPhotoContainer.setAttribute("photoId", `${image.id}`);
  
  const divImageContainer = document.createElement("div");
  divImageContainer.setAttribute("class", "imageContainer");
  divImageContainer.style.backgroundImage = `url('${image.path}')`;

  const spanX = document.createElement("span");
  spanX.setAttribute("class", "Xsquare");
  spanX.innerText = "X";
  spanX.addEventListener("click", handleCloseClickPhoto)

  divImageContainer.appendChild(spanX);

  const divContainerText = document.createElement("div");
  divContainerText.setAttribute("class", "containerText");
  const location = document.createElement("span");
  location.innerText = image.location;
  location.setAttribute("class", "location");
  divContainerText.appendChild(location);
  const comments = document.createElement("div");
  const spanComents = document.createElement("span");
  spanComents.innerText = "Comments";
  comments.setAttribute("class", "comments");
  comments.appendChild(spanComents);
  divContainerText.appendChild(comments);
  //createCommentsStructure(divContainerText);
  
 
  divPhotoContainer.appendChild(divImageContainer);
  divPhotoContainer.appendChild(divContainerText);
 
  divPhotoContainer.addEventListener("click", handleOpenClickPhoto);
  document.querySelector("#photoGallery").appendChild(divPhotoContainer);

}


function handleOpenClickPhoto(event) {

const photos = document.querySelectorAll(".photoContainer");

event.preventDefault();

  photos.forEach(photo => photo.style.zIndex ="0");

let photo;


  if(event.target.getAttribute("class") === "imageContainer") {
    photo = event.target.parentElement;

  }else {
    photo = event.target;

  }
 // idPhoto = photo.getAttribute("photoId")

  openPhotoMoving(photo);
  moveButtons();

  
  photos.forEach(photo => photo.removeEventListener("click", handleOpenClickPhoto));
 
  document.querySelector("body").setAttribute("class","stop-scrolling");
}

function handleCloseClickPhoto(event) {

  event.preventDefault();
  const photo = event.target.parentElement.parentElement;
  closePhotoMoving(photo);
  moveButtons();
  //event.target.style.display = "none";
  const photos = document.querySelectorAll(".photoContainer");
  photos.forEach(photo => photo.addEventListener("click", handleOpenClickPhoto));
 // const comments = document.querySelectorAll(".comments");
 // comments.forEach(comment => comment.style.display = "none");
  document.querySelector("body").setAttribute("class","");
  
}

function handleNextBackPhoto(event) {
  event.preventDefault();
  let name = event.target.getAttribute("name");
  console.log(name);
  nextBackPhoto(name, idPhoto);
}

function openPhotoMoving(photo) {

  buttons.forEach( button => button.style.visibility = "visible");
  const {Ypx: yPhotoTranslate , Xpx:xPhotoTranslate, photoPorcent: photoWPorcent} = pxToMove(0.6, photo);
  photo.style.transform = `translate(${xPhotoTranslate}px, ${yPhotoTranslate}px) scale(${photoWPorcent})`;
  square = photo.firstChild.firstChild;
  comments = photo.lastChild.lastChild;
  photo.style.zIndex = "2";
  square.style.display = "flex";
  comments.style.display = "inline-block";
  idPhoto = photo.getAttribute("photoId")
  console.log(idPhoto);
  if (idPhoto === "1") {
    document.querySelector("#buttonLeft").style.visibility = "hidden";
  } else if(idPhoto === "6") {
    document.querySelector("#buttonRight").style.visibility = "hidden";
  }
}

function closePhotoMoving(photo) {
  photo.style.transform = "translate(0,0) scale(1)"
  photo.style.zIndex = "0";
  idPhoto = "";
  comments = photo.lastChild.lastChild;
  square = photo.firstChild.firstChild;
  comments.style.display = "none";
  square.style.display = "none";
  
}


function elementPosition(element) {
  const screenWidth = window.innerWidth;
  const halfScreen = screenWidth / 2;
  const {left: elementLeft} = element.getBoundingClientRect();
  const elementWidth = element.offsetWidth;
  
  if(((elementWidth / 2) + elementLeft) > (halfScreen - 2) && ((elementWidth / 2) + elementLeft) < (halfScreen + 2 )) {
    return "center";
  } else if ((halfScreen - elementLeft) > 0) {
    return "left";
  } else {
    return "right";
  }
}

function pxToMove(porcent, element) {
  const elementWidth = element.offsetWidth;
  const elementHeight = element.offsetHeight;
  const halfElementWidth = elementWidth / 2;
  const halfElementHeight = elementHeight / 2;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const elementWPorcent =  (porcent * screenWidth) / elementWidth;

  const {top: actualTopPosition, left: actualLeftPosition} = element.getBoundingClientRect();
  
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
  }, 5000);
}

document.querySelector("#galleryButton").addEventListener("click", handleAnimationClick);