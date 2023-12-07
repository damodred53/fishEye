   

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");


        for (let i = 0; i< photographers.length; i++) {
            const photographerModel = photographerTemplate(photographers[i]);
            const userCardDOM = photographerModel.getUserCardDOM();

            console.log(userCardDOM)

            /* personnalisation des cards ainsi crées */

            let currentUrl = new URL('http://127.0.0.1:5500/photographer.html')
            currentUrl.searchParams.set('id', photographers.id);

            const link = document.createElement('a');

            link.setAttribute('href', currentUrl.href );
            link.classList.add('link')
            


            /*const link = document.createElement('a');
            link.setAttribute('href', currentUrl.href );
            const wrapperPicture = document.createElement('div');
            wrapperPicture.classList.add('wrapperPicture');
            wrapperPicture.appendChild(image)*/

            photographersSection.appendChild(userCardDOM);
        }
    }

    

    async function init() {
        // Récupère les datas des photographes
        const photographers  = await getPhotographers();
        displayData(photographers.photographers);
        
    }


    
    init();
    
    
