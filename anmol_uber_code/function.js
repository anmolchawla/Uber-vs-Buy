// function initMap() {
//   var options = {
//     zoom: 10,
//     center: {lat: 34.0224, lng: -118.2851},
//   }
//   var map = new google.maps.Map(document.getElementById('map'),options);
//   //document.getElementById("map").style.display = "block";
    
// }


var start_lat;
var start_lng;
var stop_lat;
var stop_lng;
var uber_add;





function address(data){
  var sepa = data.split(" ");
  var ad = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  var key = "&key=AIzaSyCERbZhScuNlJUrxPxsZfTqxWfSnYCzJZ0";

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



function search(){





 uber_add = "https://api.uber.com/v1.2/estimates/price?start_latitude=";

//var start_add = document.getElementById("str").value;
//var end_add = document.getElementById("end").value;
var start_add = "900 W Exposition Blvd Los Angeles, CA 90007";
var end_add = "325 W Adams Blvd Los Angeles, CA 90007";
var start = address(start_add);
var end = address(end_add);

// 1600 Amphitheatre Parkway, Mountain View, CA
// 1159 N Rengstorff Ave, Mountain View, CA 
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


          uber_funct();
    
        }
      });

      
    
    }
  });


  //   $.ajax({
  //   type:"GET",
  //   dataType:"json",
  //   url:end,
  //   success: function(data){

  //     stop_lat = data.results[0].geometry.location.lat;
  //     stop_lng = data.results[0].geometry.location.lng;
  //     //console.log(stop_lat);
  //     //console.log(stop_lng);
  //     uber_add = uber_add + stop_lat + "&end_longitude=" + stop_lng;
  //     //console.log(uber_add);

  //   }
  // });

//setTimeout(uber_funct, 10);




}


function uber_funct(){
 


  $.ajax({
    type:"GET",
    dataType:"json",
        url: uber_add,

        beforeSend: function(xhr) {
              xhr.setRequestHeader("Authorization", "Bearer JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAG8AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAkAAAABwAAAAEAAAAEAAAAIp5jqK8-34pMTv6Qy81gv9sAAAARJatcAbgAxpWmiEt4wgSnFiAPs3-_cud1iXhvM3nRYyhlh7UdOxO8D2S_LrjOJt2SFQaqzqyCPODOkNEQYXyht6DcQMzPM6hdeeZ0Fb_J7BE8gzVtI6uP29Tq_WCQusjEezyo7MqxFKYdv4-DAAAACL9bl8Xttt51S1F0yQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU"),
              xhr.setRequestHeader("Accept-Language", "en_US"),
              //xhr.setRequestHeader("Access-Control-Allow-Origin",'*'),
              xhr.setRequestHeader("Content-Type", "application/json")
        },
        success: function(data){
                 var i;
                 var len = Object.keys(data.prices).length;
                 var price_est;
                 var distance_est;
                 console.log("Uber Data",data);
                 for(i =0 ;i<len;i++){
                  if(data.prices[i].localized_display_name == "UberX"){
                    price_est = "The cost of one way travel at this time in USD($) is: " + data.prices[i].low_estimate;
                    distance_est = "The Distance between two points in miles is: " +  Math.round(data.prices[i].distance * 10)/10;
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
          console.log(cars);
          console.log(prices);




        var margin = {top: 50,left: 50, right:50,bottom: 50}, height = 600 - margin.top - margin.bottom, width = 900 - margin.left - margin.right;


		

        var svg = d3.select("#ana")
              .append("svg")
              .attr("height",height + margin.top + margin.bottom)
              .attr("width",width + margin.left + margin.right)
              .append('g')
              .attr("transform","translate(" + margin.left + "," + margin.top + ")");


        var color = d3.scaleOrdinal(d3.schemeCategory10);
        
        
        y = d3.scaleLinear().range([height,0]);
     
        y.domain([3,d3.max(prices)]);

        svg.append("g").attr("transform","translate(55," + 0 + ")")
           .call(d3.axisLeft(y));

        x = d3.scalePoint().range([0,width-30]);
       
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
        .text("Uber Options vs Cost")

        svg.selectAll('rect')
        .data(data.prices)
        .enter()
        .append('rect')
        .attr('x', function(d) { return (x(d.display_name)+55); })
        .attr('y', function (d) { return y(d.high_estimate);} )
        .attr('width',30)
        .attr('height',function (d) { return height - y(d.high_estimate); })
        .attr("fill", d=>color(d.display_name));
            
       
       document.getElementById("toggles").style.display = "block";










    }

});

}


