
const asideBarTemplate = async (price, likes) => {
    const aside = document.createElement('aside');
    const div1  = document.createElement('div');
    const paragraph_number_likes = document.createElement('p');
    const heart = document.createElement('img');
    const priceArtist = document.createElement('p');

    console.log(price, likes);

    paragraph_number_likes.innerText = likes;
    heart.setAttribute('src', "../../assets/icons/black_heart.svg");
    priceArtist.innerText = `${price}€ /jour`;
    aside.classList.add('aside_bar');
    div1.classList.add('paragraph_bar');
    /* Intégration dans le DOM */

    const asideBar = document.querySelector('main');

    asideBar.appendChild(aside);
    aside.appendChild(div1);
    aside.appendChild(priceArtist);
    div1.appendChild(paragraph_number_likes);
    div1.appendChild(heart);

}