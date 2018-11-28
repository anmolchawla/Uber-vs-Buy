import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as topojson from 'topojson';

import { STOCKS } from '../shared';
import { ConstantPool } from '@angular/compiler/src/constant_pool';
var range;
@Component({
    selector: 'app-step2',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step2.component.html',
    styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

    title = 'Step 2: Electric vehicle';



    

model = {
    value: "",
    demo:"",
    value1:""

}



    constructor() {

        
    }

    ngOnInit() {
        this.loli();
        this.mapz();

    }

    private loli(){

        d3.json('/assets/electric_vehicles.json').then(function(data){
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
                .attr('fill', 'skyblue')
                .attr("opacity","1")
                .on("click",function(d){
                    console.log("clciking the car")
                    d3.selectAll("rect")
                      .attr("fill","skyblue")

                    d3.select(this)
                      .transition()
                      .duration(500)
                      .attr("opacity","1")
                      .attr("fill","#66AAD2")  

                      range = d.empg;
                 });
        
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
                .attr("xlink:href", "/assets/ev-icon.png")
                .attr("opacity","1")
                .style("an")
     

        
        });
        

    }

    // Scale factor is 1000 , hence per pixel we have 100 miles. 

    private mapz(){

        d3.json("https://d3js.org/us-10m.v1.json").then(function (usa) { 
            console.log(usa);
            
            var data = usa;

	var margin = {top: 50,left: 50, right:50,bottom: 50},
				 height = 800 - margin.top - margin.bottom,
				 width = 1000- margin.left - margin.right;


		

	var svg = d3.select("#usa")
				.append("svg")
				.attr("height",height + margin.top + margin.bottom)
				.attr("width",width + margin.left + margin.right)
				.append('g')
				.attr("transform","translate(" + margin.left + "," + margin.top + ")");
		
	 
	var countries = topojson.feature(data, data.objects.states)['features']

	console.log("dekha",countries);

    var path = d3.geoPath();

	svg.selectAll(".country")
	   .data(countries)
	   .enter()
	   .append("path")
	   .attr("stroke-width", "1")
	   .attr("stroke","black")
	   .attr("class","country")
	   .attr("fill","#66AAD2")
       .attr("d", path);
   

    d3.csv("/assets/charger.csv").then(function (charger) { 
           
     
    // set projection

    var projection = d3.geoMercator();
    var path = d3.geoPath().projection(projection);
    projection.scale(800).center( [-95, 39.50 ]);



// var projection = d3.geoMercator();

// create path variable

               // points
    var aa = [-122.490402, 37.786453];
    var bb = [-122.389809, 30.72728];

// projection.scale(700).center([-101, 43])

    console.log("Chargers",charger);
    console.log("Chargers",charger.Latitude);

    svg.selectAll(".pin")
        .data(charger)
        .enter()
        .append("circle",)
        .attr("r", "5")
        .attr("transform", function(d) { return "translate(" + projection([d.Longitude, d.Latitude]) + ")";})
        .attr("fill", "green")
        .on("mouseover",function(d){
            d3.select(this)
              .transition()
              .duration(1000)
              .attr("opacity","0.7")
              .attr("fill","yellowgreen")
              .attr("r",range/10);
          
    
         })
         .on("mouseout", function(d) {
            d3.select(this)
            .transition()
            .duration(1000)
            .attr("opacity","1")
            .attr("fill","green")
            .attr("r",5);

         })
        .append("title")
        .text(function(d){return [d['Station Name'], d.City, d['Station Phone'],d['Street Address']];})                   });
          
   
                   
              });    

    }



}

