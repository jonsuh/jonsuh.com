function legend(parent, data) {
  parent.className = "chart-legend";
  var datas = data.hasOwnProperty("datasets") ? data.datasets : data;

  // remove possible children of the parent
  while(parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }

  datas.forEach(function(d) {
    // var title = document.createElement("span");
    // title.className = "chart-legend-title";
    // title.style.borderColor = d.hasOwnProperty("strokeColor") ? d.strokeColor : d.color;
    // title.style.borderStyle = "solid";
    // parent.appendChild(title);

    var item = document.createElement("span");
    item.className = "chart-legend-item";
    parent.appendChild(item);

    var color = document.createElement("span");
    color.className = "chart-legend-item-color";
    color.style.backgroundColor = d.hasOwnProperty("strokeColor") ? d.strokeColor : d.color;
    item.appendChild(color);

    var title = document.createElement("span");
    title.className = "chart-legend-item-title";
    item.appendChild(title);

    var text = document.createTextNode(d.label);
    title.appendChild(text);
  });
}