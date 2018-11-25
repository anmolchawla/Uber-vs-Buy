import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { STOCKS } from '../shared';

@Component({
    selector: 'app-step5',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step5.component.html',
    styleUrls: ['./step5.component.css']
})
export class Step5Component implements OnInit {

    title = 'Step 5: Uber vs Buy';

model = {
    value: "",
    demo:"",
    value1:""

}




    constructor() {


    }

    ngOnInit() {

    }


    inputs(){
        var slider = this.model.value;
        console.log("slider",slider);
        var output = document.getElementById("demo");
        output.innerHTML = slider;

}


in(){
    var slider = this.model.value1;
    console.log("slider",slider);
    var output = document.getElementById("demo1");
    output.innerHTML = slider;

}


}

