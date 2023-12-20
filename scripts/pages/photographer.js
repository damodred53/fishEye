//Mettre le code JavaScript lié à la page photographer.html

/* récupération de l'id du photographe via l'url */
const urlSearchParams = new URLSearchParams(window.location.search)
const photographerId = urlSearchParams.get('id')
const pricePhotographer = [];


const createPage = async () => {
    if (photographerId) {

        const photographersProfil = await getPhotographers();
        const selectedPhotographers = await selectPhotographerById(photographersProfil.photographers);
        displayPhotographer(selectedPhotographers);
     } else {
        throw new Error('l\'url n\'a pas permis d\'identifier un photpographe');
     }
}

createPage();


const selectPhotographerById = async (data)  => {

    let photographerToDisplay = []
    /* récupération de l'id contenu dans l'url et mise dans le tableau photographerToDisplay*/
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
    /* création du profil sur la page d'un photographe */
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
    
    price.classList.add('price');

    /*Retrait des éléments du template photographer inutils */
    article.remove();
    linkToRemove.remove();

    /* Gestion de l'accessibilité */
    photographerProfil.focus();


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
    

/* récupération des likes par photographies */
    for (let i = 0; i<searchlikePhotographers.media.length ; i++) {
        if (searchlikePhotographers.media[i].photographerId == photographerId) {
            arrayNumberOfLikesByArtist.push(searchlikePhotographers.media[i].likes)
        }
    }
/* récupération du prix à la journée du photographe */
    for (let i = 0; i<searchlikePhotographers.photographers.length ; i++) {
        if (searchlikePhotographers.photographers[i].id == photographerId) {
            pricePhotographer.push(searchlikePhotographers.photographers[i].price)
        }
    }

    const sumOfLikes = arrayNumberOfLikesByArtist.reduce((acc, likes) => acc + likes, 0)

    createAsideBar(pricePhotographer, sumOfLikes);

}



/* Intégration des photographies et des vidéos du photographe dont on est sur la page */

const MediaPattern = (data) => {
    /* tri des données (data) pour déterminer si ils 'agit de photos ou de vidéos */
    let instance = {};

            if (data.image) {

                new Photo(data);

            } else if (data.video) {

                new Video(data);

            } else {
                throw 'Unknown type format'
            }

        return instance;
      
    }
 

const MapData = async (dataElement) => {
    /* Envoi d'un mappage des données vers le template photoAndVideo */
    await dataElement.map((elem, index) => photoAndVideo(elem, index))
    
}

const createAsideBar = async (data, likes) => {
    /* appel de la fonction asideBar pour y afficher les éléments nécessaires */ 
    asideBarTemplate(data, likes);
}

const displayPhotosAndVideo = (data) => {

    const arrayElement = [];
    const MappedData = data.map((element) => {
        const MediaInstance = MediaPattern(element);
        arrayElement.push(element)
    });

    const filteredMedia = arrayElement.filter((elem) => elem.photographerId == photographerId);
    const mappedData = MapData(filteredMedia);
    
    return filteredMedia
}

const getPhotoAndVideos = async () => {
/* Récupération des données concernant les photographes et les photographies */
    const fetchPhotosAndVideo = await getPhotographers();
    if (!fetchPhotosAndVideo) {
        throw new Error('Impossible de se connecter aux photos et aux vidéos');
    } else {
        displayPhotosAndVideo(fetchPhotosAndVideo.media);
    }

}

getPhotoAndVideos();

/* Mise en place du tri dans le menu filtrant */

const displaySort = async (e) => {

const value = e.target.innerText
    stateSelectionBare = document.querySelectorAll('.dropdown_option');

    const photos = await getPhotographers()

    const PhotosBySelections = [];
    
    for (let i = 0; i < photos.media.length ; i++) {
        if (photos.media[i].photographerId == photographerId) {
            PhotosBySelections.push(photos.media[i])
        }
    }


    
    /* switch représentants les trois options possibles du menu déroulant */
    switch (value) {
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
/* Dans le menu déorulant trie des photographies par nombre de like */
const sortByPopularity = (PhotosBySelections) => {
   
    const sortedPhotosByLikes = PhotosBySelections.sort((a, b) => b.likes - a.likes);

    const existingCards = document.querySelectorAll('.cardphotographer');
    arrayExistingElement = Array.from(existingCards)

        arrayExistingElement.forEach((element) => {
            element.remove()
            
        })
    
        MapData(sortedPhotosByLikes) 

}

/* Dans le menu déorulant, tri des images par ordre alphabétique */
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


    const existingCards = document.querySelectorAll('.cardphotographer');
    arrayExistingElement = Array.from(existingCards)
        arrayExistingElement.forEach((element) => {
            element.remove()
            
        })
    
    MapData(sortedPhotosByTitles) 
}
/* dans le menu déroulant, tri des images par date */
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

    const existingCards = document.querySelectorAll('.cardphotographer');
    arrayExistingElement = Array.from(existingCards)

        arrayExistingElement.forEach((element) => {
            element.remove()
            
        })
    
    MapData(sortedPhotosByDates) 

}

const toggleList = () => {
    const AllSelectionDropList = document.querySelectorAll('.hidden_part');
    const cursorIcon = document.querySelector('.sort_button_img');
    

/* Gestion du clique pour les éléments de la droplist cachés */
AllSelectionDropList.forEach((elem) => {
        if (elem.classList.contains('hidden')){
            elem.classList.remove('hidden');
            cursorIcon.style.transform = 'rotate(180deg)';
            elem.addEventListener('click', (e) => {
                displaySort(e)})
            elem.addEventListener('keydown', (e) => {
                const keyCode = e.key;
                if (keyCode == 'Enter') {
                    displaySort(e)      
                }
            })
        } else if (!elem.classList.contains('hidden')) {
            elem.classList.add('hidden');
            cursorIcon.style.transform = 'rotate(0deg)';
        }
        
    })

}

/* interaction avec l'icone de défilement pour faire apparaitre les options */
const toggleDropDown = document.querySelector('.sort_button_img')
toggleDropDown.setAttribute('alt', 'curseur pour actionner le menu déroulant');
if (toggleDropDown) {
    toggleDropDown.addEventListener('click', (e) => {
        toggleList(e);   
    })

    if (toggleDropDown) {
        toggleDropDown.addEventListener('keydown', (e) => { 
            const keyCode = e.key;

            if (keyCode === 'Enter') {
                toggleList(e);
            }
        })
    }
    
}

const firstOption = document.querySelector('.first_choice');

/* Gestion du clique pour les éléments de la droplist visible */
if (firstOption) {
    firstOption.addEventListener('click', (e) => {
        displaySort(e)})

    firstOption.addEventListener('keydown', (e) => {
    const keyCode = e.key;
    if (keyCode == 'Enter') {
        displaySort(e)      
    }
    })
}



















