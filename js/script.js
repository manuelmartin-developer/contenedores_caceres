navigator.geolocation.watchPosition((position) => {

  const mapId = "map";
  const initialCoordinates = [position.coords.latitude, position.coords.longitude];
  const map = L.map(mapId).setView(initialCoordinates, 20);

  const MAPBOX_API =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
  const ATTRIBUTION =
    '© <a href="https://www.mapbox.com/">Mapbox</a>';

  const ACCESS_TOKEN =
    "###";
  L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 22,
    id: "mapbox/dark-v10",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN,
  }).addTo(map);

  L.marker(initialCoordinates)
    .bindPopup("<b>Aquí estas tú</b>")
    .addTo(map);

  // CHECKBOX CONTENEDORES

  const fetchContainers = async () => {
    await fetch("http://opendata.caceres.es/GetData/GetData?dataset=om:Contenedor&format=json")
      .then(response => response.json())
      .then(data => {

        const containers = data.results.bindings;

        // Objects and variables
        let checkboxs = document.querySelectorAll(".checkbox input");
        let organicContainers = [];
        let paperContainers = [];
        let plasticContainers = [];
        let glassContainers = [];
        let oilContainers = [];
        let clothContainers = [];
        let organicMarkers;
        let paperMarkers;
        let plasticMarkers;
        let glassMarkers;
        let oilMarkers;
        let clothMarkers;
        //Custom icon
        let LeafIcon = L.Icon.extend({
          options: {
            iconSize: [30, 30],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76]
          }
        });
        for (let checkbox of checkboxs) {

          checkbox.addEventListener("change", () => {
            const typeContainer = checkbox.value;
            switch (typeContainer) {

              case "organico": //? CONTENEDORES ORGÁNICOS

                if (checkbox.checked) {
                  organicContainers = containers.filter((container) => {
                    return container.om_tipoContenedor.value == "Organica";
                  })
                } else {
                  organicContainers = [];
                };

                if (organicContainers.length != 0) {
                  let organicIcon = new LeafIcon({
                    iconUrl: '../assets/organico.png'
                  });
                  organicMarkers = L.layerGroup().addTo(map);
                  for (let container of organicContainers) {
                    const containerCords = [parseFloat(container.geo_lat.value), parseFloat(container.geo_long.value)];

                    L.marker(containerCords, {
                        icon: organicIcon
                      })
                      .bindPopup(`<b>${container.om_tipoContenedor === undefined ? 'sin datos' : container.om_tipoContenedor.value} </b><br>Modelo: ${container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor.value }<br>Estado: ${container.om_estadoContenedor === undefined ? 'sin datos' : container.om_estadoContenedor.value}<br>Observaciones: ${container.dcterms_description === undefined ? 'sin datos' : container.dcterms_description.value}`)
                      .addTo(organicMarkers);
                  };
                } else {
                  organicMarkers.clearLayers();
                }
                break;

              case "papel": //? CONTENEDORES DE PAPEL/CARTÓN
                if (checkbox.checked) {
                  paperContainers = containers.filter((container) => {
                    return container.om_tipoContenedor.value == "Papel/Carton";
                  })
                } else {
                  paperContainers = [];
                };

                if (paperContainers.length != 0) {
                  let paperIcon = new LeafIcon({
                    iconUrl: '../assets/paper.png'
                  });
                  paperMarkers = L.layerGroup().addTo(map);
                  for (let container of paperContainers) {
                    const containerCords = [parseFloat(container.geo_lat.value), parseFloat(container.geo_long.value)];
                    L.marker(containerCords, {
                        icon: paperIcon
                      })
                      .bindPopup(`<b>${container.om_tipoContenedor === undefined ? 'sin datos' : container.om_tipoContenedor.value} </b><br>Modelo: ${container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor.value }<br>Estado: ${container.om_estadoContenedor === undefined ? 'sin datos' : container.om_estadoContenedor.value}<br>Observaciones: ${container.dcterms_description === undefined ? 'sin datos' : container.dcterms_description.value}`)
                      .addTo(paperMarkers);
                  };
                } else {

                  paperMarkers.clearLayers();
                };

                break;

              case "envases": //? CONTENEDORES DE ENVASES

                if (checkbox.checked) {
                  plasticContainers = containers.filter((container) => {
                    return container.om_tipoContenedor.value == "Envases";
                  })
                } else {
                  plasticContainers = [];
                };

                if (plasticContainers.length != 0) {
                  let plasticIcon = new LeafIcon({
                    iconUrl: '../assets/plastic.png'
                  });
                  plasticMarkers = L.layerGroup().addTo(map);
                  for (let container of plasticContainers) {
                    const containerCords = [parseFloat(container.geo_lat.value), parseFloat(container.geo_long.value)];
                    L.marker(containerCords, {
                        icon: plasticIcon
                      })
                      .bindPopup(`<b>${container.om_tipoContenedor === undefined ? 'sin datos' : container.om_tipoContenedor.value} </b><br>Modelo: ${container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor.value }<br>Estado: ${container.om_estadoContenedor === undefined ? 'sin datos' : container.om_estadoContenedor.value}<br>Observaciones: ${container.dcterms_description === undefined ? 'sin datos' : container.dcterms_description.value}`)
                      .addTo(plasticMarkers);
                  };
                } else {

                  plasticMarkers.clearLayers();
                };

                break;

              case "vidrio":
                if (checkbox.checked) {
                  glassContainers = containers.filter((container) => {
                    return container.om_tipoContenedor.value == "Vidrio";
                  })
                } else {
                  glassContainers = [];
                };

                if (glassContainers.length != 0) {
                  let glassIcon = new LeafIcon({
                    iconUrl: '../assets/glass.png'
                  });
                  glassMarkers = L.layerGroup().addTo(map);
                  for (let container of glassContainers) {
                    const containerCords = [parseFloat(container.geo_lat.value), parseFloat(container.geo_long.value)];
                    L.marker(containerCords, {
                        icon: glassIcon
                      })
                      .bindPopup(`<b>${container.om_tipoContenedor === undefined ? 'sin datos' : container.om_tipoContenedor.value} </b><br>Modelo: ${container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor.value }<br>Estado: ${container.om_estadoContenedor === undefined ? 'sin datos' : container.om_estadoContenedor.value}<br>Observaciones: ${container.dcterms_description === undefined ? 'sin datos' : container.dcterms_description.value}`)
                      .addTo(glassMarkers);
                  };
                } else {

                  glassMarkers.clearLayers();
                };

                break;

              case "aceite":

                if (checkbox.checked) {
                  oilContainers = containers.filter((container) => {
                    return container.om_tipoContenedor.value == "Aceite";
                  })
                } else {
                  oilContainers = [];
                };

                if (oilContainers.length != 0) {
                  let oilIcon = new LeafIcon({
                    iconUrl: '../assets/oil.png'
                  });
                  oilMarkers = L.layerGroup().addTo(map);
                  for (let container of oilContainers) {
                    const containerCords = [parseFloat(container.geo_lat.value), parseFloat(container.geo_long.value)];
                    L.marker(containerCords, {
                        icon: oilIcon
                      })
                      .bindPopup(`<b>${container.om_tipoContenedor === undefined ? 'sin datos' : container.om_tipoContenedor.value} </b><br>Modelo: ${container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor.value }<br>Estado: ${container.om_estadoContenedor === undefined ? 'sin datos' : container.om_estadoContenedor.value}<br>Observaciones: ${container.dcterms_description === undefined ? 'sin datos' : container.dcterms_description.value}`)
                      .addTo(oilMarkers);
                  };
                } else {

                  oilMarkers.clearLayers();
                };

                break;

              case "ropa":

                if (checkbox.checked) {
                  clothContainers = containers.filter((container) => {
                    return container.om_tipoContenedor.value == "Ropa";
                  })
                } else {
                  clothContainers = [];
                };

                if (clothContainers.length != 0) {
                  let clothIcon = new LeafIcon({
                    iconUrl: '../assets/cloth.png'
                  });
                  clothMarkers = L.layerGroup().addTo(map);
                  for (let container of clothContainers) {
                    const containerCords = [parseFloat(container.geo_lat.value), parseFloat(container.geo_long.value)];
                    L.marker(containerCords, {
                        icon: clothIcon
                      })
                      .bindPopup(`<b>${container.om_tipoContenedor === undefined ? 'sin datos' : container.om_tipoContenedor.value} </b><br>Modelo: ${container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor === undefined ? 'sin datos' : container.om_modeloContenedor.value }<br>Estado: ${container.om_estadoContenedor === undefined ? 'sin datos' : container.om_estadoContenedor.value}<br>Observaciones: ${container.dcterms_description === undefined ? 'sin datos' : container.dcterms_description.value}`)
                      .addTo(clothMarkers);
                  };
                } else {

                  clothMarkers.clearLayers();
                };

                break;

              default:
                console.log("Esto es default");
                break;
            };
          });
        };

      });
  };

  fetchContainers();

});
