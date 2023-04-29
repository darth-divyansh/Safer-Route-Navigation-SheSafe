import React, { useEffect, useRef } from 'react';

const SERVER = process.env.REACT_APP_SERVER_URL || '';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load script: ' + src));
    document.head.appendChild(s);
  });
}

export default function MapPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    let directionsService;
    let directionsRenderers = [];

    const init = async () => {
      try {
        // load Google Maps script with API key from env
        const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
        if (!key) {
          console.error('Missing Google Maps API key. Set REACT_APP_GOOGLE_MAPS_API_KEY in .env.local');
          return;
        }
        await loadScript(`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`);

        // fetch crime data from server
        const resp = await fetch(`${SERVER}/api/crime-data`);
        const crimeData = await resp.json();

        // get user location
        navigator.geolocation.getCurrentPosition(position => {
          const yourpos = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          map = new window.google.maps.Map(mapRef.current, {
            mapTypeControl: false,
            zoom: 13,
            center: yourpos
          });
          new window.google.maps.Marker({ position: yourpos, map });

          directionsService = new window.google.maps.DirectionsService();

          // wire up autocomplete and route handling
          setupDirections(map, directionsService, crimeData);
        }, err => {
          console.error('Geolocation error', err);
        }, { enableHighAccuracy: true });

      } catch (err) {
        console.error(err);
      }
    };

    function setupDirections(map, directionsService, crimeData) {
      const originInput = document.createElement('input');
      originInput.id = 'origin-input';
      originInput.className = 'controls';
      originInput.placeholder = 'Enter an origin location';
      const destInput = document.createElement('input');
      destInput.id = 'destination-input';
      destInput.className = 'controls';
      destInput.placeholder = 'Enter a destination location';

      const modeDiv = document.createElement('div');
      modeDiv.id = 'mode-selector';
      modeDiv.className = 'controls';
      modeDiv.innerHTML = `
        <input type="radio" name="type" id="changemode-walking" checked>
        <label for="changemode-walking">Walking</label>
        <input type="radio" name="type" id="changemode-transit">
        <label for="changemode-transit">Transit</label>
        <input type="radio" name="type" id="changemode-driving">
        <label for="changemode-driving">Driving</label>
      `;

      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(originInput);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(destInput);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(modeDiv);

      const originAutocomplete = new window.google.maps.places.Autocomplete(originInput, { fields: ['place_id'] });
      const destAutocomplete = new window.google.maps.places.Autocomplete(destInput, { fields: ['place_id'] });

      let originPlaceId = null, destPlaceId = null, travelMode = 'WALKING';

      function route() {
        if (!originPlaceId || !destPlaceId) return;
        directionsService.route({
          origin: { placeId: originPlaceId },
          destination: { placeId: destPlaceId },
          travelMode,
          provideRouteAlternatives: true,
          unitSystem: window.google.maps.UnitSystem.METRIC
        }, (response, status) => {
          if (status !== window.google.maps.DirectionsStatus.OK && status !== 'OK') {
            console.warn('Directions request failed:', status);
            return;
          }

          // clear previous renderers
          directionsRenderers.forEach(r => r.setMap(null));
          directionsRenderers = [];

          const colors = ['red','blue','black','green','yellow'];
          const crimeQuotients = [];

          for (let p = 0; p < response.routes.length; p++) {
            const renderer = new window.google.maps.DirectionsRenderer({
              map,
              directions: response,
              routeIndex: p,
              polylineOptions: {
                strokeColor: colors[p % colors.length],
                strokeOpacity: 0.9,
                strokeWeight: 7
              }
            });
            directionsRenderers.push(renderer);

            const waypoints = response.routes[p].overview_path;
            let countMarkers = 0;
            crimeQuotients[p] = 0;

            for (let i = 0; i < waypoints.length; i++) {
              const wpLat = waypoints[i].lat();
              const wpLng = waypoints[i].lng();
              // round to 2 decimal places (same approach as original)
              const wpLatR = wpLat.toFixed(2);
              const wpLngR = wpLng.toFixed(2);

              for (let j = 0; j < crimeData.length; j++) {
                const cd = crimeData[j];
                // IMPORTANT: your original fields were 'lati' and 'longi' but earlier code had swapped comparisons;
                // compare rounded latitude to latitude and longitude to longitude
                const cdLatR = Number(cd.lati).toFixed(2);
                const cdLngR = Number(cd.longi).toFixed(2);

                if (cdLatR === wpLatR && cdLngR === wpLngR) {
                  countMarkers++;
                  const mag = (cd.properties && cd.properties.mag) || 0;
                  crimeQuotients[p] += mag;

                  // pick icon based on mag
                  let icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                  if (mag === 4) icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                  else if (mag === 3) icon = 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png';
                  else if (mag === 2) icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                  else if (mag === 1) icon = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
                  else if (mag === 0) icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

                  new window.google.maps.Marker({
                    position: { lat: Number(cd.lati), lng: Number(cd.longi) },
                    map,
                    title: mag >= 3 ? 'Danger' : 'Safer area',
                    icon
                  });
                }
              } // end crimeData loop
            } // end waypoints loop

            if (countMarkers > 0) {
              crimeQuotients[p] /= countMarkers;
            } else {
              crimeQuotients[p] = 0;
            }
          } // end routes loop

          // Here you could display the crime quotients to the user
          console.log('Crime quotients for routes:', crimeQuotients);
          // Example: alert(JSON.stringify(crimeQuotients));
        });
      }

      // listeners
      document.getElementById('changemode-walking')?.addEventListener('click', () => { travelMode = 'WALKING'; route(); });
      document.getElementById('changemode-transit')?.addEventListener('click', () => { travelMode = 'TRANSIT'; route(); });
      document.getElementById('changemode-driving')?.addEventListener('click', () => { travelMode = 'DRIVING'; route(); });

      originAutocomplete.addListener('place_changed', () => {
        const place = originAutocomplete.getPlace();
        if (!place.place_id) { alert('Please select an option from the dropdown list.'); return; }
        originPlaceId = place.place_id;
        route();
      });
      destAutocomplete.addListener('place_changed', () => {
        const place = destAutocomplete.getPlace();
        if (!place.place_id) { alert('Please select an option from the dropdown list.'); return; }
        destPlaceId = place.place_id;
        route();
      });
    }

    init();

    return () => {
      // cleanup if needed
    };
  }, []);

  return (
    <section className="big-feature-section" style={{ height: '600px', padding: '0 20px 40px' }}>
      <h2 style={{ textAlign: 'center' }}>Route Planner</h2>
      <div ref={mapRef} id="map" style={{ width: '100%', height: '520px' }}></div>
    </section>
  );
}
