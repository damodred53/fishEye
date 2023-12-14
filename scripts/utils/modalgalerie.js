const createModalGalerie = async (data) => {
    const contactModal = document.querySelector('#contact_modal');
    const photos = await getPhotographers();
    const slide = photos.media.filter((media) => media.photographerId == photographerId);

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

    /* évènement pour la lecture des vidéos */
    if (data.video) {
        video.addEventListener("click", () => {
            if(video.paused) {
                video.load();
                video.play()
            } else {
                video.pause();
            }
        })
    }

    

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
            divGallerie.appendChild(img);
        } else if (currentSlide.video) {
            video.setAttribute('src', newVideoPath);
            divGallerie.appendChild(video);
        }

        title.innerText = currentSlide.title;
        divGallerie.appendChild(title);
    };

    crossElement.addEventListener('click', () => {
        const closingCarousel = document.querySelector('.divgalerie');
        closingCarousel.remove();
        closeModal();
    });

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
        console.log(currentIndex);
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slide.length;
        console.log(currentIndex);
    };

    updateCarousel();
};
