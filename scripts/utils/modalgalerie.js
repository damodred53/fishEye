const createModalGalerie = async (data) => {

    /* Génération de la première page du carousel */
    const contactModal = document.querySelector('#contact_modal');
    const photos = await getPhotographers();
    const slide = photos.media.filter((media) => media.photographerId == photographerId);

        /* gestion des aria-hidden pour l'accessibilité */
    const ariaRemovedHeader = document.querySelector('.flexbox_profil');
    const ariaRemovedSort = document.querySelector('.sort_picture');
    const ariaRemovedPhotographies = document.querySelector('.photographies');
    const ariaRemovedAside = document.querySelector('.aside_bar');

    ariaRemovedHeader.setAttribute('aria-hidden', 'true');
    ariaRemovedSort.setAttribute('aria-hidden', "true");
    ariaRemovedPhotographies.setAttribute('aria-hidden', "true");
    ariaRemovedAside.setAttribute('aria-hidden', "true");

    contactModal.setAttribute('role', 'dialog');
    contactModal.setAttribute('aria-describedby', 'modal dédiée à la consultation des photographies et des vidéos');

    const imagePaths = [];
    const nameArtistBlock = document.querySelector('.h2');
    const nameArtist = nameArtistBlock.textContent;

    const divGallerie = document.createElement('div');
    divGallerie.classList.add('divgalerie');

    const img = document.createElement('img');
    const title = document.createElement('p');
    const video = document.createElement('video');

    img.classList.add('imageGalerie');
    video.classList.add('imageGalerie');
    title.classList.add('paragraphphotografermodal');

    contactModal.appendChild(divGallerie);
    divGallerie.appendChild(img);
    divGallerie.appendChild(title);

    const boutonPrev = document.createElement('img');
    const boutonNext = document.createElement('img');
    const crossElement = document.createElement('img');

    boutonPrev.classList.add('element_icon', 'arrowprev');
    boutonNext.classList.add('element_icon', 'arrownext');
    crossElement.classList.add('element_icon', 'cross');

    crossElement.src = '../../assets/icons/cross.svg';
    boutonPrev.src = '../../assets/icons/prev.svg';
    boutonNext.src = '../../assets/icons/next.svg';
 
    divGallerie.appendChild(crossElement);
    divGallerie.appendChild(boutonPrev);
    divGallerie.appendChild(boutonNext);

    /* prise en compte de l'accessibilité */

    cardPhotographer = document.querySelectorAll('.cardphotographer');
    cardPhotographer.forEach((elem) => {
        elem.setAttribute('tabindex', '-1');
    })
    
    divGallerie.setAttribute('aria-label', 'galerie de photos et de vidéo' );


    /* défilement du carousel avec le clavier */
    divGallerie.setAttribute('tabindex', '0');
    divGallerie.focus();
    const arrowPrevKeyboard = document.querySelector('.arrowprev');
    const arrowNextKeyboard = document.querySelector('.arrownext');
    /*const crossClosal = document.querySelector('.cross');*/       
    crossElement.setAttribute('tabindex','1')
    arrowPrevKeyboard.setAttribute('tabindex', '2');    
   

    img.setAttribute('tabindex', '3');
    video.setAttribute('tabindex', '3');
    arrowNextKeyboard.setAttribute('tabindex', '4');

    arrowPrevKeyboard.addEventListener('keydown', (e) => goingLeft(e));
    arrowNextKeyboard.addEventListener('keydown', (e) => goingRight(e));

    crossElement.addEventListener('keydown', (e) => closeModalByKeyboard(e));
    

    // Trouver l'index de l'image cliquée
    const clickedImageIndex = slide.findIndex((media) => media.id === data.id);

    // Initialiser currentIndex avec l'index de l'image cliquée
    let currentIndex = clickedImageIndex >= 0 ? clickedImageIndex : 0;

    const updateCarousel = () => {
        const imageGalerie = document.querySelector('.imageGalerie');
        const paragraph = document.querySelector('.paragraphphotografermodal');

        if (imageGalerie) {
            imageGalerie.remove();
        }

        if (paragraph) {
            paragraph.remove();
        }

        const currentSlide = slide[currentIndex];
        const newImagePath = `../../Sample Photos/${nameArtist}/${currentSlide.image}`;
        const newVideoPath = `../../Sample Photos/${nameArtist}/${currentSlide.video}`;
        if (currentSlide.image) {
            img.setAttribute('src', newImagePath);
            img.setAttribute('aria-hidden', 'true');
            divGallerie.appendChild(img);
        } else if (currentSlide.video) {
            video.setAttribute('src', newVideoPath);
            divGallerie.appendChild(video);

            /* la vidéo devient cliquable et se lance en cliquant dessus */
            video.addEventListener("click", () => {
                if (video.paused || video.ended) {
                    video.play();
                } else {
                    video.pause();
                }
            })
            /* Gestion de la vidéo dnas la gallerie via le clavier */
            video.addEventListener('keydown', (e) => {
                const keyCode = e.key               
                if (keyCode == 'Enter') {
                    if (video.paused || video.ended) {
                        video.play();
                    } else {
                        video.pause();
                    }
                }
            })
        }

        title.innerText = currentSlide.title;
        divGallerie.appendChild(title);
    };

    crossElement.addEventListener('click', () => {
   
        /*renvoie vers le fonction de fermeture de la modale */
        closeModal();
    });

    /* Gestion du défilement du carousel */
    boutonPrev.addEventListener('click', () => {
        prevSlide();
        updateCarousel();
    });

    boutonNext.addEventListener('click', () => {
        nextSlide();
        updateCarousel();
    });

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slide.length) % slide.length;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slide.length;
    };
    const goingLeft = (e) => {
        
        const keyCode = e.key;
        if (keyCode == 'ArrowLeft') {
            prevSlide();  
            updateCarousel();
        }         
    }

    const goingRight = (e) => {
        
        const keyCode = e.key;
        if (keyCode == 'ArrowRight') {
            nextSlide();  
            updateCarousel();
        }         
    }   

   

    updateCarousel();
};


const closeModalByKeyboard = (e) => {
    const keyCode = e.key;
    if(keyCode == 'Enter') {
        closeModal();
    }
}
