import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as $ from 'jquery';
// import {} from '@types/googlemaps';
//import GoogleMaps from 'google-maps';
import { google } from 'google-maps';
import { DataService } from "../data.service";

var step4_data = "step4 Default";
var commute_dist;
var uber_name;
var commute_price;
declare var google: any;
var data: DataService
@Component({
    selector: 'app-step4',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step4.component.html',
    styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  message:string;

  title = 'Step 4: Uber Cost Analysis';

  model = {
    start: "",
    end:""
}
  
  constructor(private data: DataService) {
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
    // this.newMessage();
    this.Mapz();
  }

  newMessage() {
    console.log("dist",commute_dist);
    console.log("trip_cost",commute_price);
    console.log("uber type",uber_name);
    this.data.changeMessage(commute_dist);
    this.data.changeMessage(commute_price);
    this.data.changeMessage(uber_name);
  }

   Mapz(){
    var options = {
        zoom: 10,
        center: { lat: 34.0224, lng: -118.2851 },
    }
    var map = new google.maps.Map(document.getElementById('map'), options);
    document.getElementById("map").style.display = "block";

}













address(data){
  var sepa = data.split(" ");
  var ad = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  // var key = "&key=AIzaSyCERbZhScuNlJUrxPxsZfTqxWfSnYCzJZ0";
  var key = "&key=AIzaSyB9NRRuy7LQkDiWXk7I3YWEX4b99L-oUVw";
 

  for (var i= 0; i<sepa.length;i++){
 //   console.log(sepa[i]);
    ad = ad + sepa[i];
    if(i<(sepa.length - 1)){
      ad = ad +"+";
    }
    
   
  }
  ad = ad + key;
 return ad;

}



search(){
  
  var start_lat;
  var start_lng;
  var stop_lat;
  var stop_lng;
  var uber_add;
  



 uber_add = "https://api.uber.com/v1.2/estimates/price?start_latitude=";

var start_add = this.model.start;
var end_add = this.model.end;

// console.log("step 1");
 //var start = this.address(start_add);
 //var end = this.address(end_add);
var start='https://maps.googleapis.com/maps/api/geocode/json?address=600+South+Ikea+Way+Burbank,+CA+91502&key=AIzaSyB9NRRuy7LQkDiWXk7I3YWEX4b99L-oUVw';
var end  ='https://maps.googleapis.com/maps/api/geocode/json?address=465+S+La+Cienega+Blvd+Los+Angeles,+CA+90048&key=AIzaSyB9NRRuy7LQkDiWXk7I3YWEX4b99L-oUVw'; 

// console.log(start);
// console.log(end);
  $.ajax({
    type:"GET",
    dataType:"json",
    url:start,
    success: function(data){

      start_lat = data.results[0].geometry.location.lat;
      start_lng = data.results[0].geometry.location.lng;
      //console.log(start_lat);
      //console.log(start_lng);
      uber_add = uber_add + start_lat + "&start_longitude=" + start_lng +"&end_latitude=";
       

      $.ajax({
        type:"GET",
        dataType:"json",
        url:end,
        success: function(data){
    
          stop_lat = data.results[0].geometry.location.lat;
          stop_lng = data.results[0].geometry.location.lng;
          //console.log(stop_lat);
          //console.log(stop_lng);
          uber_add = uber_add + stop_lat + "&end_longitude=" + stop_lng;
          //console.log(uber_add);
          
          // console.log("back from step 2");
          
          //************************************************************************************ */
          // console.log("step 3");
          $.ajax({
            type:"GET",
            dataType:"json",
                url: uber_add,
        
                beforeSend: function(xhr) {
                      xhr.setRequestHeader("Authorization", "Bearer JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAG8AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAkAAAABwAAAAEAAAAEAAAADNJjESilnJwWvH8emUnPLFsAAAAlr_PY6vrakGRcIw3gzM1B6FXrGcMehNucofc0d9ZmXaKHNF1wXYHvDsAIgxHjN0WnPnHxS3PIfODU84sTx1GNSpFZBJxT74JkC0PKPtN8oBdZ9pbxlVmjQf3jAqPSV6Fb1DMmnY0N-ouEsBFDAAAABSU5w7cLojvqMCJuCQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU"),
                      xhr.setRequestHeader("Accept-Language", "en_US"),
                      //xhr.setRequestHeader("Access-Control-Allow-Origin",'*'),
                      xhr.setRequestHeader("Content-Type", "application/json")
                },
                success: function(data){
                         var i;
                         var len = Object.keys(data.prices).length;
                         var price_est;
                         var distance_est;
                        //  console.log("Uber Data",data);
                         for(i =0 ;i<len;i++){
                          if(data.prices[i].localized_display_name == "UberX"){
                            price_est = "The cost of one way travel at this time in USD($) is: " + data.prices[i].low_estimate;
                            commute_dist =  Math.round(data.prices[i].distance * 10)/10;
                            distance_est = "The Distance between two points in miles is: " + commute_dist;
                          }
                   
               
                }
               // console.log("Price Estimate",price_est);
               // console.log("Distance Estimate",distance_est);
                
                document.getElementById('price').innerHTML = price_est;
                document.getElementById('dist').innerHTML = distance_est;
                var cars = [];
                var prices = [];
                
                  //  console.log(data.prices[0].display_name)
                  for (i = 0; i<data.prices.length; i++){
                            cars.push(data.prices[i].display_name);
                            prices.push(data.prices[i].high_estimate);
                           
        
                  }
                  // console.log(cars);
                  // console.log(prices);
        
        
        
        
                var margin = {top: 50,left: 50, right:50,bottom: 50}, height = 600 - margin.top - margin.bottom, width = 900 - margin.left - margin.right;
        
        
                document.getElementById("ana").innerHTML = "";
        
                var svg = d3.select("#ana")
                      .append("svg")
                      .attr("height",height + margin.top + margin.bottom)
                      .attr("width",width + margin.left + margin.right)
                      .append('g')
                      .attr("transform","translate(" + margin.left + "," + margin.top + ")");
        
        
                var color = d3.scaleOrdinal(d3.schemeCategory10);
                
                
                var y = d3.scaleLinear().range([height,0]);
             
                y.domain([3,d3.max(prices)]);
        
                svg.append("g").attr("transform","translate(55," + 0 + ")")
                   .call(d3.axisLeft(y));
        
                var x = d3.scalePoint().range([0,width-30]);
               
                x.domain(cars);
               
               svg.append("g").attr("transform","translate(70," + 500 + ")")
                 .call(d3.axisBottom(x))
        
                svg.append("text")
                .attr("x",-height/2)
                .attr("y",10)
                .attr("transform","rotate(-90)")
                .text("Cost ($)")
        
                svg.append("text")
                .attr("x",width/2)
                .attr("y",height+40)
                .text("Options")
        
                svg.append("text")
                .attr("x",width/2)
                .attr("y", 0)
                .text("Uber Options vs Average Cost")
        
                svg.selectAll('rect')
                .data(data.prices)
                .enter()
                .append('rect')
                .attr('x', function(d) { return (x(d.display_name)+55); })
                .attr('y', function (d) { return y( (d.high_estimate+d.low_estimate)/2)   ;} )
                .attr('width',30)
                .attr('height',function (d) { return height - y((d.high_estimate+d.low_estimate)/2); })
                .attr("fill", "#005D93")
                .on("click",function(d){
                    d3.select(this)
                      .attr("fill","blue")  
                   
                      
            
                    uber_name = d.display_name;
                    commute_price = (d.high_estimate+d.low_estimate)/2;

                    
               })
               .append("title")
               .text(function(d){return ("High Cost Estimate: "+d.high_estimate+" |"+" Low Cost Estimate: "+d.low_estimate);});  
               
        
            }
        
        });
        
      
    
        }
      });

      
    
    }
  });



}






}



