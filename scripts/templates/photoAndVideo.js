
const photoAndVideo = (data) => {


    const nameArtistBlock = document.querySelector('.h2')
    const nameArtist = nameArtistBlock.textContent;


    const picture = `../../Sample Photos/${nameArtist}/${data.image}`

    const divPhotoAndVideo = document.querySelector('.photographies')

    const myCard = document.createElement('div');
    const image = document.createElement('img');
    
    myCard.classList.add('cardphotographer');
    image.src = picture;
    image.classList.add('imagephotographer');
    
    

    /* création de la partie like et titre */
    const underPart = document.createElement('div')
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
    heart.setAttribute('alt', 'likes' );
     /*création du template */
     divPhotoAndVideo.appendChild(myCard)
     myCard.appendChild(image);
     
     myCard.appendChild(underPart);
     underPart.appendChild(paragraph_title);
    underPart.appendChild(divOfLikes);
     divOfLikes.appendChild(numberOfLikes);
     divOfLikes.appendChild(heart);
     





}