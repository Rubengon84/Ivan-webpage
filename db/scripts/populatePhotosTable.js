import query from "../index.js";
import photosInformation from "";


async function populatePhotos() {
  
  for(let i = 0; i < photosInformation.length; i++) {

    const {location, path} = photosInformation[i];
    
    const res = await query(`INSERT INTO photos (location , path) VALUES ($1, $2);`, [location, path]);
    console.log(res);
  }
  
}

populatePhotos();