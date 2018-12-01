import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STOCKS } from '../shared';

@Component({
    selector: 'app-step4',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step4.component.html',
    styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

    title = 'Step 4';

    private margin = { top: 20, right: 20, bottom: 30, left: 50 };
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private years: any;
    private color: any;
    private xScale: any;
    private yScale: any;
    private country: any;
    private line: any;
    private legend: any;
    private xpoint: any;
    private ypoint: any;
    private points: any;
    private div: any;




    constructor() {
        this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;


    }

    ngOnInit() {
        this.initSvg();
        this.drawLine();
    }

    private initSvg() {
        this.svg = d3.select('svg');
        this.div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
        this.years = ["1972", "1977", "1982", "1987", "1992", "1997", "2002", "2007", "2012", "2017"];
        this.width = 800;
        this.height = 1000;
        this.color = d3.scaleOrdinal(d3.schemeCategory10);
        this.xScale = d3.scaleBand().domain(this.years).range([50, 700]);
        this.yScale = d3.scaleLinear().domain([0, 100]).range([450, 0]);
        this.country = this.svg.selectAll(".country").data(STOCKS).enter().append("g").attr("class", "countryLine");
        this.line = d3.line().y((d) => { return this.yScale(d.pop) + 15; }).x((d) => { return this.xScale(d.year) + 112; });
        this.points = this.svg.selectAll('.countryLine');
    }


    private drawLine() {
       let  _self = this



        function xpoint(data, data1) {
            console.log(data1);
            return 100;

        }

        function ypoint(data, data1) {
            return 100;

        }

        let svg = this.svg.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');


        svg.append("g")
            .attr("transform", "translate(30," + 445 + ")")
            .call(d3.axisBottom(this.xScale))


            _self.svg.append("text")
            .attr("x",450)
            .attr("y",500)
            .text("Time Line");


        svg.append("g")
            .attr("transform", "translate(80," + -5 + ")")
            .call(d3.axisLeft(this.yScale))




           _self.svg.append("text")
            .attr("x",-300)
            .attr("y",100)
            .attr("transform","rotate(-90)")
            .text("2017 % Rurual Population");



    

        let lines = this.country.append("path")
            .attr("class", "line")
            .attr("stroke-width", '3px')
            .style("stroke", (d, i) => (this.color(i)))
            .attr("fill", "none")
            .attr("d", (d) => this.line(d.check))
            .on("click", function () {

                console.log(this);
                d3.select(this).attr("stroke-width", '5px')
                .transition()
                .duration(3000).attr("stroke-width", '3px');

            })
            .on("mouseover", function (d) {
                d3.selectAll(".line").style("opacity", 0.2);
                d3.select(this).style("opacity", 1);
                d3.select(this).attr("stroke-width", 3)})
         
            .on("mouseout", function (d) {
                d3.selectAll(".line").style("opacity", 1);
                d3.selectAll(".line").attr("stroke-width", 1.5)});
        

        
        
        

                        


        let circles = this.points.selectAll('.countryLine')
            .data(function(d) {
                return d.check
            })
            .enter()
            .append("circle")
            .attr("class", "circle")
            .attr("r", 3.5)
            .style("stroke",(d,i) => (this.color(i)) )
            .attr("cx", function (d) {
                return _self.xScale(d.year) + 112;
            })
            .attr("cy", function (d) {
                
                return _self.yScale(d.pop) + 15;
                ; })
                .on("mouseover", function(d) {		
                    _self.div.transition()		
                        .duration(200)		
                        .style("opacity", .9);	
                    let hold = "Year: " + d.year + " Pop: " + d.pop;	
                    _self.div.html(hold)	
                        .style("left", (d3.event.pageX) + "px")		
                        .style("top", (d3.event.pageY - 28) + "px");	
                    })					
                .on("mouseout", function(d) {		
                    _self.div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                });
        


        let flag = 0;

        let buttons = d3.select("#onit").append("buttons")
                        .append("input")
                        .attr("type","button")
                        .attr("Value","Show Data Points")
                        .attr("class","btn btn-primary")
                        .on("click",function(d){
                            flag = 0;
                            if (flag==0){
                                console.log("falg0");
                                circles.style("opacity",100)
                            }
                        });

        let buttoning = d3.select("#ofit").append("buttons")
                        .append("input")
                        .attr("type","button")
                        .attr("Value","Hide Data Points")
                        .attr("class","btn btn-primary")
                        .on("click",function(d){
                            flag = 1;
                            if (flag==1){
                                console.log("falg1");
                                circles.style("opacity",0)
                            }
                        });



        let legend = svg.selectAll(".legend")
            .data(STOCKS)
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(0," + i * 1 + ")";
            });

        legend.append("rect")
            .attr("x", 820)
            .attr("y", function (d, i) { return i * 20; })
            .attr("width", 15)
            .attr("height", 15)
            .style("fill", (d, i) => this.color(i));

        legend.append("text")
            .attr("x", 800)
            .attr("y", function (d, i) { return (i * 20) + 12; })
            .style("text-anchor", "end")
            .text(function (d) {
                return d.name;
            });




    }



}

