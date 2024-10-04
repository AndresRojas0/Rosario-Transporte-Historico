function initMap() {
    const mapOptions = {
      streetViewControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      fullscreenControl: false,
      center: { lat: -32.9575, lng: -60.639444444444 }, // Coordinates for Rosario, SF, AR
      zoom: 14
    };
  
    const silverStyle = [
      {
        elementType: "geometry",
        stylers: [{ color: "#f5f5f5" }]
      },
      {
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }]
      },
      {
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }]
      },
      {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#f5f5f5" }]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#bdbdbd" }]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#eeeeee" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#e5e5e5" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }]
      },
      {
        featureType: "road.arterial",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#A3A3A3" }]
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }]
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#e5e5e5" }]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#eeeeee" }]
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#c9c9c9" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }]
      }
    ];
  
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.setOptions({ styles: silverStyle });
  
    const iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
    const icons = {};
  
    const legend = document.getElementById("legend");
    for (const key in icons) {
      const type = icons[key];
      const name = type.name;
      const icon = type.icon;
      const div = document.createElement("div");
      div.innerHTML = '<img src="' + icon + '"> ' + name;
      legend.appendChild(div);
    }
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);
  
    // KML layers with toggle functionality
    const kmlLayers = [
      {
        url:
          "http://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1gKfKOLsIOgwojXLds8i3rAf-_hF4Fvk",
        name: "2024"
      },
      {
        url:
          "http://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1ppX_okvG1hYai0MA__3kDVQuuWcXrvo",
        name: "2023"
      },
      {
        url:
          "http://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1B0THKBU8NIIiyvmJPFw_33ObfYIlQZ2H",
        name: "2020"
      },
      {
        url:
          "http://www.google.com/maps/d/u/0/kml?forcekml=1&mid=12eGyJS8vHHk35LQTcx3TX0Hod2DyXPUF",
        name: "2010"
      },
      {
        url:
          "http://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1QKCnqZXcyDEgOT2mVhiho-0VWvKoNQU",
        name: "2000"
      },
      {
        url:
          "http://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1zbNZesFm8Vhi9ZYEeDHaHmAoGxt7w1o",
        name: "1990"
      }
    ];
  
    const layerToggles = document.getElementById("layer-toggles");
    kmlLayers.forEach((layerInfo, index) => {
      const kmlLayer = new google.maps.KmlLayer({
        url: layerInfo.url + "&time=" + new Date().getTime(),
        map: map
      });
  
      // Create toggle checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `layer-${index}`;
      checkbox.checked = true;
  
      const label = document.createElement("label");
      label.htmlFor = `layer-${index}`;
      label.appendChild(document.createTextNode(layerInfo.name));
  
      const toggleDiv = document.createElement("div");
      toggleDiv.appendChild(checkbox);
      toggleDiv.appendChild(label);
      layerToggles.appendChild(toggleDiv);
  
      // Add event listener for checkbox
      checkbox.addEventListener("change", function () {
        kmlLayer.setMap(this.checked ? map : null);
      });
    });
  }
  
  // Call initMap when the page loads
  google.maps.event.addDomListener(window, "load", initMap);
  