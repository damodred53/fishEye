function photographerTemplate(photographers) {
    console.log(photographers)
    const portrait = photographers.portrait
    const city = photographers.city;
    const country = photographers.country;
    const name = photographers.name;
    const tagline = photographers.tagline;
    const idPhotographer = photographers.id;
    const price = photographers.price;
    const picture = `../../Sample Photos/Photographers ID Photos/${portrait}`;


    function getUserCardDOM() {

        let currentUrl = new URL('http://127.0.0.1:5500/photographer.html')
        currentUrl.searchParams.set('id', idPhotographer);

        const article = document.createElement( 'article' );
        article.setAttribute("aria-label", `description de ${name}` )
        const wrapperPicture = document.createElement('div');
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const cityAndCountry = document.createElement('h3');
        const tag = document.createElement('p');
        const pricePhotographer = document.createElement('p');
        const link = document.createElement('a');

        article.classList.add('article');
        img.classList.add('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `photo de ${name}`);
        wrapperPicture.classList.add('wrapperpicture');
        h2.classList.add("h2");
        cityAndCountry.classList.add('cityandcountry');
        tag.classList.add('tag');
        pricePhotographer.classList.add('pricephotographer');
        link.classList.add('link')
        
        h2.textContent = name;
        cityAndCountry.innerHTML = `${city}, ${country}`; 
        tag.innerHTML = tagline;

        pricePhotographer.id = 'photographer_section_price';
        pricePhotographer.innerHTML = `${price}€/jour`

        link.setAttribute('href', currentUrl.href );


        article.appendChild(link);
        link.appendChild(wrapperPicture)
        link.appendChild(h2);
        wrapperPicture.appendChild(img)
        
        article.appendChild(cityAndCountry);
        article.appendChild(tag);
        article.appendChild(pricePhotographer);
        

        return (article);
    }
    return { name, picture, getUserCardDOM }




   
}