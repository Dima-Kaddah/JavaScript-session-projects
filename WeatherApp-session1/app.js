'use strict';
const ctx = document.getElementById('myChart');
let dayLeb = [];
let minTemp = [];
let maxTemp = [];
const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: dayLeb,
    datasets: [
      {
        label: 'Max',
        data: maxTemp,
        backgroundColor: 'rgb(255,0,0,0.2)',
        borderColor: 'rgb(255,0,0,0.1)',
      },
      {
        label: 'Min',
        data: minTemp,
        backgroundColor: 'rgb(255,0,0,0.2)',
        borderColor: 'rgb(255,0,0,0.1)',
      },
    ],
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Get the Min and Max Temperature',
    },
  },
});

function fetchData(url) {
  fetch(url)
    .then(response => {
      response.json().then(data => {
        console.log(data);
        data.Days.forEach(day => {
          dayLeb.push(day.date);
          maxTemp.push(day.temp_max_c);
          minTemp.push(day.temp_min_c);
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
}
const url =
  'http://api.weatherunlocked.com/api/forecast/51.50,-0.12?app_id=e09624db&app_key=6a5184db47a42c2883d3abaa3d50c186';
window.onload = () => fetchData(url);
