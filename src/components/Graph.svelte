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
</main> -->


<script>


  import { fly, draw } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut, cubicInOut } from "svelte/easing";
  // npm install vite-plugin-csv --save-dev
  // import  cities  from "../data/prisons/facilities.csv";
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import * as d3 from 'd3';
  import mapboxgl from 'mapbox-gl';

  export let index, width, height, projection;

  mapboxgl.accessToken = "pk.eyJ1IjoiYW5nZWxpbmFhYWFhYWEiLCJhIjoiY2x3NGV1OWduMTR2cjJucnNqMGF5OThzYSJ9.NxDqSdB_jZHQDikpDJOMXw";

  let map;
  let markers = [];
  let allPrisons = [];
  let searchQuery = writable('');
  let dropdownList = writable([]);
  let selectedPrison = writable(null);

  async function fetchAndParseCSV() {
    try {
      const response = await fetch("../data/prisons/facilities.csv"); 
      const csvData = await response.text();
      allPrisons = d3.csvParse(csvData);
      createMap();
      createLineChart(allPrisons);
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
    markers.forEach(marker => marker.remove());
    markers = [];
    data.forEach(prison => {
      const marker = new mapboxgl.Marker()
        .setLngLat([+prison.facility_lng, +prison.facility_lat])
        .addTo(map)
        .getElement().addEventListener('click', () => {
          selectedPrison.set(prison);
          createLineChart([prison]);
        });
      markers.push(marker);
    });
  }

  function filterMarkers(searchQuery) {
    const filteredData = allPrisons.filter(item => item.facility_name.toLowerCase().includes(searchQuery.toLowerCase()));
    createPrisonMarkers(filteredData);

    // Update dropdown list with matching prison names
    dropdownList.set(filteredData
      .slice(0, 5) // Adjust the number of dropdown items as needed
      .map(item => ({ name: item.facility_name })));
  }

  function createLineChart(data) {
    const svg = d3.select("#lineChart").html("").append("svg")
      .attr("width", 500)
      .attr("height", 300);
      
    const margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;
      
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    const parseTime = d3.timeParse("%Y-%m-%d");

    data.forEach(prison => {
      prison.values = [
        { date: parseTime("2020-01-01"), value: +prison.total_inmate_cases || 0 },
        // Add more data points as needed
      ];
    });

    x.domain(d3.extent(data[0].values, d => d.date));
    y.domain([0, d3.max(data[0].values, d => d.value)]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));

    g.append("path")
      .datum(data[0].values)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
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


//   let csvData;
//   onMount(async () => {
//     const response = await fetch("../data/prisons/facilities.csv");
//     if (response.ok) {
//       const csvText = await response.text();
//       csvData = csvParse(csvText); // Parse CSV text using csvParse
//     } else {
//       console.error("Failed to fetch CSV data");
//     }
//   });


// async function fetchAndParseCSV() {
//   try {
//     const response = await fetch("../data/prisons/facilities.csv");
//     if (!response.ok) {
//       throw new Error("Failed to fetch CSV data");
//     }
//     const csvData = await response.text();
//     const parsedData = d3.csvParse(csvData);
//     return parsedData;
//   } catch (error) {
//     console.error("Error fetching or parsing CSV data:", error);
//     return null;
//   }
// }
  

//   // Define tweened properties and options
//   const tweenOptions = {
//     delay: 0,
//     duration: 1000,
//     easing: cubicOut,
//   };

//   // Define tweened properties for X and Y coordinates
// const tweenedX = tweened(
//   csvData ? csvData.map(d => /* Access X coordinate from CSV data */) : [],
//   tweenOptions
// );

// const tweenedY = tweened(
//   csvData ? csvData.map(d => /* Access Y coordinate from CSV data */) : [],
//   tweenOptions
// );
//   // Create a new array of objects with tweened X and Y coordinates
//   $: tweenedData = csvData.map((d, i) => ({
//     x: $tweenedX[i],
//     y: $tweenedY[i],
//     // Additional properties from CSV data if needed
//   }));


</script>

<style>
  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .overlay {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
  .search-box {
    width: 200px;
    padding: 5px;
  }
  .dropdown {
    list-style-type: none;
    padding: 0;
    margin: 0;
    background-color: white;
    border: 1px solid #ccc;
  }
  .dropdown li {
    padding: 5px;
    cursor: pointer;
  }
  .dropdown li:hover {
    background-color: #f0f0f0;
  }
</style>

<main>
  <div id="map"></div>
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
  <div id="lineChart"></div>
</main>
