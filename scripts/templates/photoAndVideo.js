const photoAndVideo = (data, index) => {
  /* template pour la création des images et vidéos pour chaque photograhe */

    let picture = "";
    let video = null; 

    const nameArtistBlock = document.querySelector('.h2');
    const nameArtist = nameArtistBlock.textContent;

    if (data.image) {
        picture = `../../Sample Photos/${nameArtist}/${data.image}`;
    } else if (data.video) {
        picture = `../../Sample Photos/${nameArtist}/${data.video}`;
        video = document.createElement('video');
        video.src = picture;
        video.setAttribute('alt', `Vidéo intitulée : ${data.title} cliquez dessus pour la lancer`);
        video.classList.add('video');  
    }


    const divPhotoAndVideo = document.querySelector('.photographies');

    const myCard = document.createElement('div');
    const mediaElement = data.video ? video : document.createElement('img'); 
    myCard.classList.add('cardphotographer');
    mediaElement.src = picture;
    mediaElement.classList.add(data.video ? 'video' : 'imagephotographer'); 
    mediaElement.setAttribute('alt', `photo intitulée : ${data.title}`);

    /* Création de la partie like et titre */
    const underPart = document.createElement('div');
    const paragraph_title = document.createElement('p');
    const heart = document.createElement('img');
    const divOfLikes = document.createElement('div');
    const numberOfLikes = document.createElement('p');

    divOfLikes.classList.add('divoflikes');
    heart.src = '../../assets/icons/heart.svg';
    heart.classList.add('heart');
    numberOfLikes.textContent = data.likes;
    numberOfLikes.classList.add('numberoflikes');

    

    paragraph_title.classList.add('paragraphphotografer');
    paragraph_title.textContent = data.title;
    underPart.classList.add('underpart');
    heart.setAttribute('alt', 'likes');
    heart.setAttribute('aria-label', 'icone où cliquer pour liker la photo')


    mediaElement.addEventListener('click', () => {

        test2(data)
    })
    myCard.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            test2(data);
        }
    });


    /* Intégration de la fonctionnalité permettant de cliquer sur les coeurs pour augmenter les likes */
    heart.addEventListener('click', () => {

        if(heart.classList.contains('clicked')) {
            /* On ne peut cliquer qu'une fois sur un coeur */
            return
        } else {
            let currentLikes = parseInt(numberOfLikes.textContent, 10);
            numberOfLikes.textContent = currentLikes +=1;
            /* Incrémentation de 1 sur la barre aside */
            const searchParagraph = document.querySelector('.paragraphnumberlikes');
            let currentLikesAsideBar = parseInt(searchParagraph.textContent, 10);
            searchParagraph.textContent = currentLikesAsideBar +=1
            heart.classList.add('clicked');
        }
    });

   
    /*navigatePicturesVideoByKeyboard();*/

    /* Gestion de l'accessibilité */

    mediaElement.setAttribute('tabindex', '0');

    /* Création du template */
    divPhotoAndVideo.appendChild(myCard);
    myCard.appendChild(mediaElement);       
    myCard.appendChild(underPart);
    underPart.appendChild(paragraph_title);
    underPart.appendChild(divOfLikes);
    divOfLikes.appendChild(numberOfLikes);
    divOfLikes.appendChild(heart);

    return myCard

};



/* Réutilisation de la modale pour intégrer la gallerie */

const test2 = (data) => {
  
    const researchModal = document.querySelector('#contact_modal');
    const FormPhotographers  = document.querySelector('.modal');
    researchModal.style.display = "block";
    FormPhotographers.style.display = 'none';   

    createModalGalerie(data);
        
};












