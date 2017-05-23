var chartElement = document.getElementById("chart-canvas");

var chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  legend: { display: false },
  tooltips: { enabled: false },
  hover: { mode: false },
  animation: false
};

var chartData = {
  labels: [
    "Images: 1,249KB", "HTML: 58KB", "CSS: 60KB", "JS: 303KB", "Fonts: 87KB", "Flash: 67KB", "Other: 126KB",
  ],
  datasets: [
    {
      data: [1249, 58, 60, 303, 87, 67, 126],
      backgroundColor: ["#f44336", "#2196f3", "#4caf50", "#ffeb3b", "#9c27b0", "#555", "#ff9800"],
    }
  ]
};

var chartPie = new Chart(chartElement, {
  type: "pie",
  data: chartData,
  options: chartOptions
});

document.getElementById("chart-legend").innerHTML = chartPie.generateLegend();
