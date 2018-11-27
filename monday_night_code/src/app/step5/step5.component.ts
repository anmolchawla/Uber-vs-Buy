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

