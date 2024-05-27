<!-- <script>
  // Import necessary modules
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { csvParse } from "d3-dsv";

  // Define variables
  let width, height, projection; // Make sure these are defined and initialized properly
  let parsedData = [];

  // Function to fetch and parse CSV data
  

  // Call the function to fetch and parse CSV data
  fetchAndParseCSV();

  // Define tween options
  const tweenOptions = {
    delay: 0,
    duration: 1000,
    easing: cubicOut,
  };

  // Define event handling functions
  function handleMouseOver(prison) {
    console.log("Mouse over:", prison.name);
    // Implement logic for mouse over event
  }

  function handleMouseOut() {
    console.log("Mouse out");
    // Implement logic for mouse out event
  } mapboxgl.accessToken = "pk.eyJ1IjoiYW5nZWxpbmFhYWFhYWEiLCJhIjoiY2x3NGV1OWduMTR2cjJucnNqMGF5OThzYSJ9.NxDqSdB_jZHQDikpDJOMXw";
</script> -->

<script>
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
      const response = await fetch("../data/prisons/facilities.csv"); 
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
</script>

<main>
  <div id="map" style="position: absolute; top: 0; bottom: 0; width: 100%;"></div>
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
  </div>
</main>
