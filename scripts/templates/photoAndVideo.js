const photoAndVideo = (data) => {
 
console.log(data)
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
        video.setAttribute('alt', `Vidéo intitulée : ${data.title}`);
        video.classList.add('video');
        
    }

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
    

    const divPhotoAndVideo = document.querySelector('.photographies');


    const myCard = document.createElement('div');
    const mediaElement = data.video ? video : document.createElement('img'); 
    myCard.classList.add('cardphotographer');
    mediaElement.src = picture;
    mediaElement.classList.add(data.video ? 'video' : 'imagephotographer'); 

    /* Création de la partie like et titre */
    const underPart = document.createElement('div');
    const paragraph_title = document.createElement('p');
    const heart = document.createElement('img');
    const divOfLikes = document.createElement('div');
    const numberOfLikes = document.createElement('p');

    divOfLikes.classList.add('divoflikes');
    heart.src = '../../assets/icons/heart.svg';
    numberOfLikes.textContent = data.likes;
    paragraph_title.classList.add('paragraphphotografer');
    paragraph_title.textContent = data.title;
    underPart.classList.add('underpart');
    heart.setAttribute('alt', 'likes');

    /* Création du template */
    divPhotoAndVideo.appendChild(myCard);
    myCard.appendChild(mediaElement);
    myCard.appendChild(underPart);
    underPart.appendChild(paragraph_title);
    underPart.appendChild(divOfLikes);
    divOfLikes.appendChild(numberOfLikes);
    divOfLikes.appendChild(heart);

};