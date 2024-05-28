<!-- <script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import * as d3 from 'd3';
  import mapboxgl from 'mapbox-gl';

  mapboxgl.accessToken = "pk.eyJ1IjoiYW5nZWxpbmFhYWFhYWEiLCJhIjoiY2x3NGV1OWduMTR2cjJucnNqMGF5OThzYSJ9.NxDqSdB_jZHQDikpDJOMXw";

  let map;
  let markers = [];
  let allPrisons = [];
  let searchQuery = writable('');
  let dropdownList = writable([]);

  

  async function fetchAndParseCSV() {
    try {
      const response = await fetch("../data/202001.json"); 
      const csvData = await response.text();
      allPrisons = d3.csvParse(csvData);
      createMap();
    } catch (error) {
      console.error("Error fetching or parsing CSV data:", error);
    }
  }

  function createMap() {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98, 38], // Center the map to the USA
      zoom: 3,
      minZoom: 2,
      maxZoom: 18,
    });

    map.on('load', () => {
      createPrisonMarkers(allPrisons);
    });
  }

  function createPrisonMarkers(data) {
    data.forEach(prison => {
      const marker = new mapboxgl.Marker()
        .setLngLat([+prison.facility_lng, +prison.facility_lat])
        .addTo(map);
      markers.push(marker);
    });
  }

  function filterMarkers(searchQuery) {
    const filteredData = allPrisons.filter(item => item.facility_name.toLowerCase().includes(searchQuery.toLowerCase()));
    markers.forEach(marker => marker.remove()); // Remove existing markers
    createPrisonMarkers(filteredData);

    // Update dropdown list with matching prison names
    dropdownList.set(filteredData
      .slice(0, 5) // Adjust the number of dropdown items as needed
      .map(item => ({ name: item.facility_name })));
  }

  onMount(() => {
    fetchAndParseCSV();
  });

  $: {
    filterMarkers($searchQuery);
  }

  function handleDropdownClick(item) {
    searchQuery.set(item.name);
  }
</script> -->

<script>
    import mapboxgl from 'mapbox-gl';
    import * as d3 from 'd3';
    import { fetchJSON } from './utils'; // Function to fetch JSON data
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

// Initialize Mapbox map
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVlbGExMTAxIiwiYSI6ImNsdzFjZjgzbDBhbHgycHFxOTBweDJtOGgifQ.O0HdrUIX0Ph5GaBY8HvsTA';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-98, 38],
  zoom: 3
});

// Fetch COVID-19 data (202001.json)
fetchJSON('../data/202001.json')
  .then(covidData => {
    // Fetch Mapbox Boundaries tileset (admin level 1 for states)
    const tilesetURL = 'mapbox://mapbox.boundaries-adm1-v3';
    map.addSource('states', {
      type: 'vector',
      url: tilesetURL
    });

    // Join COVID-19 data with Mapbox boundaries data
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

      // Visualize the map
      visualizeMap(joinedData);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to visualize the map
function visualizeMap(data) {
  // Define color scale based on the number of cases
  const colorScale = d3.scaleSequential()
    .domain([0, d3.max(data, d => d.properties.cases)])
    .interpolator(d3.interpolateBlues);

  // Add state boundaries layer to the map
  map.addLayer({
    id: 'state-boundaries',
    type: 'line',
    source: 'states',
    'source-layer': 'boundaries_admin_1',
    paint: {
      'line-color': ['get', 'properties.cases'],
      'line-opacity': 0.7
    }
  });
}
</script>

<!-- <style>
  #map {
    width: 100%;
    height: 400px;
  }
</style> -->


<main>
  <!-- <div id="map" style="position: absolute; top: 0; bottom: 0; width: 100%;"></div>
  <div class="overlay">
    <input
      class="search-box"
      type="text"
      placeholder="Search by prison name"
      bind:value={$searchQuery}
    />
    {#if $searchQuery}
      <ul class="dropdown">
        {#each $dropdownList as item}
          <li on:click={() => handleDropdownClick(item)}>{item.name}</li>
        {/each}
      </ul>
    {/if}
  </div> -->
</main>
