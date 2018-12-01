import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import { FormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WINDOW_CALLBACK_NAME } from 'google-maps';

@Component({
    selector: 'app-step3',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step3.component.html',
    styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

    title = 'Step 3: Car Selection';
    model = {
        year: ""
    }

    constructor() {
    }

    ngOnInit() {

      
       

    }

    year_enter (){
        var hold = this.model.year;
        var yr = +hold;
        console.log(yr);
    }
}
