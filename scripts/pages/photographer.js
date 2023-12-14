//Mettre le code JavaScript lié à la page photographer.html


const urlSearchParams = new URLSearchParams(window.location.search)
const photographerId = urlSearchParams.get('id')
const pricePhotographer = [];


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

    /* Création de la barre aside */
    const searchlikePhotographers = await getPhotographers();

    const arrayNumberOfLikesByArtist = [];
    
    console.log(photographerId);

    for (let i = 0; i<searchlikePhotographers.media.length ; i++) {
        if (searchlikePhotographers.media[i].photographerId == photographerId) {
            arrayNumberOfLikesByArtist.push(searchlikePhotographers.media[i].likes)
        } ;
    }

    for (let i = 0; i<searchlikePhotographers.photographers.length ; i++) {
        if (searchlikePhotographers.photographers[i].id == photographerId) {
            pricePhotographer.push(searchlikePhotographers.photographers[i].price)
        } ;
    }



    const sumOfLikes = arrayNumberOfLikesByArtist.reduce((acc, likes) => acc + likes, 0)



    createAsideBar(pricePhotographer, sumOfLikes);

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
 

const MapData = (dataElement) => {
    console.log(dataElement)
    return dataElement.map((elem) => photoAndVideo(elem))

}

const createAsideBar = async (data, likes) => {

    console.log(data);
    console.log(likes)
    asideBarTemplate(data, likes);
}

/*const updateAsideBar = async (data, likes) => {

    console.log(data);
    console.log(likes)
    asideBarTemplate(data, likes + 1);
}*/

const displayPhotosAndVideo = (data) => {

    const arrayElement = [];
    const MappedData = data.map((element) => {
        const MediaInstance = MediaPattern(element);
        arrayElement.push(element)
    });
    
    console.log(arrayElement)


    const filteredMedia = arrayElement.filter((elem) => elem.photographerId == photographerId);
    const mappedData = MapData(filteredMedia);
    
    return filteredMedia
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

/* Mise en place du tri dans le menu filtrant */

const displaySort = async () => {

    stateSelectionBare = document.querySelector('.selection');

    const photos = await getPhotographers()

    const PhotosBySelections = [];
    for (let i = 0; i < photos.media.length ; i++) {
        if (photos.media[i].photographerId == photographerId) {
            PhotosBySelections.push(photos.media[i])
        }
    }

    switch (stateSelectionBare.value) {
        case 'Popularité':
            sortByPopularity(PhotosBySelections)
            break;
        case 'Date':
            sortByDate(PhotosBySelections)
            break;
        case 'Titre':
            sortByTitle(PhotosBySelections)
            break;
    }
}


const sortByPopularity = (PhotosBySelections) => {
   

    const sortedPhotosByLikes = PhotosBySelections.sort((a, b) => b.likes - a.likes);

    const existingCards = document.querySelectorAll('.cardphotographer');
    arrayExistingElement = Array.from(existingCards)
    console.log(arrayExistingElement)
        arrayExistingElement.forEach((element) => {
            element.remove()
            
        })
    
        MapData(sortedPhotosByLikes) 

}

const sortByTitle = (PhotosBySelections) => {
    
    const sortByTitleTest = (a, b) => {
        const titreA = a.title.toLowerCase();
        const titreB = b.title.toLowerCase();
    
        if (titreA < titreB) {
            return -1;
        } else if (titreA > titreB) {
            return 1;
        } else {
            return 0;
        }
    };
    
    const sortedPhotosByTitles = PhotosBySelections.sort(sortByTitleTest);
    console.log(sortedPhotosByTitles)

    const existingCards = document.querySelectorAll('.cardphotographer');
    arrayExistingElement = Array.from(existingCards)
    console.log(arrayExistingElement)
        arrayExistingElement.forEach((element) => {
            element.remove()
            
        })
    
    MapData(sortedPhotosByTitles) 
}

const sortByDate = (PhotosBySelections) => {

    const sortByDateTest = (a, b) => {
        const titreA = new Date(a.date);
        const titreB = new Date(b.date);
    
        if (titreA < titreB) {
            return -1;
        } else if (titreA > titreB) {
            return 1;
        } else {
            return 0;
        }
    };
    
    const sortedPhotosByDates = PhotosBySelections.sort(sortByDateTest);
    console.log(sortedPhotosByDates)

    const existingCards = document.querySelectorAll('.cardphotographer');
    arrayExistingElement = Array.from(existingCards)
    console.log(arrayExistingElement)
        arrayExistingElement.forEach((element) => {
            element.remove()
            
        })
    
    MapData(sortedPhotosByDates) 

}










