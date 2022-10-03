// id de produit est tiré de http://localhost:3000/api/products
// URLSearchParams
let str = document.URL;
let url = new URL(str);
let id = url.searchParams.get("id");

// Variables pour "then"
let coloris = "";
let description = "";
let titre = "";

// OBTENIR DES INFORMATIONS SUR LE PRODUIT GRAS à l'id 
// methode fetch 
// catch( si erreur ) 
const colors = document.querySelector("#colors");
const btnAddToCart = document.querySelector("#addToCart");
const quantity = document.querySelector("#quantity");

fetch("http://localhost:3000/api/products/" + id)
//Si succés :
.then((response) => response.json())

.then((data) => {
    let productOfAPI = data;

// IMAGE
let image = "";
image = `<img src="${productOfAPI.imageUrl}" alt="${productOfAPI.altTxt}">`;
document.querySelector(".item__img").innerHTML = image;

// TITRE
titre += `${productOfAPI.name}`;
document.querySelector("#title").innerHTML = titre;

// DESCRIPTION
description += `${productOfAPI.description}`;
document.querySelector("#description").innerHTML = description; 

// COULEURS
for (let color of productOfAPI.colors) {
    coloris += `<option value="${color}">${color}</option>`;
    document.querySelector("#colors").innerHTML = coloris;
}

// PRIX
let prix = "";
prix = `<span id="price">${productOfAPI.price}</span>`;
document.querySelector("#price").innerHTML = prix;
})

// Si ERREUR
.catch((error) => {
    console.log("===> error", error);
});


// AJOUTER AU PANIER
btnAddToCart.addEventListener("click", () => {
    if (colors.value == "" || quantity.value <= 0) {
        alert("Veuillez renseigner un quantité correcte s'il vous plait"); 
    } else {
        const contentCart = {
        id: id,
        color: colors.value,
        quantity: Number(quantity.value),
        };
    // ("./cart.html");
    addBasket(contentCart);
    console.log(contentCart);
    }
});

