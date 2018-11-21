d3.json('electric_vehicles.json').then(function(data){
    var maxRange = 0;
    data.forEach(function(d){
        if(d.empg > maxRange){
            maxRange = d.empg
        }
    });
    
    var svg = d3.select("#chart-lollipop");

    //setting up axis functions
    var y = d3.scaleLinear()
        .domain([maxRange,0])
        .range([0, 500]);
    var axisY = d3.axisLeft()
        .scale(y);
    svg.append("g")
        .attr("class", "axis-Y")
        .attr("transform", "translate(100,100)")
        .call(axisY);
    var x = d3.scaleBand()
        .domain(data.map(a => a.name))
        .range([0, 1300])
        .paddingInner(0.05);
    var axisX = d3.axisBottom()
        .scale(x);
    svg.append("g")
        .attr("class", "axis-X")
        .attr("transform", "translate(100, 600)")
        .call(axisX);

    //enter rectangles
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", function(d){
            return y(d.empg)+100;
        })
        .attr("x", function(d,i) { 
            return 140 + 93.1*i;
        })
        .attr("height", function(d){
            return 500-y(d.empg);
        }) 
        .attr("width", 10)
        .attr('fill', 'skyblue');

    svg.selectAll("image")
        .data(data)
        .enter()
        .append("svg:image")
        .attr("y", function(d){
            return y(d.empg)+100 - 25;
        })
        .attr("x", function(d,i) { 
            return 120 + 93.1*i;
        })
        .attr("height", 50) 
        .attr("width", 50)
        .attr("xlink:href", "ev-icon.png")
        .style("an")

});
