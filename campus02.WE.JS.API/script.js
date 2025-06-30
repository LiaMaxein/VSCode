// Globale Variable für alle Produkte, einmal deklariert
let allProducts = [];

// DOM-Elemente abrufen
const searchInput = document.getElementById('searchInput');
const loadButton = document.getElementById('loadButton');
const productContainer = document.getElementById('productContainer');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

// Event-Listener hinzufügen
loadButton.addEventListener('click', loadProducts);
searchInput.addEventListener('input', filterProducts);

/**
 * Lädt Produkte von der DummyJSON API.
 * Zeigt einen Ladeindikator an und behandelt Fehler.
 */
function loadProducts() {
    showLoading(true); // Ladeindikator anzeigen
    hideError();      // Eventuelle vorherige Fehlermeldung ausblenden

    // Daten von der API abrufen
    fetch('https://dummyjson.com/products?limit=20')
        .then(response => {
            // Überprüfen, ob die Antwort erfolgreich war (Status 200 OK)
            if (!response.ok) {
                // Wenn nicht, einen Fehler werfen, der vom .catch-Block gefangen wird
                throw new Error('Netzwerk-Fehler: ' + response.status);
            }
            // Die JSON-Antwort parsen
            return response.json();
        })
        .then(data => {
            // Die geladenen Produkte in der globalen Variable speichern
            allProducts = data.products;
            // Alle Produkte auf der Webseite anzeigen
            showProducts(allProducts);
            // Ladeindikator ausblenden
            showLoading(false);
        })
        .catch(error => {
            // Fehler in der Konsole protokollieren
            console.error('Fehler beim Laden der Produkte:', error);
            // Fehlermeldung auf der Webseite anzeigen
            showError('Produkte konnten nicht geladen werden. (' + error.message + ')');
            // Ladeindikator ausblenden, auch bei Fehlern
            showLoading(false);
        });
}

/**
 * Filtert die geladenen Produkte basierend auf der Benutzereingabe
 * im Suchfeld und zeigt die gefilterten Produkte an.
 */
function filterProducts() {
    // Suchbegriff in Kleinbuchstaben umwandeln, um Groß-/Kleinschreibung zu ignorieren
    const searchTerm = searchInput.value.toLowerCase();

    // Produkte filtern: Name oder Kategorie müssen den Suchbegriff enthalten
    const filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    // Gefilterte Produkte anzeigen
    showProducts(filtered);
}

/**
 * Zeigt eine Liste von Produkten im productContainer an.
 * @param {Array} products - Ein Array von Produktobjekten.
 */
function showProducts(products) {
    // Wenn keine Produkte gefunden wurden, eine entsprechende Nachricht anzeigen
    if (products.length === 0) {
        productContainer.innerHTML = '<p>Keine Produkte gefunden.</p>';
        return; // Funktion beenden
    }

    // HTML-Strings für jedes Produkt erstellen
    // Template Literals (Backticks `) werden verwendet, um mehrzeilige Strings
    // und Variablen-Interpolation (${...}) zu ermöglichen.
    const html = products.map(product => `
        <div class="product">
            <img src="${product.thumbnail}" alt="${product.title}"
                 style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
            <h3>${product.title}</h3>
            <p class="category">${product.category.toUpperCase()}</p>
            <p class="price">€${product.price}</p>
            <p class="description">${product.description.substring(0, 100)}...</p>
        </div>
    `).join(''); // Alle einzelnen HTML-Strings zu einem großen String verbinden

    // Den gesamten HTML-Inhalt in den productContainer einfügen
    productContainer.innerHTML = html;
}

// --- Hilfsfunktionen für Ladeanzeige und Fehlermeldungen ---

/**
 * Steuert die Sichtbarkeit des Ladeindikators.
 * @param {boolean} show - True, um anzuzeigen, False, um auszublenden.
 */
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

/**
 * Zeigt eine Fehlermeldung auf der Webseite an.
 * @param {string} message - Die anzuzeigende Fehlermeldung.
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

/**
 * Blendet die Fehlermeldung aus.
 */
function hideError() {
    errorMessage.style.display = 'none';
}

// --- Initiales Laden der Produkte beim Start der Seite ---
// Dadurch werden Produkte sofort angezeigt, wenn die Seite geladen wird.
document.addEventListener('DOMContentLoaded', loadProducts);

// Die ursprünglichen Konsolen-Ausgaben aus dem Originalcode, die keine funktionale Rolle spielen.
// Ich habe sie beibehalten, da Sie nahe am Original bleiben wollten, aber sie sind nicht notwendig.
/*
fetch('https://dummyjson.com/products?limit=5')
  .then(response => response.json())
  .then(data => {
    console.log('Anzahl Produkte (Limit 5):', data.products.length);
    const firstProduct = data.products[0];
    console.log('Erstes Produkt (Limit 5):', firstProduct.title);
    console.log('Preis (Limit 5):', firstProduct.price);
});
*/