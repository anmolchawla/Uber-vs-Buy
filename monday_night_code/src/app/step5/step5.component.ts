import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { STOCKS } from '../shared';
import { _MatSelectMixinBase } from '@angular/material';
var external_data = [];
var car_name = "def_car";
var mpg = 10;
var car_cost = 20;
var service_cost = 5;
var years = 2;
var distance = 100;
var trip_cost = 20;
var uber_name = "def_uber";
var winner = "uber_win";
var annual_car_cost = 10;
var annual_uber_cost = 20;
var weeks = 200;


@Component({
    selector: 'app-step5',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step5.component.html',
    styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {
    message:string;
    title = 'Step 5: Uber vs Buy';
    external_data = [];
    // car_name = "def_car";
    // mpg = 10;
    // car_cost = 20;
    // service_cost = 5;
    // years = 2;
    // distance = 100;
    // trip_cost = 20;
    // uber_name = "def_uber";
    // winner = "uber_win";
    // annual_car_cost = 10;
    // annual_uber_cost = 20;
 

model = {
    value: "",
    demo:"",
    value1:""

}




    constructor(private data: DataService) {
    }

    ngOnInit() {
        const _self=this;
        this.data.onChangeMessage().subscribe( (message) => {
       _self.message = message 
       _self.test() ;
        }) 
        this.start_val();
       
        var i;

        d3.json('assets/electric_vehicles.json').then(function(data){
            var svg = d3.select("#chart-pg5");
            var step = 10;
            var ticks = [];
            for(i = 0; i <= 500; i += 10){
                ticks.push(i)
            }
        
            //SET UP TOP LABELS
            var carInfo = svg.append("g")
                .attr("class", "car-info")
                .attr("transform", "translate(10,15)");
            carInfo.append("text")
                .text("Car Info")
                .style("font-weight","bold")
                .attr("transform", "translate(100,0)");
            carInfo.append("text")
                .text("Car Name: ")
                .attr("transform", "translate(0,20)");
            carInfo.append("text")
                .text("Miles per Gallon: ")
                .attr("transform", "translate(0,40)");
            carInfo.append("text")
                .text("Service & Insurance: ")
                .attr("transform", "translate(0,60)");
            carInfo.append("text")
                .text("Yearly Cost: ")
                .attr("transform", "translate(0,80)")
                .style("font-weight","bold");
            svg.append("line")
                .attr("x1", 300)  
                .attr("y1", 2)
                .attr("x2", 300) 
                .attr("y2", 100)
                .style("stroke-width", 1)
                .style("stroke", "black")
                .style("fill", "none");
        
            var genInfo = svg.append("g")
                .attr("class", "gen-info")
                .attr("transform", "translate(320,15)");
            genInfo.append("text")
                .text("General Info")
                .style("font-weight","bold")
                .attr("transform", "translate(100,0)");
            genInfo.append("text")
                .text("Years to Own/Uber: ")
                .attr("transform", "translate(0,20)");
            genInfo.append("text")
                .text("Miles per Week: ")
                .attr("transform", "translate(0,40)");
            svg.append("line")
                .attr("x1", 600)  
                .attr("y1", 2)
                .attr("x2", 600)  
                .attr("y2", 100)
                .style("stroke-width", 1)
                .style("stroke", "black")
                .style("fill", "none");
        
            var uberInfo = svg.append("g")
                .attr("class", "uber-info")
                .attr("transform", "translate(620,15)");
            uberInfo.append("text")
                .text("Uber Info")
                .style("font-weight","bold")
                .attr("transform", "translate(100,0)");
            uberInfo.append("text")
                .text("Uber Type: ")
                .attr("transform", "translate(0,20)");
            uberInfo.append("text")
                .text("Trip Distance: ")
                .attr("transform", "translate(0,40)");
            uberInfo.append("text")
                .text("Average Trip Cost: ")
                .attr("transform", "translate(0,60)");
            uberInfo.append("text")
                .text("Yearly Cost: ")
                .attr("transform", "translate(0,80)")
                .style("font-weight","bold");
        
        
            //RUN ALL OF THE CALCULATIONS AND PRESENT SUGGESTION
            //placeholder
        
            var rec = svg.append("g")
                .attr("class", "rec-info")
                .attr("transform", "translate(300,150)");
            rec.append("text")
                .text("Suggestion: ")
                .style("font-weight","bold");
            //placeholder for value
            rec.append("text")
                .text("Savings: ")
                .style("font-weight","bold")
                .attr("transform", "translate(300,0)");
            //placeholder for value
        
        
            //set up axis functions
            var x = d3.scaleLinear()
                .domain([0,500])
                .range([0, 1000]).clamp(true);
            var axisX = d3.axisBottom()
                .scale(x)
                .tickValues(ticks); 
            //y needs a top and bottom 
            var yTop = d3.scaleLinear()
                .domain([0,500])
                .range([200, 0]);
            var axisYTop = d3.axisLeft()
                .scale(yTop);
            svg.append("g")
                .attr("class", "axis-Y")
                .attr("transform", "translate(100,200)")
                .call(axisYTop);
            var yBottom = d3.scaleLinear()
                .domain([500,0])
                .range([200, 0]);
            var axisYBottom = d3.axisLeft()
                .scale(yBottom);
            svg.append("g")
                .attr("class", "axis-Y")
                .attr("transform", "translate(100,400)")
                .call(axisYBottom);
        
            svg.append("svg:image")
                .attr("y", 200)
                .attr("x", 560)
                .attr("height", 80) 
                .attr("width", 80)
                .attr('opacity',0.3)
                .attr("xlink:href", "assets/uber.png")
                .style("an");
        
            svg.append("svg:image")
                .attr("y", 520)
                .attr("x", 555)
                .attr("height", 90) 
                .attr("width", 90)
                .attr('opacity',0.3)
                .attr("xlink:href", "assets/car.png")
                .style("an");
        
            //calculate and create rectangles
            //enter rectangles
            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("y", function(d){
                    if(d.empg > 100){
                        return 400-yTop(d.empg);
                    } else{
                        return 400;
                    } 
                })
                .attr("x", function(d,i) { 
                    return 115 + 20*i;
                })
                .attr("height", function(d){
                    if(d.empg > 100){
                        return yTop(d.empg);
                    } else{
                        return yBottom(d.empg);
                    } 
                }) 
                .attr("width", 10)
                .attr('fill', function(d){
                    if(d.empg > 100){
                        return 'royalblue';
                    } else{
                        return 'dodgerblue'
                    }   
                })
                .attr('opacity',0.5);
            
            
            var slider = svg.append("g")
                .attr("class", "slider")
                .attr("transform", "translate(100,400)");
        
            slider.append("line")
                .attr("class", "track")
                .attr("x1", x.range()[0])
                .attr("x2", x.range()[1])
                .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
                .attr("class", "track-inset")
                .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
                .attr("class", "track-overlay");
                
        
            var ticks = slider.append('g')
                .attr('class', 'ticks')
                .attr('transform', 'translate(0, 0)')
                .call(axisX);
        
            var handle = slider.insert("circle")
                .attr("class", "handle")
                .attr("r", 9)
                .attr("fill","green")
                .attr("cx",0)
                .call(d3.drag().on("drag", function(){
                    changer(x.invert(d3.event.x));
                }));;
        
        
            function changer(h) {
                console.log("CHANGER")
                console.log(h)
                handle.attr("cx", x(h));
            }
        
        
        });
    }


    test(){
        // console.log("here")
        let hold = this.message;
        console.log("caught");
        console.log(this.message);
        external_data.push(hold); 
        
    }

    start_val(){
         console.log(external_data);
         car_name = external_data[1] ;
         mpg=external_data[2];
         car_cost = external_data[4];
         service_cost = external_data[0];
         years = external_data[3];
         distance = external_data[5];
         trip_cost = external_data[6];
         uber_name = external_data[7];
         console.log("car_name",car_name);
         console.log("mpg",mpg);
         console.log("car cost",car_cost);
         console.log("service cost",service_cost);
         console.log("years",years);
         console.log("distance",distance);
         console.log("trip cost",trip_cost);
         console.log("uber name",uber_name);

         this.finally()

    }
    
    finally(){
       
        annual_uber_cost = trip_cost*520*years*weeks;
        annual_car_cost = service_cost + ( ( (distance*520)/mpg) * 3 ) * years * weeks;
        if (annual_car_cost > annual_uber_cost){
            winner = car_name;
        }
        else{
            winner = uber_name;
        }
        var output = document.getElementById("name_car");
        output.innerHTML = car_name;
        var output = document.getElementById("name_uber");
        output.innerHTML = uber_name;
        var output = document.getElementById("winner_name");
        output.innerHTML = winner;
        var output = document.getElementById("uber_money");
        output.innerHTML = annual_uber_cost.toString();
        var output = document.getElementById("car_money");
        output.innerHTML = annual_car_cost.toString();


    }

    


    input_yr(){
        var slider = this.model.value;
        console.log("slider",slider);
        var output = document.getElementById("demo");
        output.innerHTML = slider;

        years = +slider;
        this.finally()

    }


    input_week(){
        var slider = this.model.value1;
        console.log("slider",slider);
        var output = document.getElementById("demo1");
        output.innerHTML = slider;
        weeks = +slider;
        this.finally()


    }




}

