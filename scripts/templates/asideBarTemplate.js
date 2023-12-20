
const asideBarTemplate = async (price, likes) => {
    /* template de création de la barre indiquant les likes totaux et le prix horaire du photographe */
    const aside = document.createElement('aside');
    const div1  = document.createElement('div');
    const paragraph_number_likes = document.createElement('p');
    const heart = document.createElement('img');
    const priceArtist = document.createElement('p');

    const numberLikes = paragraph_number_likes.innerText = likes;
    heart.setAttribute('src', "../../assets/icons/black_heart.svg");
    heart.setAttribute('alt', 'image de coeur symbolisant les likes');
    priceArtist.innerText = `${price}€ /jour`;
    aside.classList.add('aside_bar');
    div1.classList.add('paragraph_bar');
    paragraph_number_likes.classList.add('paragraphnumberlikes');


    /* Intégration dans le DOM */

    const asideBar = document.querySelector('main');
    asideBar.setAttribute('aria-label', 'barre d\'information pour le nombre de likes et le prix à la journée' );
    asideBar.appendChild(aside);
    aside.appendChild(div1);
    aside.appendChild(priceArtist);
    div1.appendChild(paragraph_number_likes);
    div1.appendChild(heart);

}

