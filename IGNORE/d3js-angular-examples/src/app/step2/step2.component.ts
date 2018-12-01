import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WINDOW_CALLBACK_NAME } from 'google-maps';

@Component({
    selector: 'app-step2',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step2.component.html',
    styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

    title = 'Step 2';

    constructor() {
    }

    ngOnInit() {

      
       

    }

    year_enter (){

        var hold = document.getElementById("yr").value;
        var years = +hold; // y: number
        console.log(years)

        
    
        
    }
}
