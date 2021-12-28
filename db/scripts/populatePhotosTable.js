import query from "../index.js";


const photosInformation = [{
  location: 'mallorca1',
  path: './images/1.jpg'
},
{
  location: 'mallorca2',
  path: './images/2.jpg'
}]



async function populatePhotos() {
  
  for(let i = 0; i < photosInformation.length; i++) {

    const {location, path} = photosInformation[i];
    
    const res = await query(`INSERT INTO photos (location , path) VALUES ($1, $2);`, [location, path]);
    console.log(res);
  }
  
}

populatePhotos();