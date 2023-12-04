async function getPhotographers() {

    const response = await fetch('../../data/photographers.json')

    if (!response.ok) {
        throw new Error("Les informations n'ont pas pu être trouvées");
    }
    const data = await response.json()
    console.log(data.photographers)
        return data.photographers


}