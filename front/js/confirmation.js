// Utilisation de UrlSearchParams:
let str = document.URL;
let url = new URL(str);
let orderId = url.searchParams.get("orderId");

console.log(orderId);

document.querySelector("#orderId").innerHTML = orderId;

clearBasket();
