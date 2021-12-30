
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

  const divImageContainer = document.createElement("div");
  divImageContainer.setAttribute("class", "imageContainer");
  divImageContainer.style.backgroundImage = `url('${image.path}')`;

  const divContainerLocation = document.createElement("div");
  divContainerLocation.setAttribute("class", "locationContainer");
  const location = document.createElement("span");
  location.innerText = image.location;
  divContainerLocation.appendChild(location);
  
 
  divPhotoContainer.appendChild(divImageContainer);
  divPhotoContainer.appendChild(divContainerLocation);
 
  divPhotoContainer.addEventListener("click", handleClickPhoto);
  document.querySelector("#photoGallery").appendChild(divPhotoContainer);

}


function handleClickPhoto(event) {
  let photo;
  if(event.target.getAttribute("class") === "imageContainer") {
    photo = event.path[1];
  }else {
    photo = event.target;
  }
  photo.style.zIndex = "1";
  photoMoving(photo);
}

function photoMoving(photo) {

  const {Ypx: yPhotoTranslate , Xpx:xPhotoTranslate, photoPorcent: photoWPorcent} = pxToMove(0.6, photo);

  photo.style.transform = `translate(${xPhotoTranslate}px, ${yPhotoTranslate}px) scale(${photoWPorcent})`;
  //photo.childNodes[0].style.display = "flex";
  photo.style.zIndex = "1";
  //photo.setAttribute("onclick", "");
  console.log(photo);

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