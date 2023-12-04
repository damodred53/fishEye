//Mettre le code JavaScript lié à la page photographer.html


const urlSearchParams = new URLSearchParams(window.location.search)
const photographerId = urlSearchParams.get('id')

const createPage = async () => {
    if (photographerId) {

        const photographersProfil = await getPhotographers(photographerId)
        const selectedPhotographers = await selectPhotographerById(photographersProfil)
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


