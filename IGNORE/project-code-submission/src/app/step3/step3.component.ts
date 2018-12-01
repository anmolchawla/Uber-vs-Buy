import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
// import * as d3 from 'd3';
// import * as d3Scale from 'd3-scale';
// import * as d3Shape from 'd3-shape';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { DataService } from "../data.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WINDOW_CALLBACK_NAME } from 'google-maps';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ConstantPool } from '@angular/compiler/src/constant_pool';
var service_cost;
var car_name;
var mpg;
var years;
var car_cost;
var car_image;

@Component({
    selector: 'app-step3',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './step3.component.html',
    styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

    message:string

    title = 'Step 3: Car Selection';
    model = {
        year: ""
    }

    constructor(private data: DataService) {
    }

    ngOnInit() {


this.data.currentMessage.subscribe(message => this.message = message)

//////////// NOTE: DO NOT DELETE COMMENTED CODE \\\\\\\\\\\\

var myjson;
var carText;
var userInput;

///////SAVE USER INPUT\\\\\\\\

function MyCtrl($scope) {
    $scope.$watch('inputVal', function(val) {
        if (val) {
            userInput = val;
            console.log(userInput);
        }
    });
}

// $("#ex1").on("keyup change", function() {
//     userInput = this.value; // omit "var" to make it global
//     //console.log(userInput *10)
//  });


$(document).ready(function() {
    $.getJSON("https://api.myjson.com/bins/1fx90e", function(obj) {
        myjson = obj;
        $.each(obj, function(key,value) {
            // $('.selectpicker').selectpicker();
            $("#car-dropdown").append("<option class='hider' segment=" + value.segment + " data-tokens =" + value.brand + " size=" + value.size + ">" + value.name + "</option>");
        //console.log("<option segment =" + value.segment + " data-tokens = " + value.brand + " size=" + value.size + ">" + value.name + "</option>");
        //Append values to global variable to use later to populate button event
        // $('.selectpicker').selectpicker('refresh');
        });
    });
});

//////SORT DROPDOWN LIST: STILL WORKING ON
// $(function() {
//     // choose target dropdown
//     var select = $('select');
//     select.html(select.find('option').sort(function(x, y) {
//       // to change to descending order switch "<" for ">"
//       return $(x).text() > $(y).text() ? 1 : -1;
//     }));
// });


// $('#car-dropdown').find('.hider').hide();
// $('.selectpicker').change(function(){
//     var childSelector = $(this).find('option[segment]:selected').map(function() {
//         return '.' + this.segment;
//       }).get();
    
    
//       var $cvisible = $(this).find('.hider').hide().filter(childSelector.join()).show();
//       $(this).find('.hider').not($cvisible).prop('selected', false);
//       $(this).selectpicker('refresh');
    
//     });

//////////////////////TESTED OKAY: FILTERING LIST BASED ON CHECKBOX
$(':checkbox').change(function() {
    $('#car-dropdown option').hide();
    // $('#car-dropdown').selectpicker('refresh')
    $("input:checkbox[name='vehicleSegment']").each(function(){
        if ($(this).is(':checked')) {
            var checkedSegment = $(this);

            $('option[segment="' + $(this).attr('value') + '"]').show('slow');
            // $('#car-dropdown').selectpicker('refresh');
            $("input:checkbox[name='vehicleSize']").each(function(){
                if ($(this).is(':checked')) {
                    $('#car-dropdown option').hide();
                    // $('#car-dropdown').selectpicker('refresh');
                    var checkedSize = $(this);
                    $('option[segment="' + checkedSegment.attr('value') + '"][size="' + checkedSize.attr('value') + '"]').show('slow');
                    // $('#car-dropdown').selectpicker('refresh');
                }
            });
        }
    });


    // //LAST <OPTION> PRINTS COUNT: STILL WORKING ON
    // divs = document.querySelectorAll('#car-dropdown option');
    // var divsArray = [].slice.call(divs);
    // var displayShow = divsArray.filter(function(el) {
    //     return getComputedStyle(el).display !== "none"
    // });
    // var numberOfVisibleDivs = displayShow.length;
    // $("#car-dropdown").append("<option>" + numberOfVisibleDivs + "</option>");
    
});


//////////SEARCH BUTTON\\\\\\\\\\STILL WORKING ON
// $(function() {
//   $('.selectpicker').selectpicker('refresh');
// });



// function filterFunction() {
//     var input, filter, ul, li, a, i;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     div = document.getElementById("car-dropdown");
//     a = div.getElementsByTagName("option:visible");
//     for (i = 0; i < a.length; i++) {
//       if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
//         a[i].style.display = "";
//       } else {
//         a[i].style.display = "none";
//       }
//     }
//   }


//////SAVING DROPDOWN SELECTION
$(function(){
    $('select[name=locality]').on("change",function(){
     var carValue = $(this).val();
     carText = $(this).find('option:selected').text();
    });
});



////////BUTTON CLICK & OUTPUT\\\\\\\\


$(document).ready(function(){
    $("#btn").click(function(){
        $.each(myjson, function(key,value) {
            if (carText == value.name){
                $("#create").html("");
                service_cost = value.service;
                car_name = value.name;
                mpg = value.mpg;
                car_cost = value.msrp;
                // $('#create').append("<img src='assets/clipart845083.png' width='50%'>");
 

                $.ajax({
                    type:"GET",
                    dataType:"json",
                    url:("https://www.googleapis.com/customsearch/v1?key=AIzaSyB8XoP2HpzUSaEZC6fkibA0fTuV0yovSDE&cx=004681799767857783899%3Adi_kmxt-q4i&q="+car_name+"&imgSize=large&num=1&searchType=image"),
                    success: function(data){
                                            console.log("api call",data.items[0].link);
                                            
                                            var img = document.createElement("img");
                                            img.src = data.items[0].link;;
                                            var src = document.getElementById("create");
                                            src.appendChild(img);
                    }
                });
                $('#create').append("<div id= 'awesomeChoice'> The " + value.name + " is an awesome choice!</div>")
                $('#create').append("<div id='mpg'><b>Miles Per Gallon</b>: " + value.mpg + "</div>");
                $('#create').append("<div id='msrp'><b>Manufacturers Suggested Retail Price</b>: $" +Number(value.msrp).toLocaleString()  + "</div>"); //Number(value.msrp).toLocaleString()
                $('#create').append("<div id='service'><b>Annual Service & Insurance Cost</b>: $" + Number((value.service*12).toFixed(2)).toLocaleString() + "</div>");// Number((value.service*12).toFixed(2)).toLocaleString()
                
            };
        });
        $("#create").show();
    })
});




/////////TENTATIVE\\\\\\\\\\\\
// $(function() {

//     $('#rev').change(function() {
//         if($(this).is(":checked")) {
//             $('#r2').show();
//         }
//     else{
//             $('#r2').hide();
//         }
//     });

// });
/////////TO HIDE SECOND CHECKBOX WHEN PAGE LOADS\\\\\\\\


      
       

    }

    year_enter (){
        var hold = this.model.year;
        var yr = +hold;
        years = yr;
    }


    newMessage() {

        console.log("car",car_name);
        console.log("mpg",mpg);
        console.log("car_cost",car_cost);
        console.log("service cost",service_cost);
        console.log("years",years);
        this.data.changeMessage(service_cost);
        this.data.changeMessage(car_name);
        this.data.changeMessage(mpg);
        this.data.changeMessage(years);
        this.data.changeMessage(car_cost);
      }






}
