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
        this.data.onChangeMessage1().subscribe( (message) => {
            _self.message = message 
            _self.test1() ;
             }) 
             this.data.onChangeMessage2().subscribe( (message) => {
                _self.message = message 
                _self.test2() ;
                 }) 
                 this.data.onChangeMessage3().subscribe( (message) => {
                    _self.message = message 
                    _self.test3() ;
                     }) 
                     this.data.onChangeMessage4().subscribe( (message) => {
                        _self.message = message 
                        _self.test4() ;
                         }) 
                         this.data.onChangeMessage5().subscribe( (message) => {
                            _self.message = message 
                            _self.test5() ;
                             }) 
                             this.data.onChangeMessage6().subscribe( (message) => {
                                _self.message = message 
                                _self.test6() ;
                                 }) 
                                 this.data.onChangeMessage7().subscribe( (message) => {
                                    _self.message = message 
                                    _self.test7() ;
                                     }) 


       
        var i;

     

        
        var svg = d3.select("#chart-pg5");
        var step = 10;
        var ticks = [];
        for(i = 0; i <= 500; i += 10){
            ticks.push(i)
        }
    
        //SET UP TOP LABELS
        var carInfo = svg.append("g")
            .attr("class", "car-info")
            .attr("transform", "translate(110,15)");
        carInfo.append("text")
            .text("Car Info")
            .style("font-weight","bold")
            .attr("transform", "translate(200,0)");
        carInfo.append("text")
            .text("Car Name: ")
            .attr("transform", "translate(0,20)");
        carInfo.append("text")
            .text("Retail Price: ")
            .attr("transform", "translate(0,40)");
        carInfo.append("text")
            .text("Miles per Gallon: ")
            .attr("transform", "translate(0,60)");
        carInfo.append("text")
            .text("Annual Service & Insurance: ")
            .attr("transform", "translate(0,80)");
        carInfo.append("text")
            .text("Total Cost: ")
            .attr("transform", "translate(0,100)")
            .style("font-weight","bold");
        carInfo.append("text")
            .text(car_name)
            .attr("transform", "translate(280,20)")
            .attr("text-anchor", "end");
        carInfo.append("text")
            .text("$" + Number(car_cost).toLocaleString())
            .attr("transform", "translate(280,40)")
            .attr("text-anchor", "end");
        carInfo.append("text")
            .text(mpg)
            .attr("transform", "translate(280,60)")
            .attr("text-anchor", "end");
        carInfo.append("text")
            .text("$" + Number((service_cost*12).toFixed(2)).toLocaleString())
            .attr("transform", "translate(280,80)")
            .attr("text-anchor", "end");
        var carTotalCost = carInfo.append("text")
            .text("HOLD")
            .attr("transform", "translate(280,100)")
            .attr("text-anchor", "end");
        svg.append("line")
            .attr("x1", 400)  
            .attr("y1", 2)
            .attr("x2", 400) 
            .attr("y2", 125)
            .style("stroke-width", 1)
            .style("stroke", "black")
            .style("fill", "none");
    
        var genInfo = svg.append("g")
            .attr("class", "gen-info")
            .attr("transform", "translate(420,15)");
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
        genInfo.append("text")
            .text(years)
            .attr("transform", "translate(275,20)")
            .attr("text-anchor", "end");
        var milesPerWeek = genInfo.append("text")
            .text(distance*10)
            .attr("transform", "translate(275,40)")
            .attr("text-anchor", "end");
        svg.append("line")
            .attr("x1", 700)  
            .attr("y1", 2)
            .attr("x2", 700)  
            .attr("y2", 125)
            .style("stroke-width", 1)
            .style("stroke", "black")
            .style("fill", "none");
    
        var uberInfo = svg.append("g")
            .attr("class", "uber-info")
            .attr("transform", "translate(720,15)");
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
            .text("Total Cost: ")
            .attr("transform", "translate(0,80)")
            .style("font-weight","bold");
        uberInfo.append("text")
            .text(uber_name)
            .attr("transform", "translate(280,20)")
            .attr("text-anchor", "end");
        uberInfo.append("text")
            .text(distance)
            .attr("transform", "translate(280,40)")
            .attr("text-anchor", "end");
        uberInfo.append("text")
            .text("$" + Number(trip_cost.toFixed(2)).toLocaleString())
            .attr("transform", "translate(280,60)")
            .attr("text-anchor", "end");
        var uberTotalCost = uberInfo.append("text")
            .text("HOLD")
            .attr("transform", "translate(280,80)")
            .attr("text-anchor", "end");
    
        var rec = svg.append("g")
            .attr("class", "rec-info")
            .attr("background-color","yellow")
            .attr("transform", "translate(300,150)");
        rec.append("text")
            .text("Suggestion: ")
            .attr("transform", "translate(10,0)")
            .style("font-weight","bold");
        var suggestionText = rec.append("text")
            .text("Uber")
            .attr("transform", "translate(150,00)")
            .attr("text-anchor", "middle");   
        rec.append("text")
            .text("Savings: ")
            .style("font-weight","bold")
            .attr("transform", "translate(300,0)");
        var savingsText = rec.append("text")
            .text("HOLD")
            .attr("transform", "translate(450,0)")
            .attr("text-anchor", "middle");
        rec.append("rect")
            .attr("x",0)
            .attr("y",-25)
            .attr("height",42)
            .attr("width",500)
            .attr("stroke","green")
            .attr("fill","none");
             


        //function to attack different aspectic
        function calculateSuggestion(mpw){
            milesPerWeek.text(mpw)
            var uberTotal = (mpw / distance * trip_cost) * 52 * years;
            var buyTotal = (mpw/mpg*3*52 + service_cost*12) * years + car_cost;
            //set new costs:
            carTotalCost.text("$" + Number(buyTotal.toFixed(2)).toLocaleString());
            uberTotalCost.text("$" + Number(uberTotal.toFixed(2)).toLocaleString());
            savingsText.text("$" + Number(Math.abs(buyTotal-uberTotal).toFixed(2)).toLocaleString());
            if(buyTotal > uberTotal){
                suggestionText.text("Uber");
            } else{
                suggestionText.text("Buy");
            }
        }

        //calculate for rectangle creation
        var maxSavings = 0;
        var data = [];
        for(i = 10; i <= 500; i += 10){
            var entry = {};
            var uberTemp = (i / distance * trip_cost) * 52 * years;
            var buyTemp = (i /mpg*3*52 + service_cost*12) * years + car_cost;
            entry["savings"] = Math.abs(buyTemp-uberTemp);
            if(buyTemp > uberTemp){
                entry["suggestion"] = "uber";
            } else{
                entry["suggestion"] = "buy";
            }

            //check for max savings
            if(Math.abs(buyTemp-uberTemp) > maxSavings){
                maxSavings = Math.abs(buyTemp-uberTemp);
            }
            data.push(entry)
        }
        console.log("WOOP");
        console.log(data);
    
        //set up axis functions
        var x = d3.scaleLinear()
            .domain([0,500])
            .range([0, 1000]).clamp(true);
        var axisX = d3.axisBottom()
            .scale(x)
            .tickValues(ticks); 
        //y needs a top and bottom 
        var yTop = d3.scaleLinear()
            .domain([0,maxSavings])
            .range([200, 0]);
        var axisYTop = d3.axisLeft()
            .scale(yTop)
            .tickFormat(function(d) { return "$" + Number(d).toLocaleString() ; });
        svg.append("g")
            .attr("class", "axis-Y")
            .attr("transform", "translate(100,200)")
            .call(axisYTop);
        var yBottom = d3.scaleLinear()
            .domain([maxSavings,0])
            .range([200, 0]);
        var axisYBottom = d3.axisLeft()
            .scale(yBottom)
            .tickFormat(function(d) { return "$" + Number(d).toLocaleString() ; });
        svg.append("g")
            .attr("class", "axis-Y")
            .attr("transform", "translate(100,400)")
            .call(axisYBottom);

        var labeling = svg.append("g")
            .attr("class", "axis-labels")
            .attr("transform", "translate(40,280)");
            labeling.append("text")
            .text("Uber Savings")
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle");
            labeling.append("text")
            .text("Car Buying Savings")
            .attr("transform", "translate(0,250),rotate(-90)")
            .attr("text-anchor", "middle");
    
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
    
        //enter rectangles
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("y", function(d){
                if(d.suggestion == "uber"){
                    return yTop(d.savings)+200;
                } else{
                    return 400;
                } 
            })
            .attr("x", function(d,i) { 
                return 115 + 20*i;
            })
            .attr("height", function(d){
                if(d.suggestion == "uber"){
                    return yBottom(d.savings);
                } else{
                    return yBottom(d.savings);
                } 
            }) 
            .attr("width", 10)
            .attr('fill', function(d){
                if(d.suggestion == "uber"){
                    return 'royalblue';
                } else{
                    return 'dodgerblue'
                }   
            })
            .attr('opacity',0.5);
        
        //add reference line
        svg.append("line")
            .attr("x1", x(distance*10)+100)  
            .attr("y1", 200)
            .attr("x2", x(distance*10)+100)  
            .attr("y2", 600)
            .style("stroke-width", 1)
            .style("stroke-dasharray","5,5")
            .style("stroke", "green")
            .style("fill", "none");
        
        
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
            handle.attr("cx", x(h));
            calculateSuggestion(h.toFixed(0));
        }

        //call it for initial miles per week
        changer(distance*10);
    }


    test(){
        let hold = this.message;
        car_name = hold
        console.log("car_name",car_name);     
    }
    test1(){
        let hold = this.message;
        mpg = +hold
        console.log("mpg",mpg);     
    }
    test2(){
        let hold = this.message;
        car_cost = +hold
        console.log("car_cost",car_cost);     
    }
    test3(){
        let hold = this.message;
        service_cost = +hold
        console.log("service_cost",service_cost);     
    }
    test4(){
        let hold = this.message;
        years = +hold
        console.log("years",years);     
    }
    test5(){
        let hold = this.message;
        distance = +hold
        console.log("distance",distance);     
    }
    test6(){
        let hold = this.message;
        trip_cost= +hold
        console.log("trip_cost",trip_cost);     
    }
    test7(){
        let hold = this.message;
        uber_name = hold
        console.log("uber_name", uber_name);     
    }

    


    input_yr(){
        var slider = this.model.value;
        console.log("slider",slider);
        var output = document.getElementById("demo");
        output.innerHTML = slider;

        years = +slider;
    

    }


    input_week(){
        var slider = this.model.value1;
        console.log("slider",slider);
        var output = document.getElementById("demo1");
        output.innerHTML = slider;
        weeks = +slider;


    }




}

