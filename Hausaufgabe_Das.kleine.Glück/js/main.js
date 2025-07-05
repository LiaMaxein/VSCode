document.addEventListener('DOMContentLoaded', () => {
    // Hamburger-Menü Funktionalität
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active'); // Optional: für Hamburger-Animation
        });

        // Schließen des Menüs bei Klick außerhalb oder auf einen Link
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // Leaflet Karte auf der Startseite
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([47.0707, 15.4395], 13); // Zentrum von Graz

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Blog-Eintrag Standorte
        const blogLocations = [
            { lat: 47.0707, lng: 15.4485, popup: 'Grazer Oper', link: 'blog_posts/architektur_oper.html' },
            { lat: 47.0686, lng: 15.3884, popup: 'Schloss Eggenberg', link: 'blog_posts/architektur_eggenberg.html' },
            { lat: 47.0718, lng: 15.4468, popup: 'Universität Graz', link: 'blog_posts/architektur_uni_graz.html' },
            { lat: 47.0736, lng: 15.4497, popup: 'Herz Jesu Kirche', link: 'blog_posts/architektur_herz_jesu.html' },
            { lat: 47.0715, lng: 15.4396, popup: 'Grazer Hauptplatz', link: 'blog_posts/architektur_hauptplatz.html' },
            { lat: 47.0713, lng: 15.4326, popup: 'Mariahilfer Kirche', link: 'blog_posts/architektur_mariahilfer.html' },
            { lat: 47.0805, lng: 15.4465, popup: 'Kirschblüten Rosenhain (Allee)', link: 'blog_posts/fruehling_rosenhain.html' },
            { lat: 47.0714, lng: 15.4416, popup: 'Schlossberg (Hängende Gärten)', link: 'blog_posts/fruehling_schlossberg.html' },
            { lat: 47.0735, lng: 15.4265, popup: 'Lendplatz', link: 'blog_posts/fruehling_lend.html' },
            { lat: 47.067, lng: 15.395, popup: 'Schlosspark Eggenberg (Passamtswiese)', link: 'blog_posts/sommer_schlosspark.html' },
            { lat: 47.0725, lng: 15.439, popup: 'Schlossberg Kasematten', link: 'blog_posts/sommer_schlossberg_konzerte.html' },
            { lat: 47.069, lng: 15.4475, popup: 'Kunst Uni Graz (Redoute)', link: 'blog_posts/sommer_redoute.html' },
            { lat: 47.069, lng: 15.425, popup: 'Volksgarten (CSD)', link: 'blog_posts/sommer_csd.html' },
            { lat: 47.065, lng: 15.378, popup: 'Plabutsch (Fürstenstand)', link: 'blog_posts/herbst_7summits.html' },
            { lat: 47.072, lng: 15.440, popup: 'Schlossbergmuseum (Klanglicht)', link: 'blog_posts/herbst_klanglicht.html' },
            { lat: 47.069, lng: 15.4457, popup: 'Kaiser-Josef-Platz (Bauernmarkt)', link: 'blog_posts/herbst_bauernmaerkte.html' },
            { lat: 47.0701, lng: 15.4375, popup: 'Joanneumsviertel (Weihnachtsmarkt)', link: 'blog_posts/winter_weihnachtszeit.html' },
            { lat: 47.075, lng: 15.438, popup: 'Schlossberg (Zugang Wickenburggasse)', link: 'blog_posts/winter_schnee.html' },
            { lat: 47.070, lng: 15.438, popup: 'Landeszeughaus (Museen & Restaurants)', link: 'blog_posts/winter_museen.html' },
            { lat: 47.0717, lng: 15.4405, popup: 'Stadtpark (Bäume)', link: 'blog_posts/blueten_baeume.html' },
            { lat: 47.072, lng: 15.438, popup: 'Schlossberg (Blümchen)', link: 'blog_posts/blueten_bluemchen.html' }
        ];

        blogLocations.forEach(loc => {
            const marker = L.marker([loc.lat, loc.lng]).addTo(map);
            marker.bindPopup(`<b>${loc.popup}</b><br><a href="${loc.link}">Mehr erfahren</a>`);

            // Optional: Klick auf Marker öffnet direkt den Blog-Eintrag
            marker.on('click', () => {
                window.location.href = loc.link;
            });
        });
    }
});