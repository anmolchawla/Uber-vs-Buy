d3.json('data_line.json').then(function(data){
    var margin = { top: 30, left: 60, bottom: 40, right: 140 };
    var width = parseInt(d3.select("#chart").style("width")) - margin.left - margin.right;//800;
    var height = parseInt(d3.select("#chart").style("height")) - margin.top - margin.bottom;//500;
    var duration = 250;
    
    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "4.5px";
    var lineStrokeHover = "5.5px";
    
    var circleOpacity = '0.85';
    var circleOpacityOnLineHover = "0.25"
    var circleRadius = 5;
    var circleRadiusHover = 7;
    var inLevel = 1;
    var dataChain = [];
    var firstChart = true;
  
    //LEGEND
    //var legendRectSize = 25; // defines the size of the colored squares in legend
    //var legendSpacing = 6;
  
    /*For adding tooltip*/
    var div = d3.select("body").append("div")	
      .attr("class", "tooltip")				
      .style("opacity", 0);
    
    var flag = 0;
    var button = d3.select("#top").append("div")
      .append("button")	
      .attr("class", "button")
      .text("Hide Buttons")
      .on("click",function(d){
        if(flag == 0){
          lines.selectAll(".circle").transition().style("opacity",0);
          button.text("Show Buttons");
          flag = 1;
        } else{
          flag = 0;
          /* Add circles in the line */
          button.text("Hide Buttons");
          lines.selectAll(".circle").transition().style("opacity",100);
        }
      } 
      );

    //add button reference
    var button = d3.select("#backButton")
        .on("click", goLevelUp)
    
    dataChain.push( data );
    renderLine(data)

    function goLevelUp() {
        if(inLevel == 1){
            return false;
        }
        inLevel = inLevel-1;
        //console.log("PRE-DATACHAIN")
        //console.log(dataChain)
        dataChain.splice(dataChain.length - 1, 1);
        //console.log("POST-DATACHAIN")
        //console.log(dataChain)
        var prev = dataChain[dataChain.length - 1];
        renderLine(prev);
        if(self.inLevel === 1)
            //console.log("here")  
        //self.navigation.hide();
        return false;
    };

    function lineClick(d, i) {
        if(typeof d.categories === 'undefined')
          return false;
    
        ////console.log(d.data);
        inLevel++;
        //console.log("DCAT")
        //console.log(d)
        dataChain.push( d.categories );
        //console.log("DATACHAIN")
        //console.log(dataChain)
        renderLine(d.categories);
    
        return false;
      };

    function renderLine(data1){
        var maxVal = 0
        if(data1[0].values[0].date.length === undefined){
            data1.forEach(function(d) { 
                var count = 1973
                d.values.forEach(function(d) {
                    d.date = count;
                    d.sales = +d.sales;  
                    count += 1  
                });
            });
        }
        
        /* Remove any existing lines */
        d3.select("#chart").selectAll("*").remove();

        /* Format Data */
        var parseDate = d3.timeParse("%Y");
        data1.forEach(function(d) { 
            d.values.forEach(function(d) {
                d.date = parseDate(d.date);
                d.sales = +d.sales;   
                if(d.sales > maxVal){
                    maxVal = d.sales
                } 
            });
        });
        
        /* Scale */
        var xScale = d3.scaleTime()
            .domain(d3.extent(data1[0].values, d => d.date))
            .rangeRound([0, width]);
        
        var yScale = d3.scaleLinear()
            .domain([0,maxVal])
            .rangeRound([height, 0]);
        
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        
        /* Add SVG */
        var svg = d3.select("#chart").append("svg")
            .attr("width", (width+margin.right+margin.left)+"px")
            .attr("height", (height + margin.bottom + margin.top)+"px")
            .append('g')
            .attr("transform", "translate(" + (margin.left)+ "," + margin.top + ")");

        /* Add line into SVG */
        var line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.sales));
  
        let lines = svg.append('g')
            .attr('class', 'lines');
        
        lines.selectAll('.line-group')
            .data(data1).enter()
            .append('g')
            .attr('class', 'line-group')  
            .on("mouseover", function(d, i) {
                div.transition()				
                    .style("opacity", .8)
                    .style("padding","2px")
                    .style("font-size","15px")
                    .style("background","yellow");
                
                div.html(d.name)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()			
                    .style("opacity", 0);
            })
            .append('path')
            .attr('class', 'line')  
            .attr('d', d => line(d.values))
            //.attr("data-legend",function(d) { return d})
            .style('stroke', (d, i) => color(i))
            .style('opacity', lineOpacity)
            .style('stroke-width', lineStroke)
            .attr('fill','none')
            .on("mouseover", function(d) {
                d3.selectAll('.line')
                            .style('opacity', otherLinesOpacityHover);
                d3.select(this)
                .style('opacity', lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
                .style("cursor", "pointer");
            })
            .on("mouseout", function(d) {
                d3.selectAll(".line")
                            .style('opacity', lineOpacity);
                d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
            })
            .on('click', lineClick);
        
        
        /* Add circles in the line */
        lines.selectAll("circle-group")
            .data(data1).enter()
            .append("g")
            .style("fill", (d, i) => color(i))
            .selectAll("circle")
            .data(d => d.values).enter()
            .append("g")
            .attr("class", "circle")  
            .on("mouseover", function(d,i) {
                div.transition()				
                    .style("opacity", .8);
                div.html(d.date.getFullYear()+":"+ "<br/>"  + d.sales)	
                    .style("left", (d3.event.pageX) + "px")		
                    .style("top", (d3.event.pageY - 60) + "px")
                    .style("padding","2px")
                    .style("font-size","15px")
                    .style("background","yellow");
            })
            .on("mouseout", function(d) {
                div.transition()			
                    .style("opacity", 0);
            })
            .append("circle")
            .attr("cx", d => xScale(d.date))
            .attr("cy", d => yScale(d.sales))
            .attr("r", circleRadius)
            .style('opacity', circleOpacity)
            .on("mouseover", function(d) {
                d3.select(this)
                    .transition()
                    .duration(duration)
                    .attr("r", circleRadiusHover);
                })
            .on("mouseout", function(d) {
                d3.select(this) 
                    .transition()
                    .duration(duration)
                    .attr("r", circleRadius);  
                });
        
        
        /* Add Axis into SVG */
        var xAxis = d3.axisBottom(xScale).ticks(10);
        var yAxis = d3.axisLeft(yScale).ticks(10);
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)
            .append('text')
            .attr("y", 30)
            .attr("x", 228)
            .attr("fill", "#000")
            .text("Year");
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append('text')
            .attr("y", -30)
            .attr("x", -100)
            .attr("transform", "rotate(-90)")
            .attr("transform","")
            .attr("fill", "#000")
            .text("salesility Rate");

            /*var legend = svg.selectAll('.legend') 
                .data(data1) 
                .enter() 
                .append('g')
                .attr('class', 'legend') 
                .attr('transform', function(d, i) {                 
                var height = legendRectSize + legendSpacing;     
                var offset =  -30; 
                var horz = width + 10; 
                var vert = i * height - offset;               
                return 'translate(' + horz + ',' + vert + ')';        
                });
            legend.append('rect')                                  
                .attr('width', legendRectSize)                        
                .attr('height', legendRectSize)                      
                .style("fill", function(d,i) { return color(i); })
                .style('stroke', function(d,i) { return color(i); })
            // adding text to legend
            legend.append('text')                                    
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing)
                .text(function(d) { return d.name; });

            //console.log("AFTER RENDER CHAIN")
            //console.log(dataChain)*/
        }
    });
