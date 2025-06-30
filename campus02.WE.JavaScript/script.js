
// Array mit Objekten, die Produkte repräsentieren
const products = [
    { name: "Laptop", price: 699 },
    { name: "Handy", price: 299 },
    { name: "Tablet", price: 399 },
    { name: "Smartwatch", price: 199 },
    { name: "Kopfhörer", price: 129 },
    { name: "Tastatur", price: 79 },
    { name: "Maus", price: 39 },
    { name: "Monitor", price: 249 },
    { name: "Drucker", price: 159 }
];

// erstes Produkt (aus dem Original übernommen)
console.log(products[0].name); // 'Laptop'
console.log(products[0].price); // Alle Produkte durchgehen

// alle Produkte ansehen bzw. durchgehen
products.forEach(function (product) {
    console.log(product.name + ": €" + product.price );
});

// HTML-Liste füllen (sodass es eben auf der Website auch sichtbar wird)
const productList = document.getElementById("productList");

// alle Elemente in der Liste durchiterieren (initiale Anzeige aller Produkte)
products.forEach((product) => {
    // list Element erstellen
    const listItem = document.createElement("li");
    // Inhalte mit Daten befüllen
    listItem.innerHTML = product.name + " - " + product.price + " EUR";
    // Styling hinzufügen für bessere Optik, passend zur HTML Datei
    listItem.className = "bg-green-100 p-3 rounded-lg shadow-sm hover:bg-green-200 transition duration-300";
    // list Element zur Liste hinzufügen
    productList.appendChild(listItem);
});

// Referent auf das Such-Eingabefeld
const searchInput = document.getElementById("searchInput");

// Event-Listener für das Such-Eingabefeld hinzufügen
searchInput.addEventListener("input", function (event) {
    // Die Benutzereingabe holen und in Kleinbuchstaben umwandeln
    const userInput = event.target.value.toLowerCase();

    // Produkte filtern
    const filteredProducts = products.filter((product) => {
        // Überprüfen ob der Produktname die Benutzereingabe enthält 
        return product.name.toLowerCase().includes(userInput);
    });

    // Die besteghende Liste leeren, bevor die gefilterten Ergebnisse angezeigt werden 
    productList.innerHTML = "";



    // alle Elemente in der (gefilterten) Liste filtern (hier werden die gefilterten Produkte angezeigt)
    filteredProducts.forEach((product) => {
        // list Element erstellen
        const listItem = document.createElement("li");
        // Inhalte mit Daten befüllen
        listItem.innerHTML = product.name + " - " + product.price + " EUR";
        // Styling hinzugefügt für bessere Optik, passend zu HTML-Datei
        listItem.className = "bg-green-100 p-3 rounded-lg shadow-sm hover:bg-green-200 transition duration-300";    
        // list Element zur Liste hinzufügen
        productList.appendChild(listItem);
    });

});

// Einfachste Form vom Fetch
fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
        console.log("Anzahl Produkte: ", data.products.length);
        // Erstes Produkt anzeigen
        const firstProduct = data.products[0];
        console.log("Erstes Produkt: ", firstProduct.title);
        console.log("Preis: ", firstProduct.price);
});

// Produkte anzeigen
function showProducts(products) {
    const container = document.getElementById("container");
    // Produkte zum Container hinzufügen
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
        <h3>${product.title}</h3>
        <p class="price">€${product.price}</p>
        `;
        container.appendChild(productDiv);
    });
}

function pow(zahl) {
    return zahl * zahl;
};

// andere Fetch-Methode damit man die Produkte nicht hard coden muss, nacher: Echte API-Daten
let allProducts = []; // Globale Variable für alle Produkte
function loadProducts() {
    fetch('https://dummyjson.com/products?limit=20')
        .then(response => response.json())
        .then(data => {
            allProducts = data.products;
            showProducts(allProducts); // Alle Produkte anzeigen
        })
        .catch(error => {
            console.error('Fehler beim Laden der Produkte:', error);
            showError('Produkte konnten nicht geladen werden.');
}); }

loadProducts();




// String Methoden Beispiel
const text = "Hallo Welt!";

console.includes("Welt"); // true
console.includes("123"); // false
console.includes("welt"); // false

