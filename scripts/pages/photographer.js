//Mettre le code JavaScript lié à la page photographer.html


const urlSearchParams = new URLSearchParams(window.location.search)
const photographerId = urlSearchParams.get('id')


const createPage = async () => {
    if (photographerId) {

        const photographersProfil = await getPhotographers(photographerId)
        const selectedPhotographers = await selectPhotographerById(photographersProfil.photographers)
        const displayedPhotographer = await displayPhotographer(selectedPhotographers);
     } else {
        throw new Error('l\'url n\'a pas permis d\'identifier un photpographe');
     }
}

createPage();


const selectPhotographerById = async (data)  => {

    let photographerToDisplay = []
    const photographerSelected = window.location.href.split('=').reverse()[0]

    for (let i = 0; i< data.length; i++) {
        if (data[i].id == photographerSelected) {
            photographerToDisplay.push(data[i])

        } 
    }

    if (photographerToDisplay.length < 1) 
    {
        throw new Error('Aucun photographe ne correspond à votre recherche');
        
    } else {
        return photographerToDisplay
    }

}

const displayPhotographer = async (photographers) => {
    const photographerProfil = document.querySelector('.photograph-header');
    const photographerModel = photographerTemplate(photographers[0]);
    const photographerCardDOM = photographerModel.getUserCardDOM();
    photographerProfil.appendChild(photographerCardDOM);

    
    const image = document.querySelector('.wrapperpicture');
    const h2 = document.querySelector('.h2');

    photographerProfil.appendChild(image);
    photographerProfil.appendChild(h2);

    const linkToRemove = document.querySelector('.link');
    const cityandcountry = document.querySelector('.cityandcountry');
    const tag = document.querySelector('.tag');
    const price = document.querySelector('.pricephotographer');
    const article = document.querySelector('.article');
    article.remove();
    price.classList.add('price');
    linkToRemove.remove();



    /* Création d'une div pour mettre en colonne les éléments générés sur le DOM */

    const myDiv = document.createElement('div');
    myDiv.classList.add("mydiv");
    photographerProfil.appendChild(myDiv);
    myDiv.appendChild(h2);
    myDiv.appendChild(cityandcountry);
    myDiv.appendChild(tag);


    photographerProfil.classList.add('flexbox_profil');
}

/* intégration de la partie photographie-gallery pour chaque photographe */

const fetchPhotographies = async () => {

    const fetch = await getPhotographers()
    console.log(await fetch);

    
}

fetchPhotographies();

/* Intégration des photographies et des vidéos du photographe dont on est sur la page */

const MediaPattern = (data) => {

    let Instance = {};

            if (data.image) {

                const Instance =  new Photo(data)

                /*console.log(photoInstance)*/

            } else if (data.video) {


                const Instance =  new Video(data)
                /*console.log(videoInstance)*/

            } else {
                throw 'Unknown type format'
            }
        return Instance;
      
    }
 

const MapData = (data) => {
    console.log(data)
    return data.map((elem) => photoAndVideo(elem))
}

const displayPhotosAndVideo = (data) => {

    const arrayElement = [];
    const MappedData = data.map((element) => {
        const MediaInstance = MediaPattern(element);
        arrayElement.push(element)
    });
    
    console.log(arrayElement)

    /*const concatenedcreateFactoryPattern = createFactoryPattern.photo.concat(createFactoryPattern.video);*/

    const filteredMedia = arrayElement.filter((elem) => elem.photographerId == photographerId);

    const mappedData = MapData(filteredMedia);
    

}

const getPhotoAndVideos = async () => {

    const fetchPhotosAndVideo = await getPhotographers();
    if (!fetchPhotosAndVideo) {
        throw new Error('Impossible de se connecter aux photos et aux vidéos');
    } else {

        const sortedMedia = displayPhotosAndVideo(fetchPhotosAndVideo.media);
    }

    
}

getPhotoAndVideos();