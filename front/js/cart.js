let panier = getBasket();

let articleDom2 = "";

// Travaillez sur localStorage pour obtenir chaque produit (id, couleur et quantité), insérez une sélection pour pouvoir obtenir le prix, l'image et le nom de chaque produit.

//Travailler avec la variable cart (localStorage) pour pouvoir récupérer chaque produit et obtenir des informations sur chaque identifiant de produit dans l'API à l'aide de la méthode fetch.
let getProductInfo = async () => {
    for (let productsOfStorage of panier) {
        let response = await fetch(
            "http://localhost:3000/api/products/" + productsOfStorage.id
        );
        let productOfAPI = await response.json();
        Object.assign(productsOfStorage, productOfAPI);
        // Permet de cumuler les infos contenues dans le panier (id, couleur, quantité) et celles de l'API (prix, image...) de chaque produit.
    }
};


// TOTAL (quantités et prix) Calcul

let updateCart = () => {
    document.querySelector("#totalQuantity").innerHTML = getNumberProduct(); // Nombre d'articles
    document.querySelector("#totalPrice").innerHTML = getTotalPrice(); // Prix total
};


// Permet de manipuler le DOM sur la page produit en créer les informations pour chaque produit à l'aide des informations récupérées.

let showProduct = () => {
    for (let productsOfStorage of panier) {
        articleDom2 += `<article class="cart__item" data-id="${productsOfStorage._id}" data-color="${productsOfStorage.color}">
        <div class="cart__item__img">
        <img src="${productsOfStorage.imageUrl}" alt="${productsOfStorage.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${productsOfStorage.name}</h2>
        <p>${productsOfStorage.color}</p>
        <p>${productsOfStorage.price} €</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min=1 max=100 value=${productsOfStorage.quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
        </article>`;
    }

    document.querySelector("#cart__items").innerHTML = articleDom2;


    // SUPPRESSION DE PRODUIT

    let btnDelete = document.querySelectorAll(".deleteItem");
    for (let productsOfCart of btnDelete) {
        productsOfCart.addEventListener("click", (e) => {
            let itemEnfant = e.target.closest(".cart__item");
            let produit = {
                // Produit pour supprimer
                id: itemEnfant.getAttribute("data-id"),
                color: itemEnfant.getAttribute("data-color"),
            };
            // Appel la fonction permettant de pouvoir vider le panier
            removeFromBasket(produit);
            itemEnfant.remove();
            panier = panier.filter(
                (p) => p.id != produit.id || p.color != produit.color
            );
            // Appel la fonction permettant de mettre à jour le panier
            updateCart();
        });
    }

    // SELECTIONNER TOUTES LES CLASSES  .itemQuantity
    let btnQuantity = document.querySelectorAll(".itemQuantity");

    // MODIFICATION DES QUANTITES
    // PREND LA LISTE DES INPUT DU DOM
    for (let inputQuantity of btnQuantity) {
        inputQuantity.addEventListener("change", (e) => {
            if (!e.target.value || e.target.value < 0 || e.target.value > 100) {
                alert('Veuillez renseigner un quantité correcte s\'il vous plait')
                return ;
            }
            let htmlArticle = e.target.closest(".cart__item");
            let produit = {
                id: htmlArticle.dataset.id,
                color: htmlArticle.dataset.color,
            };
            changeQuantity(produit, parseInt(e.target.value));
            let foundProduct = panier.find(
                (p) => p.id == produit.id && p.color == produit.color
            );
            foundProduct.quantity = parseInt(e.target.value);
            updateCart();
        });
    }
    updateCart();
    // Appel la fonction permettant de mettre à jour le panier
};

getProductInfo().then(() => showProduct());

const items = JSON.parse(localStorage.getItem("items"));

// Fonction @returns permettant le calcul du prix total 

function getTotalPrice() {
    let total = 0;
    for (let product of panier) {
        total += product.quantity * product.price;
    }
    return total;
}


// FORMULAIRE
//Création d'un événement en un clic qui contrôlera les expressions régulières requises (Regex), puis le bouton "commander" permettra d'envoyer

// Au clique sur commander verifier si les champs sont bons et si oui rediriger vers la page confirmation
function check() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    
    const onlyStringRegex =  /^[A-Za-z]+$/;
    const onlyCharsAndNumber = /d{0,4} +[a-zA-Z][A-zÀ-ú]{1,5} ?D?$/;
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
    const cityRegex = /^[a-zA-Z\s\-]+$/;
    
// Errors regex
const errors = [];
    if(!onlyStringRegex.test(firstName)) errors.push({id: "#firstNameErrorMsg", message: "Le prénom n'est pas valide"});
    else errors.push({id: "#firstNameErrorMsg", message: ""});

    if(!onlyStringRegex.test(lastName)) errors.push({id: "#lastNameErrorMsg", message: "Le Nom n'est pas valide"});
    else errors.push({id: "#lastNameErrorMsg", message: ""});

    if(!emailRegex.test(email)) errors.push({id: "#emailErrorMsg", message: "L'email n'est pas valide"});
    else errors.push({id: "#emailErrorMsg", message: ""});

    if(!cityRegex.test(city)) errors.push({id: "#cityErrorMsg", message: "Le nom de ville n'est pas valide"});
    else errors.push({id: "#cityErrorMsg", message: ""});

    if(!onlyCharsAndNumber.test(address)) errors.push({id: "#addressErrorMsg", message: "L'adresse n'est pas valide"});
    else errors.push({id: "#addressErrorMsg", message: ""});
    return errors;
}

document.querySelector("#order").addEventListener("click", (e) => {
    // La méthode preventDefault annule la soumission du formulaire par défaut

    e.preventDefault();
    let errors = [];
    errors = check();
    const hasErrors = errors.some(function(error){
        return error.message.length;
    });
    

    if (hasErrors) {
        errors.forEach(function(error){
        document.querySelector(error.id).innerHTML = error.message
        });
        return
    }else {
        console.log("Le formulaire est bien remplis");
        let contact = {
            firstName: document.querySelector("#firstName").value,
            lastName: document.querySelector("#lastName").value,
            address: document.querySelector("#address").value,
            city: document.querySelector("#city").value,
            email: document.querySelector("#email").value,
        };


        let products = panier.map((produit) => produit.id);

        // Variable contenant un objet contact et un objet product
        let form = {
            contact,
            products,
        };

        console.log(form);

        // Fetch permettant d'envoyer (POST) la commande au serveur

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((result) => result.json())

            .then((data) => {
                window.location.assign(`./confirmation.html?orderId=${data.orderId}`);
            });
    }
});
