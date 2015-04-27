data = [{label:'⌀ Magdeburg', price:5.67}, {label:'⌀ Deutschland', price:7.07}, {label:'LorenzQuatier GmbH', price:24.10}]

margin = {top: 20, right: 20, bottom: 30, left: 40}
width = 400 - margin.left - margin.right
height = 300 - margin.top - margin.bottom

x = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.6)

y = d3.scale.linear()
  .range([height, 0])

xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")

yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(4)

svg = d3.select("#vis").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

createChart = () ->
  x.domain(data.map( (x) -> x.label ))
  y.domain([0, d3.max(data, (x) -> x.price)])

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("€ / m²")

  bar = svg.selectAll(".bar")
    .data(data)
    .enter().append('g')
    .attr("class", "bar")


  bar.append("rect")
    .attr("x", (d) -> x(d.label) )
    .attr("width", x.rangeBand())
    .attr("y", (d) -> y(d.price) )
    .attr("height", (d) -> height - y(d.price) )

  bar.append("text")
    .text((d) -> d.price)
    .attr("x", (d) -> x(d.label) + 5)
    .attr("width", x.rangeBand())
    .attr("y", (d) -> y(d.price) + 20)
    .attr("height", (d) -> height - y(d.price))

  bar.on('mouseover', (d) ->
    d3.select(this).select('rect')
      .style('fill','white')
      console.log 'lala'
    )

  bar.on('click', (d) ->
    d3.select(this).select('rect')
      .style('fill','white')
    )

  # bar.on('mouseout', (d) ->
  #   d3.selectAll('.bar rect').transition().style('fill','#337ab7')
  #   )

  showDate = (d) ->
$ ->
  createChart()
