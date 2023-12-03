//Mettre le code JavaScript lié à la page photographer.html


const selectPhotographerById = async (data)  => {

    let photographerToDisplay = []
    const photographerSelected = window.location.href.split('=').reverse()[0]
    for (let i = 0; i< data.photographers.length; i++) {
        if (data.photographers[i].id == photographerSelected) {
            console.log(data.photographers[i])

            photographerToDisplay.push(data.photographers[i])
            console.log(photographerToDisplay)
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
    const photographerProfil = document.querySelector('header');
    console.log(photographers)
    const photographerModel = photographerTemplate(photographers[0]);
    const photographerCardDOM = photographerModel.getUserCardDOM();
    photographerProfil.appendChild(photographerCardDOM);
}

async function getPhotographer() {

    const response = await fetch('../../data/photographers.json')
    if (!response.ok) {
        throw new Error("Les informations n'ont pas pu être trouvées");
    } else {
        const data = await response.json();

        const photographerToDisplay = await selectPhotographerById(data);
        console.log(photographerToDisplay)
        /*displayPhotographer(photographerToDisplay);*/
        
    }
}



getPhotographer();