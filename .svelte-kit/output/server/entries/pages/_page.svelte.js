import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../chunks/index.js";
import mapboxgl from "mapbox-gl";
import { geoMercator } from "d3-geo";
import "d3";
const Scroller_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: "svelte-scroller-outer.svelte-xdbafy{display:block;position:relative}svelte-scroller-background.svelte-xdbafy{display:block;position:relative;width:100%}svelte-scroller-foreground.svelte-xdbafy{display:block;position:relative;z-index:2}svelte-scroller-foreground.svelte-xdbafy::after{content:' ';display:block;clear:both}svelte-scroller-background-container.svelte-xdbafy{display:block;position:absolute;width:100%;max-width:100%;pointer-events:none;will-change:transform}",
  map: null
};
const handlers = [];
if (typeof window !== "undefined") {
  const run_all = () => handlers.forEach((fn) => fn());
  window.addEventListener("scroll", run_all);
  window.addEventListener("resize", run_all);
}
if (typeof IntersectionObserver !== "undefined") {
  const map = /* @__PURE__ */ new Map();
  new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const update = map.get(entry.target);
        const index = handlers.indexOf(update);
        if (entry.isIntersecting) {
          if (index === -1)
            handlers.push(update);
        } else {
          update();
          if (index !== -1)
            handlers.splice(index, 1);
        }
      });
    },
    {
      rootMargin: "400px 0px"
      // TODO why 400?
    }
  );
}
const Scroller = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let widthStyle;
  let { top = 0 } = $$props;
  let { bottom = 1 } = $$props;
  let { threshold = 0.5 } = $$props;
  let { query = "section" } = $$props;
  let { parallax = false } = $$props;
  let { index = 0 } = $$props;
  let { count = 0 } = $$props;
  let { offset = 0 } = $$props;
  let { progress = 0 } = $$props;
  let { visible = false } = $$props;
  let outer;
  let foreground;
  let background;
  let offset_top = 0;
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  if ($$props.bottom === void 0 && $$bindings.bottom && bottom !== void 0)
    $$bindings.bottom(bottom);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0)
    $$bindings.threshold(threshold);
  if ($$props.query === void 0 && $$bindings.query && query !== void 0)
    $$bindings.query(query);
  if ($$props.parallax === void 0 && $$bindings.parallax && parallax !== void 0)
    $$bindings.parallax(parallax);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  if ($$props.progress === void 0 && $$bindings.progress && progress !== void 0)
    $$bindings.progress(progress);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0)
    $$bindings.visible(visible);
  $$result.css.add(css$3);
  style = `
		position: ${"absolute"};
		top: 0;
		transform: translate(0, ${offset_top}px);
		z-index: ${1};
	`;
  widthStyle = "";
  return `

<svelte-scroller-outer class="svelte-xdbafy"${add_attribute("this", outer, 0)}><svelte-scroller-background-container class="background-container svelte-xdbafy" style="${escape(style, true) + escape(widthStyle, true)}"><svelte-scroller-background class="svelte-xdbafy"${add_attribute("this", background, 0)}>${slots.background ? slots.background({}) : ``}</svelte-scroller-background></svelte-scroller-background-container>

	<svelte-scroller-foreground class="svelte-xdbafy"${add_attribute("this", foreground, 0)}>${slots.foreground ? slots.foreground({}) : ``}</svelte-scroller-foreground>
</svelte-scroller-outer>`;
});
const Map_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".map.svelte-r2qpwq{width:100%;height:100vh;position:absolute;opacity:0;visibility:hidden;transition:opacity 2s, visibility 2s;outline:blue solid 3px}.map.visible.svelte-r2qpwq{opacity:1;visibility:visible}",
  map: null
};
const Map$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index } = $$props;
  let { geoJsonToFit } = $$props;
  mapboxgl.accessToken = "pk.eyJ1IjoiYW5nZWxpbmFhYWFhYWEiLCJhIjoiY2x3NGV1OWduMTR2cjJucnNqMGF5OThzYSJ9.NxDqSdB_jZHQDikpDJOMXw";
  let container;
  let isVisible = false;
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.geoJsonToFit === void 0 && $$bindings.geoJsonToFit && geoJsonToFit !== void 0)
    $$bindings.geoJsonToFit(geoJsonToFit);
  $$result.css.add(css$2);
  {
    if (index === 2) {
      isVisible = true;
    } else {
      isVisible = false;
    }
  }
  return `${$$result.head += `<!-- HEAD_svelte-1s9kg0l_START --><link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.14.0/mapbox-gl.css"><!-- HEAD_svelte-1s9kg0l_END -->`, ""}

