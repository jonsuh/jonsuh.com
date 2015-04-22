var contentChart = document.getElementById("content-pie-chart").getContext("2d");

var options = {
  // Boolean - Whether to show labels on the scale
  scaleShowLabels: false, // scaleShowLabels: true,

  // Boolean - whether or not the chart should be responsive and resize when the browser does.
  responsive: false, // responsive: false,

  // Boolean - Determines whether to draw tooltips on the canvas or not
  showTooltips: false, // showTooltips: true,

  // Pie chart options
  // ==================================================
  //Boolean - Whether we should show a stroke on each segment
  segmentShowStroke : true,

  //String - The colour of each segment stroke
  segmentStrokeColor : "#fff",

  //Number - The width of each segment stroke
  segmentStrokeWidth : 2,

  //Number - The percentage of the chart that we cut out of the middle
  percentageInnerCutout : 0, // This is 0 for Pie charts

  //Boolean - Whether we animate the rotation of the Doughnut
  animateRotate : false,

  //Boolean - Whether we animate scaling the Doughnut from the centre
  animateScale : false,
}

var contentData = [
  {
      value: 1249,
      color:"#f44336",
      label: "Images: 1,249KB" //64.1%
  },
  {
      value: 58,
      color: "#2196f3",
      label: "HTML: 58KB" // 3%
  },
  {
      value: 60,
      color: "#4caf50",
      label: "CSS: 60KB" // 3%
  },
  {
      value: 303,
      color: "#ffeb3b",
      label: "JS: 303KB" // 15.5%
  },
  {
      value: 87,
      color: "#9c27b0",
      label: "Fonts: 87KB" // 4.5%
  },
  {
      value: 67,
      color: "#555",
      label: "Flash: 67KB" // 3.4%
  },
  {
      value: 126,
      color: "#ff9800",
      label: "Other: 126KB" // 6.5%
  }
];

var contentPieChart = new Chart(contentChart).Pie(contentData, options);

legend(document.getElementById("content-pie-chart-legend"), contentData);