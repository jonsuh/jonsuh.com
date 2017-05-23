var chartElementImpressions = document.getElementById("chart-canvas-impressions");
var chartElementClicks = document.getElementById("chart-canvas-clicks");

var chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  legend: { display: false },
  tooltips: { enabled: false },
  hover: { mode: false },
  animation: false
};

var chartDataImpressions = {
  labels: [
    "","","","","","","",""
  ],
  datasets: [
    {
      label: "HTTP",
      backgroundColor: "rgba(33,150,243,0.25)",
      borderColor: "rgba(33,150,243,1)",
      data: [26614,29378,31324,16066,136,0,0,0],
      pointRadius: 0,
    },
    {
      label: "HTTPS",
      backgroundColor: "rgba(124,179,66,0.25)",
      borderColor: "rgba(124,179,66,1)",
      data: [0,0,0,19852,53610,65085,68235,70373],
      pointRadius: 0,
    }
  ]
};

var chartDataClicks = {
  labels: [
    "","","","","","","",""
  ],
  datasets: [
    {
      label: "HTTP",
      backgroundColor: "rgba(33,150,243,0.25)",
      borderColor: "rgba(33,150,243,1)",
      data: [1296,1457,1587,787,2,0,0,0],
      pointRadius: 0,
    },
    {
      label: "HTTPS",
      backgroundColor: "rgba(124,179,66,0.25)",
      borderColor: "rgba(124,179,66,1)",
      data: [0,0,0,1033,2256,2715,2891,2862],
      pointRadius: 0,
    }
  ]
};

var chartLineImpressions = new Chart(chartElementImpressions, {
  type: "line",
  data: chartDataImpressions,
  options: chartOptions
});

var chartLineClicks = new Chart(chartElementClicks, {
  type: "line",
  data: chartDataClicks,
  options: chartOptions
});

document.getElementById("chart-legend-impressions").innerHTML = chartLineImpressions.generateLegend();
document.getElementById("chart-legend-clicks").innerHTML = chartLineClicks.generateLegend();