<div class="${["map svelte-r2qpwq", isVisible ? "visible" : ""].join(" ").trim()}"${add_attribute("this", container, 0)}></div>`;
});
const Graph_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "#map.svelte-g3xx0m{width:100%;height:100vh}",
  map: null
};
const Graph = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  mapboxgl.accessToken = "pk.eyJ1IjoiYmVlbGExMTAxIiwiYSI6ImNsdzFjZjgzbDBhbHgycHFxOTBweDJtOGgifQ.O0HdrUIX0Ph5GaBY8HvsTA";
  $$result.css.add(css$1);
  return `<main><div id="map" class="svelte-g3xx0m"></div></main>`;
});
const ScrollyTeller_svelte_svelte_type_style_lang = "";
const css = {
  code: ".background.svelte-zwby8r{width:100%;height:100vh;position:relative;outline:green solid 3px}.foreground.svelte-zwby8r{width:50%;margin:0 auto;height:auto;position:relative;outline:red solid 3px}.progress-bars.svelte-zwby8r{position:absolute;background:rgba(170, 51, 120, 0.2) /*  40% opaque */;visibility:visible}section.svelte-zwby8r{height:80vh;background-color:rgba(0, 0, 0, 0.2);outline:magenta solid 3px;text-align:center;max-width:750px;color:black;padding:1em;margin:0 0 2em 0}",
  map: null
};
const ScrollyTeller = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let projection;
  let count, index, offset, progress;
  let width, height;
  let geoJsonToFit = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [1, 0] }
      },
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [0, 1] }
      }
    ]
  };
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    projection = geoMercator().fitSize([width, height], geoJsonToFit);
    $$rendered = `${validate_component(Scroller, "Scroller").$$render(
      $$result,
      {
        top: 0,
        bottom: 1,
        threshold: 0.5,
        count,
        index,
        offset,
        progress
      },
      {
        count: ($$value) => {
          count = $$value;
          $$settled = false;
        },
        index: ($$value) => {
          index = $$value;
          $$settled = false;
        },
        offset: ($$value) => {
          offset = $$value;
          $$settled = false;
        },
        progress: ($$value) => {
          progress = $$value;
          $$settled = false;
        }
      },
      {
        foreground: () => {
          return `<div class="foreground svelte-zwby8r" slot="foreground"><section class="svelte-zwby8r">This is the first section.</section>
      <section class="svelte-zwby8r">This is the second section.</section>
      <section class="svelte-zwby8r">This is the third section.</section>
      <section class="svelte-zwby8r">This is the forth section.</section>
      <section class="svelte-zwby8r">This is the fifth section.</section>
      <section class="svelte-zwby8r">This is the sixth section.</section></div>`;
        },
        background: () => {
          return `<div class="background svelte-zwby8r" slot="background">${validate_component(Map$1, "Map").$$render(
            $$result,
            { index, geoJsonToFit },
            {
              geoJsonToFit: ($$value) => {
                geoJsonToFit = $$value;
                $$settled = false;
              }
            },
            {}
          )}
    ${validate_component(Graph, "Graph").$$render($$result, { index, width, height, projection }, {}, {})}

      <div class="progress-bars svelte-zwby8r"><p>current section: <strong>${escape(index + 1)}/${escape(count)}</strong></p>
        <progress${add_attribute("value", count ? (index + 1) / count : 0, 0)}></progress>

        <p>offset in current section</p>
        <progress${add_attribute("value", offset || 0, 0)}></progress>

        <p>total progress</p>
        <progress${add_attribute("value", progress || 0, 0)}></progress></div></div>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${validate_component(ScrollyTeller, "ScrollyTeller").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
