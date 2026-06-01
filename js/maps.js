document.addEventListener('DOMContentLoaded', () => {
    // Init interactive Leaflet store map markers
    initStoreMaps();
});

// Configure Leaflet maps and marker popups
function initStoreMaps() {
    const locations = {
        sandton: {
            id: 'map-sandton',
            coords: [-26.1075, 28.0543],
            title: 'Sandton Flagship',
            address: '42 Nelson Mandela Square, Sandton, 2196',
            phone: '011 555 3210'
        },
        rosebank: {
            id: 'map-rosebank',
            coords: [-26.1458, 28.0416],
            title: 'Rosebank Branch',
            address: '14 Jellicoe Avenue, Rosebank, 2196',
            phone: '011 555 3210'
        },
        menlyn: {
            id: 'map-menlyn',
            coords: [-25.7824, 28.2764],
            title: 'Menlyn Pretoria',
            address: 'Shop 45, Menlyn Maine, Pretoria, 0081',
            phone: '011 555 3210'
        }
    };

    let mapsExist = false;
    for (const key in locations) {
        if (document.getElementById(locations[key].id)) {
            mapsExist = true;
            break;
        }
    }

    if (mapsExist && typeof L !== 'undefined') {
        for (const key in locations) {
            const loc = locations[key];
            const container = document.getElementById(loc.id);
            if (!container) continue;

            const map = L.map(loc.id, {
                scrollWheelZoom: false,
                dragging: !L.Browser.mobile,
                tap: !L.Browser.mobile
            }).setView(loc.coords, 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            const popupContent = `
                <div style="font-family: 'Inter', sans-serif; padding: 5px; color: #2D251F;">
                    <h4 style="font-family: 'Outfit', sans-serif; font-weight: 700; color: #5C3A21; margin: 0 0 5px; font-size: 1.15rem;">${loc.title}</h4>
                    <p style="margin: 0 0 10px; font-size: 0.9rem; line-height: 1.4; color: #73675E;">${loc.address}</p>
                    <a href="tel:${loc.phone.replace(/\s+/g, '')}" style="color: #FFC0CB; font-weight: 700; font-size: 0.9rem; text-decoration: none; display: inline-block; background: #5C3A21; padding: 6px 14px; border-radius: 50px; transition: all 0.3s ease;">Call Branch</a>
                </div>
            `;

            const marker = L.marker(loc.coords).addTo(map);
            marker.bindPopup(popupContent);

            if (window.innerWidth > 900) {
                marker.openPopup();
            }
        }
    }
}
