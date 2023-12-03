function photographerTemplate(photographers) {

    const portrait = photographers.portrait
    const city = photographers.city;
    const country = photographers.country;
    const name = photographers.name;
    const tagline = photographers.tagline;
    const idPhotographer = photographers.id;
    const price = photographers.price;
    const picture = `../../Sample Photos/Photographers ID Photos/${portrait}`;


    function getUserCardDOM() {

        let currentUrl = new URL('http://photographer.html')
        currentUrl.searchParams.set('id', idPhotographer);


        const article = document.createElement( 'article' );
        article.setAttribute("aria-label", `description de ${name}` )
        const wrapperPicture = document.createElement('div');
        wrapperPicture.classList.add('wrapperPicture');
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `photo de ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const cityAndCountry = document.createElement('h3')
        cityAndCountry.classList.add('cityAndCountry')
        cityAndCountry.innerHTML = `${city}, ${country}`;
        const tag = document.createElement('p');
        tag.innerHTML = tagline;
        const pricePhotographer = document.createElement('p')
        pricePhotographer.id = 'photographer_section_price';
        pricePhotographer.innerHTML = `${price}€/jour`
        const link = document.createElement('a');
        link.setAttribute('href', currentUrl.href );

        article.appendChild(link);
        link.appendChild(wrapperPicture)
        wrapperPicture.appendChild(img);
        link.appendChild(h2);
        article.appendChild(cityAndCountry);
        article.appendChild(tag);
        article.appendChild(pricePhotographer);
        
        

        return (article);
    }
    return { name, picture, getUserCardDOM }
}