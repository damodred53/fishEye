const photoAndVideo = (data) => {
 


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
    heart.classList.add('heart');
    numberOfLikes.textContent = data.likes;
    numberOfLikes.classList.add('numberoflikes');

    

    paragraph_title.classList.add('paragraphphotografer');
    paragraph_title.textContent = data.title;
    underPart.classList.add('underpart');
    heart.setAttribute('alt', 'likes');


    mediaElement.addEventListener('click', () => {

        test2(data)
    })

    const researchHeart = document.querySelectorAll('.heart');
    
    for (let i = 0; i < researchHeart.length; i++) {
        researchHeart[i].id = 1 + i;
    }

    const numberLikes = document.querySelectorAll('.numberoflikes');
    const arrayLikes = Array.from(numberLikes)
    console.log(arrayLikes);

    for (let i = 0; i < arrayLikes.length; i++) {
        arrayLikes[i].id = 1 + i;
    }


    heart.addEventListener('click', () => {

        if(heart.classList.contains('clicked')) {
            return
        } else {
            let currentLikes = parseInt(numberOfLikes.textContent, 10);
            numberOfLikes.textContent = currentLikes +=1;
    
            const searchParagraph = document.querySelector('.paragraphnumberlikes');
    
            
            let currentLikesAsideBar = parseInt(searchParagraph.textContent, 10);
            searchParagraph.textContent = currentLikesAsideBar +=1
            heart.classList.add('clicked');
        }
       

    });




   
    


    /* Création du template */
    divPhotoAndVideo.appendChild(myCard);
    myCard.appendChild(mediaElement);
    myCard.appendChild(underPart);
    underPart.appendChild(paragraph_title);
    underPart.appendChild(divOfLikes);
    divOfLikes.appendChild(numberOfLikes);
    divOfLikes.appendChild(heart);


};



/* Réutilisation de la modale pour intégrer la gallerie */

const test2 = (data) => {
  

        const researchModal = document.querySelector('#contact_modal');
        const FormPhotographers  = document.querySelector('.modal');
        researchModal.style.display = "block";
        FormPhotographers.style.display = 'none';
        console.log(data)
         /*! ne pas oublier de remettre en display block à la fin  !! */
         createModalGalerie(data);
         
    
};







