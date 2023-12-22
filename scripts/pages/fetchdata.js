async function getPhotographers() {
    /* Aller chercher les données sur les photographes et leurs photos avant de les renvoyer dans la variable data */
    /*const response = await fetch('../../data/photographers.json')*/
    const response = await fetch('data/photographers.json')
    if (!response.ok) {
        throw new Error("Les informations n'ont pas pu être trouvées");
    }
    const data = await response.json()

        return data


}