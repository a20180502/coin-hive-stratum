var numGradients = 10,
    width = window.innerWidth,
    height = window.innerHeight;

var svg = d3.select(".parallax-container")
    .append('svg')
    .attr('viewBox', '0 0 '+width+' '+height)
    .attr('preserveAspectRatio', 'none');


//svg.on("touchmove mousemove", moved);

var gradients = d3.range(numGradients)
  .map(function(d) {
    var theta = (d * (360/numGradients) ) * (Math.PI / 180);
    return {
      "x1": Math.round(50 + Math.sin(theta) * 50) + "%",
      "y1": Math.round(50 + Math.cos(theta) * 50) + "%",
      "x2": Math.round(50 + Math.sin(theta + Math.PI) * 50) + "%",
      "y2": Math.round(50 + Math.cos(theta + Math.PI) * 50) + "%",
    }
  });

var defs = svg.append("defs")
    .selectAll("linearGradient")
    .data(gradients)
    .enter().append("linearGradient")
    .call(function(gradient) {
      gradient.attr("id", function (d, i) { return "gradient"+i })
      gradient.attrs({
          x1: function (d) { return d.x1; },
          y1: function (d) { return d.y1; },
          x2: function (d) { return d.x2; },
          y2: function (d) { return d.y2; },
        });
      gradient.append("stop").attr("offset", "0%");
      gradient.append("stop").attr("offset", "100%");
    });

var sites = d3.range(100)
    .map(function(d) {
      return [Math.random() * width, Math.random() * height, Math.floor(Math.random()*numGradients)];
    });

var voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);

var polygon = svg.append("g")
    .attr("class", "polygons")
    .selectAll("path")
    .data(voronoi.polygons(sites))
    .enter().append("path")
    .attr("fill", function(d) { return 'url(#gradient'+d['data'][2]+')' })
    .call(redrawPolygon);

function moved() {
  sites[0] = d3.mouse(this);
  redraw();
}

function redraw() {
  var diagram = voronoi(sites);
  polygon = polygon.data(diagram.polygons()).call(redrawPolygon);
}

function redrawPolygon(polygon) {
  polygon
    .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; });
}

