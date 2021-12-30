
async function getData() {

const data = await fetch("/photos");
const response = await data.json();
console.log(response);

response.payload.forEach(element => printData(element));
  


}

getData();


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
  let photo;
  let square;
  let comments;
  let textContainer;

  if(event.target.getAttribute("class") === "imageContainer") {
    photo = event.target.parentElement
    square = event.target.firstChild;
    comments = event.target.parentElement.lastChild.lastChild;
    
  }else {
    photo = event.target;
    square = event.target.firstChild.firstChild;
    comments = event.target.lastChild.lastChild;
  }
  square.style.display = "inline-block";
  comments.style.display = "inline-block";
  openPhotoMoving(photo);

  const photos = document.querySelectorAll(".photoContainer");
  photos.forEach(photo => {
    photo.removeEventListener("click", handleOpenClickPhoto)
    photo.style.zIndex ="0";
  });
  photo.style.zIndex = "1";
 
}

function handleCloseClickPhoto(event) {
  const photo = event.target.parentElement.parentElement;
  closePhotoMoving(photo);
  event.target.style.display = "none";
  const photos = document.querySelectorAll(".photoContainer");
  photos.forEach(photo => photo.addEventListener("click", handleOpenClickPhoto));
  const comments = document.querySelectorAll(".comments");
  comments.forEach(comment => comment.style.display = "none");
}

function openPhotoMoving(photo) {
  const {Ypx: yPhotoTranslate , Xpx:xPhotoTranslate, photoPorcent: photoWPorcent} = pxToMove(0.6, photo);
  photo.style.transform = `translate(${xPhotoTranslate}px, ${yPhotoTranslate}px) scale(${photoWPorcent})`;

}

function closePhotoMoving(photo) {
  photo.style.transform = "translate(0,0) scale(1)"
  photo.zIndex = "0";
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

$(document).ready( () => {
  
  const comments = $(".comments");

  comments.click(function(){
     $ (this.nextElementSibling).slideToggle("slow")
      })
    

});