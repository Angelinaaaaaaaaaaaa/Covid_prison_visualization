<script>
  import mapboxgl from 'mapbox-gl';
  import * as d3 from 'd3';
  import { fetchJSON } from './utils';
  import { onMount } from 'svelte';


  mapboxgl.accessToken = 'pk.eyJ1IjoiYmVlbGExMTAxIiwiYSI6ImNsdzFjZjgzbDBhbHgycHFxOTBweDJtOGgifQ.O0HdrUIX0Ph5GaBY8HvsTA';
  let map;

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
      const covidData = await fetchJSON('../data/202001.json');
      const tilesetURL = 'mapbox://mapbox.boundaries-adm1-v4';
      map.addSource('states', {
        type: 'vector',
        url: tilesetURL
      });

      map.on('idle', () => {
        const features = map.querySourceFeatures('states');
        const joinedData = features.map(feature => {
          const stateName = feature.properties.name;
          const stateData = covidData.find(data => data.state === stateName);
          return {
            ...feature,
            properties: {
              ...feature.properties,
              cases: stateData ? stateData.cases : 0
            }
          };
        });

        visualizeMap(joinedData);
      });
    } catch (error) {
      console.error('Error fetching COVID-19 data:', error);
    }
  }

  function visualizeMap(data) {
    const colorScale = d3.scaleSequential()
      .domain([0, d3.max(data, d => d.properties.cases)])
      .interpolator(d3.interpolateBlues);

    map.addLayer({
      id: 'state-boundaries',
      type: 'fill',
      source: 'states',
      'source-layer': 'boundaries_admin_1',
      // paint: {
      //   'fill-color': ['interpolate', ['linear'], ['get', 'cases'],
      //     0, '#f8f4f9',
      //     100, '#e0ecf4',
      //     500, '#9ebcda',
      //     1000, '#8856a7',
      //     2000, '#810f7c'
      //   ],
      //   'fill-opacity': 0.7,
      //   'fill-outline-color': '#000000'
      // }
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

