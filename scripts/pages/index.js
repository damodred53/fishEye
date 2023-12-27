   
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        /* Création des cards de présentation des photographes */

        for (let i = 0; i< photographers.length; i++) {
            const photographerModel = photographerTemplate(photographers[i]);
            const userCardDOM = photographerModel.getUserCardDOM();

            /* personnalisation des cards ainsi crées et attribution d'un id en URL */

            let currentUrl = new URL('http://127.0.0.1:5500/photographer.html')
            currentUrl.searchParams.set('id', photographers.id);

            const link = document.createElement('a');
            link.setAttribute('href', `photographer.html?id=${photographers.id}` );
            link.classList.add('link')
            photographersSection.appendChild(userCardDOM);
        }
    }

    async function init() {
        // Récupère les datas des photographes puis envoie les données concernant les photographes à la fonction displayData
        const photographers  = await getPhotographers();
        displayData(photographers.photographers);
        
    }


    
    init();
    
    
