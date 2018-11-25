import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3';
import * as $ from 'jquery';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';



import { STOCKS } from '../shared';

@Component({
    selector: 'app-step1',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step1.component.html',
    styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit {

    title = 'Step 1: Market Exploration';





    constructor() {

    }

    ngOnInit() {

        this.barz();
        this.linez();
        this.piez();


    }



    private barz(){
        
        d3.json('/assets/data_bar.json').then(function(data_before){
            console.log(data_before)
            //document.getElementById("salesButton").style.background="lightblue";
            //Setting up variables
            var inLevel = 1;
            var dataChain = [];
            var choiceGlobal = 0;
            var maxV = 0
        
            var svg = d3.select("#chart1");
            var firstData = data_before.map(x => x);
            var currentData = data_before;
            var topData = data_before.slice(0).sort(function(a, b) { 
                return b.sales - a.sales;
            }).slice(0,5).map(x => x);
            var bottomData = data_before.slice(0).sort(function(a, b) { 
                return a.sales - b.sales;
            }).slice(0,5).map(x => x);
            var sortState = 0; //alphabetical=0, asc=1, desc=2
        
            dataChain.push(firstData);
            console.log("DATACHAIN")
            console.log(dataChain)
            renderBars(currentData,choiceGlobal)
        
            function renderBars(tempData,choice){
                /*var maxVal = 0
                if(data1[0].values[0].date.length === undefined){
                    data1.forEach(function(d) { 
                        var count = 1973
                        d.values.forEach(function(d) {
                            d.date = count;
                            d.sales = +d.sales;  
                            count += 1  
                        });
                    });
                }*/
                choiceGlobal = choice
                var maxVal = 0
                tempData.forEach(function(d) { 
                    if(choice == 0){
                        if(d.sales > maxVal){
                            maxVal = d.sales;
                        }
                    }
                    else if(choice == 1){
                        if(d.mpg > maxVal){
                            maxVal = d.mpg;
                        }
                    } else{
                        if(d.price > maxVal){
                            maxVal = d.price;
                        }
                    }
                });
                maxV = maxVal
                
                /* Remove any existing lines */
                d3.select("#chart").selectAll("*").remove();
                d3.select(".axis-X").remove()
                d3.select(".axis-Y").remove()
        
                //setting up axis functions
                var x = d3.scaleLinear()
                    .domain([0,maxVal])
                    .range([0, 750]);
                var axisX = d3.axisTop()
                    .scale(x);
                svg.append("g")
                    .attr("class", "axis-X")
                    .attr("transform", "translate(100,100)")
                    .call(axisX);
        
                //setting up text
                var title = svg.append("text")             
                    .attr("transform","translate(565, 50)")
                    .style("text-anchor", "middle")
                    .text("Fertility Rates By Country in 1950");
                svg.append("text")
                    .attr("transform", "translate(250, 50)")
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text("Fertility Rate");
                var ylabel = svg.append("text")             
                    .attr("transform","translate(10, 250),rotate(-90)")
                    .style("text-anchor", "middle")
                    .text("Country");
        
                //call first state
                update(tempData);
            }
            
            //update function
            function update(data) {
                currentData = data
                var len = 30*data.length
        
                var y = d3.scaleBand()
                    .domain(data.map(a => a.category))
                    .range([0, len])
                    .paddingInner(0.05);
                var axisY = d3.axisLeft()
                    .scale(y);
                d3.selectAll(".axis-Y").remove()
                svg.append("g")
                    .attr("class", "axis-Y")
                    .attr("transform", "translate(100,100)")
                    .call(axisY);
        
                var rects = svg.selectAll("rect")
                    .data(data, function (d) { 
                        return d.category; });
                rects.transition()  //UPDATE
                    .duration(1000)
                    .attr("y", function(d, i) { 
                        //console.log(i)
                        return i * 30 + 102; })
                    .attr("x", function(d) { 
                        return 102;
                    })
                    .attr("height", 25)
                    .attr("width", function (d) { 
                        if(choiceGlobal == 0){
                            return 750*(d.sales/maxV); 
                        }
                        else if(choiceGlobal == 1){
                            return 750*(d.mpg/maxV); 
                        } else {
                            return 750*(d.price/maxV);;
                        }
                    })
                    .attr("fill", "skyblue");
                rects.exit()  //EXIT
                    .transition()
                    .duration(1000)
                    .style("opacity", 0)  //style here!
                    .remove();
                rects.enter()  //ENTER
                    .append("rect")
                    .attr("y", function(d, i) { 
                        return i * 30 + 102; })
                    .attr("x", function(d) { 
                        return 102;
                    })
                    .attr("height", 25)
                    .attr("width", function (d) { 
                        if(choiceGlobal == 0){
                            return 750*(d.sales/maxV);
                        }
                        else if(choiceGlobal == 1){
                            return 750*(d.mpg/maxV);
                        } else{
                            return 750*(d.price/maxV)
                        }
                    })
                    .attr("fill", "skyblue")
                    .on("mouseover", function(d){
                        d3.select(this)
                        .style("fill", "blue");
                    })
                    .on("mouseout", function(d){
                        d3.select(this)
                        .style("fill", "skyblue");
                    })
                    .on("click", barClick)
                    .transition()
                    .duration(1000);
                //deal with axis
                y.domain(data.map(z => z.category));
                //y.domain(data.map(z => z.sales))
        
                d3.select(".axis-Y")
                .transition()
                .duration(1000)
                .call(axisY);
            }
        
            function goLevelUp() {
                if(inLevel == 1){
                    return false;
                }
                inLevel = inLevel-1;
                dataChain.splice(dataChain.length - 1, 1);
                var prev = dataChain[dataChain.length - 1];
                console.log(prev)
                renderBars(prev,choiceGlobal);
                if(inLevel === 1)
                    console.log("first layer")  
                return false;
            };
        
            function barClick(d, i) {
                if(typeof d.categories === 'undefined')
                  return false;
                inLevel++;
                dataChain.push( d.categories );
                renderBars(d.categories,choiceGlobal);
                return false;
              };
            
            //add button listeners
            d3.select("#descButton")
            .on("click", function() {
                sortState = 2;
                update(currentData.sort(function(a, b) { 
                    if(choiceGlobal == 0){
                        return b.sales - a.sales;
                    } 
                    else if(choiceGlobal == 1){
                        return b.mpg - a.mpg;
                    } else{
                        return b.price - a.price;
                    }
                }));
            });
            d3.select("#ascButton")
            .on("click", function() {
                sortState = 1;
                update(currentData.sort(function(a, b) { 
                    if(choiceGlobal == 0){
                        return a.sales - b.sales;
                    } 
                    else if(choiceGlobal == 1){
                        return a.mpg - b.mpg;
                    } else{
                        return a.price - b.price;
                    }
                }));
            });
            d3.select("#alphaButton")
            .on("click", function() {
                sortState = 0;
                update(currentData.sort(function(a, b) { 
                   return (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0);
                }));
            });
        
            d3.select("#salesButton")
                .on("click", function() {
                    this.style.background='lightblue';
                    // whiteMpg()
                    // whitePrice()
                    renderBars(currentData,0)
                });
        
            d3.select("#mpgButton")
                .on("click", function() {
                    this.style.background='lightblue';
                    // whiteSales()
                    // whitePrice()
                    renderBars(currentData,1)
                });
            d3.select("#priceButton")
                .on("click", function() {            
                    this.style.background='lightblue';
                    // whiteMpg()
                    // whiteSales()
                    renderBars(currentData,2)
                });
        
            d3.select("#resetButton")
                .on("click", goLevelUp)
            
            // function whitePrice() {document.getElementById("priceButton").style.background="white";}
            // function whiteMpg() { document.getElementById("mpgButton").style.background="white"; }
            // function whiteSales() {document.getElementById("salesButton").style.background="white";}
        
        });
        
                  
    }



    

    private linez(){

        d3.json('/assets/data_line.json').then(function(data){
            var margin = { top: 30, left: 60, bottom: 40, right: 140 };
            var width = 800;//parseInt(d3.select("#chart").style("width")) - margin.left - margin.right;//800;
            var height = 500;//parseInt(d3.select("#chart").style("height")) - margin.top - margin.bottom;//500;
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
            var div = d3.select("#line_chart").append("div")	
              .attr("class", "tooltip")				
              .style("opacity", 0);
            
             
        
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
                if(inLevel === 1)
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
          
                var lines = svg.append('g')
                    .attr('class', 'lines');


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
        

        

    }
    


    private piez(){
        d3.json('/assets/data_pie.json').then(function(data_before){
            //Setting up variables
            var inLevel = 1;
            var dataChain = [];
            var choiceGlobal = 0;
            var maxV = 0
            var firstData = data_before.map(x => x);
            var radius = Math.min(document.getElementById('chart2').clientWidth-1,document.getElementById('chart2').clientHeight-1)/2
            dataChain.push(firstData);
        
            //set init variables
            var color = d3.scaleOrdinal(d3.schemeCategory10);
            var arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(radius / 2);
            var arcOver = d3.arc()
                .outerRadius(radius)
                .innerRadius(radius / 2);
            var pie = d3.pie()
                .sort(null)
                .value(function(d) {
                    var val = d.cost;
                    if(typeof val === 'string')
                        return parseFloat(val);
                    return val;
              });
        
            //add main svg
            var svg = d3.select("#chart2")
                .append("g")
                .attr("transform", "translate(" + ((document.getElementById('chart2').clientWidth-1)/2) + "," + ((document.getElementById('chart2').clientHeight-1)/2) + ")");;
            
            //inner labeling for 
            var focusGroup = svg.append('g')
                .attr('class', 'focus-group');
            var nameLabel = focusGroup.append('g')
                .attr('class', 'arc-percent')
                .append("text")
                .attr("dy", "-1.2em");
            var percentLabel = focusGroup.append('g')
                .attr('class', 'arc-percent')
                .append("text");
            var costLabel = focusGroup.append('g')
                .attr('class', 'arc-cost')
                .append("text")
                .attr("dy", "1.2em");
        
            //set button actions
            d3.select("#resetpieButton")
                .on("click", goLevelUp)
            
            renderPie(firstData)
        
            function goLevelUp() {
                if(inLevel == 1){
                    return false;
                }
                inLevel = inLevel-1;
                dataChain.splice(dataChain.length - 1, 1);
                var prev = dataChain[dataChain.length - 1];
                console.log(prev)
                renderPie(prev);
                if(inLevel === 1)
                    console.log("first layer")  
                return false;
            };
        
            function sliceClick(d, i) {
                console.log("click")
                console.log(d)
                if(typeof d.data.categories === 'undefined')
                  return false;
                inLevel++;
                dataChain.push( d.data.categories );
                renderPie(d.data.categories);
                return false;
            };
        
            function pieMouseOut(d, i) {
                var hovered = d3.select(this);   
                focusGroup.transition().attr('opacity', 0);
                hovered.transition()
                    //.ease("easeInOutQuart")
                    .duration(100)
                    .attr("d", arc);
            };
        
            function pieMouseOver(d, i) {
                var hovered = d3.select(this);
                var percentage = (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100).toFixed(1);
                nameLabel.text(d.data.category);
                percentLabel.text(percentage + '%');
                costLabel.text(d.data.cost);
                focusGroup.transition().attr('opacity', 1);
                hovered.transition()
                    //.ease("easeInOutQuart")
                    .duration(100)
                    .attr("d", arcOver);
            };
        
            function tweenPie(b){
                b.innerRadius = 0;
                var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
                return function(t) { return arc(i(t)); };
            };
        
            function renderPie(data) {
                svg.select('g.cake').remove();
                var arcs = svg.append('g')
                    .attr('class', 'cake')
                    .selectAll("g.arc").data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc");
            
                arcs.append("path").attr("d", arc)
                    .attr("fill", function(d,i) { return color(i); })
                    .attr("stroke", function(d,i) { return d3.rgb(color(i)).darker(); })
                    .attr('class', function(d,i) { return 'category-pie-' + i + (typeof d.categories === 'undefined' ? ' pie-leaf' : ''); })
                    .on('mouseover', pieMouseOver)
                    .on('mouseout', pieMouseOut)
                    .on('click', sliceClick)
                    .transition()
                    //.ease("easeInOutQuart")
                    .duration(1000)
                    .attrTween("d", tweenPie);
              };
        });
        

    }

}






