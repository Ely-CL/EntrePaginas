// Coordenadas de MasterD Oviedo (Ubicación por defecto) 
const latMasterD = 43.3688; 
const lonMasterD = -5.8488;

// 1. Inicializar el mapa
const map = L.map('mapa-dinamico').setView([latMasterD, lonMasterD], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Marcador en MasterD Oviedo
L.marker([latMasterD, lonMasterD]).addTo(map)
    .bindPopup('MasterD Oviedo').openPopup();

// 2. Lógica de geolocalización 
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            map.setView([userLat, userLon], 15);
            L.marker([userLat, userLon]).addTo(map)
                .bindPopup('Tu ubicación actual').openPopup();
        },
        () => {
            console.log("Permiso denegado. Se mantiene MasterD.");
        }
    );
}

// 3. FIX: Forzar el redibujado para evitar cuadros desordenados
setTimeout(() => {
    map.invalidateSize();
}, 400);