import query from "../index.js";


const photosInformation = [{
  location: 'Los Escullos',
  title: 'Ocaso',
  path: './images/1.jpg'
},
{
  location: 'Paseo Maritimo',
  title: 'Puesta de Sol',
  path: './images/2.jpg'
},
{
  location: 'Los Escullos',
  title: 'Corriente Marina',
  path: './images/3.jpg'
},
{
  location: 'Los Escullos',
  title: 'Paredes Rocosas',
  path: './images/4.jpg'
},
{
  location: 'Los Escullos',
  title: 'El Submarino',
  path: './images/5.jpg'
},
{
  location: 'Los Escullos',
  title: 'Movimiento',
  path: './images/6.jpg'
},
{
  location: 'Camino Espina',
  title: 'Transparencia',
  path: './images/7.jpg'
},
{
  location: 'Los Escullos',
  title: 'Derrame',
  path: './images/8.jpg'
},
{
  location: 'Cala',
  title: 'Neblina',
  path: './images/9.jpg'
},
{
  location: 'Cabo de Gata',
  title: 'Reasaca',
  path: './images/10.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Tonos Verdes',
  path: './images/11.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Barranco',
  path: './images/12.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Higueral',
  path: './images/13.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Multicoma',
  path: './images/14.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Cantos Rodados',
  path: './images/15.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Corriente Marina',
  path: './images/16.jpg'
},
{
  location: 'Paraje de la Hermita',
  title: 'Bruma-1',
  path: './images/17.jpg'
},
{
  location: 'Paraje de la Hermita',
  title: 'Fuerza',
  path: './images/18.jpg'
},
{
  location: 'Paraje de la Hermita',
  title: 'Huella',
  path: './images/19.jpg'
},
{
  location: 'Paraje de la Hermita',
  title: 'Espuma',
  path: './images/20.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Simetria',
  path: './images/21.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Roquedo',
  path: './images/22.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Agua Viva',
  path: './images/23.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Naturaleza Viva',
  path: './images/24.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Caduca',
  path: './images/25.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Pared de Roca',
  path: './images/26.jpg'
},
{
  location: 'Canales de Padules',
  title: 'Clara',
  path: './images/27.jpg'
},
{
  location: 'Monsul',
  title: 'Reflejos',
  path: './images/28.jpg'
},
{
  location: 'Monsul',
  title: 'Nocturno',
  path: './images/29.jpg'
},
{
  location: 'Monsul',
  title: 'Via Lactea',
  path: './images/30.jpg'
},
{
  location: 'Monsul',
  title: 'Horizonte',
  path: './images/31.jpg'
},
{
  location: 'Monsul',
  title: 'Cobre',
  path: './images/32.jpg'
},
{
  location: 'Monsul',
  title: 'Nocturno',
  path: './images/33.jpg'
}
]


async function populatePhotos() {
  
  for(let i = 0; i < photosInformation.length; i++) {

    const {location, title, path} = photosInformation[i];
    
    const res = await query(`INSERT INTO photos (location , title, path) VALUES ($1, $2, $3);`, [location, title, path]);
    console.log(res);
  }
  
}

populatePhotos();