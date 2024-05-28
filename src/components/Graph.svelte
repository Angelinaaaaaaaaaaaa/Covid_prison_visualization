<script>
  import mapboxgl from 'mapbox-gl';
  import * as d3 from 'd3';
  import { fetchJSON } from './utils';
  import { onMount } from 'svelte';

  mapboxgl.accessToken = 'pk.eyJ1IjoiYmVlbGExMTAxIiwiYSI6ImNsdzFjZjgzbDBhbHgycHFxOTBweDJtOGgifQ.O0HdrUIX0Ph5GaBY8HvsTA';
  let map;

  // Assuming you have a mapping from TopoJSON ID to state codes
  const idToStateCode = {
    "53073": "WA",
    "30105": "MT",
    "30029": "MT",
    "16021": "ID",
    "30071": "MT",
    "38079": "ND",
    "30053": "MT",
    "38009": "ND",
    "30035": "MT",
    // Add all necessary mappings here
  };

  function createMap() {
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-98, 38],
      zoom: 3
    });

    map.on('load', () => {
      fetchCovidDataAndVisualizeMap();
    });
  }

  async function fetchCovidDataAndVisualizeMap() {
    try {
      const covidData = await fetchJSON('../data/03.json');
      const topoData = await fetchJSON('https://unpkg.com/us-atlas@3/states-albers-10m.json');

      // Convert TopoJSON to GeoJSON manually
      const geoData = topoToGeo(topoData);

      map.addSource('states', {
        type: 'geojson',
        data: geoData
      });

      const joinedData = geoData.features.map(feature => {
        const stateCode = idToStateCode[feature.id];
        const stateData = covidData.find(data => data.code === stateCode);
        feature.properties.cases = stateData ? stateData.cases : 0;
        return feature;
      });

      visualizeMap(joinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function topoToGeo(topoData) {
    const geoData = { type: "FeatureCollection", features: [] };
    const arcs = topoData.arcs;
    const scale = topoData.transform.scale;
    const translate = topoData.transform.translate;

    for (let key in topoData.objects.counties.geometries) {
      const geometry = topoData.objects.counties.geometries[key];
      const coordinates = geometry.arcs.map(arc => arc.map(point => [
        point[0] * scale[0] + translate[0],
        point[1] * scale[1] + translate[1]
      ]));
      geoData.features.push({
        type: "Feature",
        id: geometry.id,
        properties: {},
        geometry: {
          type: geometry.type,
          coordinates: coordinates
        }
      });
    }

    return geoData;
  }

  function visualizeMap(data) {
    const thresholds = [100, 500, 1000, 5000];
    const colors = ['#ffffff', '#ffcc00', '#ff6600', '#ff3300', '#cc0000'];

    map.addLayer({
      id: 'state-boundaries',
      type: 'fill',
      source: 'states',
      paint: {
        'fill-color': [
          'step',
          ['get', 'cases'],
          colors[0],
          thresholds[0], colors[1],
          thresholds[1], colors[2],
          thresholds[2], colors[3],
          thresholds[3], colors[4]
        ],
        'fill-opacity': 0.7,
        'fill-outline-color': '#000000'
      }
    });
  }

  onMount(() => {
    createMap();
  });
</script>

<style>
  #map {
    width: 100%;
    height: 100vh;
  }
</style>

<main>
  <div id="map"></div>
</main>
