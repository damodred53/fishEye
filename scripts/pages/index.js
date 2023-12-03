    async function getPhotographers() {

        const response = await fetch('../../data/photographers.json')

        if (!response.ok) {
            throw new Error("Les informations n'ont pas pu être trouvées");
        }
        const data = await response.json()

            return data.photographers
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");


        for (let i = 0; i< photographers.length; i++) {
            const photographerModel = photographerTemplate(photographers[i]);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        }
    }

    

    async function init() {
        // Récupère les datas des photographes
        const photographers  = await getPhotographers();
        displayData(photographers);
        
    }


    
    init();
    
    
