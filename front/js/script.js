fetch("http://localhost:3000/api/products")

// if succés 
.then((response) => response.json()) // Réponse http

.then((articles) => {
// Main réponce
    let articleDom = "";

    for (let article of articles) {
        articleDom += `<a href="./product.html?id=${article._id}">
            <article>
                <img src="${article.imageUrl}" alt="${article.altTxt}">
                <h3 class="productName">${article.name}</h3>
                <p class="productDescription">${article.description}</p>
            </article>
            </a>`;
    }

    document.querySelector("#items").innerHTML = articleDom;
})
// if erreur
.catch((error) => {
    console.log("===> error", error);
    alert("Ooops Le serveur n'est pas disponible");
});
