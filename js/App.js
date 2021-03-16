const mymap = L.map("map", { zoomControl: false }).setView([51.505, -0.09], 13);
const customMaker = L.icon({
  iconUrl: "./images/icon-location.svg",
});
const marker = L.marker([51.5, -0.09], { icon: customMaker }).addTo(mymap);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFwcHlwb28iLCJhIjoiY2ttYXZxaDFtMWdrdDJvbGFib25ib3VkcCJ9.e91zJAJl0xRJe-R1BpaK5g",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: "your.mapbox.access.token",
  }
).addTo(mymap);

const form = document.querySelector("form");
const output = document.querySelector(".output");
const outputInfo = [...document.querySelectorAll("span")];
const input = document.querySelector("input");
const url =
  "https://geo.ipify.org/api/v1?apiKey=at_ejnyc30RSYskAp44XdjT1fMtBIqjq&domain=";

const checkIp = async (ip) => {
  output.classList.add("loading");
  try {
    const response = await fetch(url + ip);
    const data = await response.json();
    output.classList.remove("loading");

    if (data.ip) {
      outputInfo.forEach((el, i) => {
        if (i === 0) {
          el.innerHTML = data.ip;
        }
        if (i === 1) {
          el.innerHTML = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
        }
        if (i == 2) {
          el.innerHTML = `UTC ${data.location.timezone}`;
        }
        if (i == 3) {
          el.innerHTML = data.isp;
        }
      });
      input.value = "";
      const newLatLng = new L.LatLng(data.location.lat, data.location.lng);
      mymap.flyTo(newLatLng, 13);
      marker.setLatLng(newLatLng);
    }
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkIp(input.value);
});
