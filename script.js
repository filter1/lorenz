(function() {
  var createChart, data, height, margin, svg, width, x, xAxis, y, yAxis;

  data = [
    {
      label: '⌀ Magdeburg',
      price: 5.67
    }, {
      label: '⌀ Deutschland',
      price: 7.07
    }, {
      label: 'LorenzQuartier GmbH',
      price: 24.10
    }
  ];

  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  };

  width = 400 - margin.left - margin.right;

  height = 300 - margin.top - margin.bottom;

  x = d3.scale.ordinal().rangeRoundBands([0, width], 0.6);

  y = d3.scale.linear().range([height, 0]);

  xAxis = d3.svg.axis().scale(x).orient("bottom");

  yAxis = d3.svg.axis().scale(y).orient("left").ticks(4);

  svg = d3.select("#vis").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  createChart = function() {
    var bar, showDate;
    x.domain(data.map(function(x) {
      return x.label;
    }));
    y.domain([
      0, d3.max(data, function(x) {
        return x.price;
      })
    ]);
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
    svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("€ / m²");
    bar = svg.selectAll(".bar").data(data).enter().append('g').attr("class", "bar");
    bar.append("rect").attr("x", function(d) {
      return x(d.label);
    }).attr("width", x.rangeBand()).attr("y", function(d) {
      return y(d.price);
    }).attr("height", function(d) {
      return height - y(d.price);
    });
    bar.append("text").text(function(d) {
      return d.price;
    }).attr("x", function(d) {
      return x(d.label) + 5;
    }).attr("width", x.rangeBand()).attr("y", function(d) {
      return y(d.price) + 20;
    }).attr("height", function(d) {
      return height - y(d.price);
    });
    bar.on('mouseover', function(d) {
      d3.select(this).select('rect').style('fill', 'white');
      return console.log('lala');
    });
    bar.on('mouseout', function(d) {
      d3.selectAll('rect').style('fill', '#337ab7');
      return console.log('lala');
    });
    bar.on('click', function(d) {
      return d3.select(this).select('rect').style('fill', 'white');
    });
    return showDate = function(d) {};
  };

  $(function() {
    return createChart();
  });

}).call(this);
