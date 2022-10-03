
// SAUVEGARDER LE CONTENU DU PANIER FONCTION
// @param {Array} 

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

// OBTENIR LE CONTENU DU PANIER FONCTION
// @returns {Array} le panier s'il existe sinon, un tableau vide

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
        } else {
            return JSON.parse(basket);
        }
}

// @param {*} product
function addBasket(product) {
    let basket = getBasket();
    let foundProduct = basket.find(
        (p) => p.id == product.id && p.color == product.color
    );
    if (foundProduct) {
        if (foundProduct.quantity >= 100) {
        foundProduct.quantity = 100;
        } else {
            foundProduct.quantity += product.quantity;
        }
        } else {
            basket.push(product);
        }
        saveBasket(basket);
        window.location.assign('./cart.html');
}

// SUPPRIMER UN PRODUIT DU PANIER FONCTION @param {*} product

// Le filtre spécifie tout sauf celui que vous souhaitez supprimer
// Dupliquer le panier, filtrer pour conserver tous les autres articles et enregistrer dans la place de l'ancien
function removeFromBasket(product) {
    let basket = getBasket();
    basket = basket.filter((p) => p.id != product.id || p.color != product.color);
    saveBasket(basket);
}

// CHANGER LA QUANTITE DU PANIER FONCTION
// @param {*} quantity
// @param {*} product

function changeQuantity(product, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(
        (p) => p.id == product.id && p.color == product.color
        );

        if (foundProduct != undefined) {
            foundProduct.quantity = quantity;
            if (foundProduct.quantity <= 0) {
                removeFromBasket(foundProduct);
                } else {
                    saveBasket(basket);
                }
            }
}

// OBTENIR LE NOMBRE DES PRODUITS DU PANIER FONCTION @returns

function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += product.quantity;
    }
    return number;
}

// NETTOYER LE PANIER FONCTION

function clearBasket() {
    localStorage.removeItem("basket");
}
