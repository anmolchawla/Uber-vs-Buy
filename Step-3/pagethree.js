//////////// NOTE: DO NOT DELETE COMMENTED CODE \\\\\\\\\\\\

var myjson;
var carText;
var userInput;

///////SAVE USER INPUT\\\\\\\\
$("#ex1").on("keyup change", function() {
    userInput = this.value; // omit "var" to make it global
    console.log(userInput *10)
 });


$(document).ready(function() {
    $.getJSON("https://api.myjson.com/bins/1fx90e", function(obj) {
        myjson = obj;
        $.each(obj, function(key,value) {
            // $('.selectpicker').selectpicker();
            $("#car-dropdown").append("<option class='hider' segment=" + value.segment + " data-tokens =" + value.brand + " size=" + value.size + ">" + value.name + "</option>");
        console.log("<option segment =" + value.segment + " data-tokens = " + value.brand + " size=" + value.size + ">" + value.name + "</option>");
        //Append values to global variable to use later to populate button event
        // $('.selectpicker').selectpicker('refresh');
        });
    });
});

//////SORT DROPDOWN LIST: STILL WORKING ON
$(function() {
    // choose target dropdown
    var select = $('select');
    select.html(select.find('option').sort(function(x, y) {
      // to change to descending order switch "<" for ">"
      return $(x).text() > $(y).text() ? 1 : -1;
    }));
});


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


    //LAST <OPTION> PRINTS COUNT: STILL WORKING ON
    divs = document.querySelectorAll('#car-dropdown option');
    var divsArray = [].slice.call(divs);
    var displayShow = divsArray.filter(function(el) {
        return getComputedStyle(el).display !== "none"
    });
    var numberOfVisibleDivs = displayShow.length;
    $("#car-dropdown").append("<option>" + numberOfVisibleDivs + "</option>");
    
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
                $(create).append("<img src='clipart845083.png' width='50%'>");
                $(create).append("<div id= 'awesomeChoice'> The " + value.name + " is an awesome choice!</div>")
                $(create).append("<div id='mpg'><b>Miles Per Gallon</b>: " + value.mpg + "</div>");
                $(create).append("<div id='msrp'><b>Manufacturers Suggested Retail Price</b>: $" + value.msrp + "</div>");
                $(create).append("<div id='service'><b>Estimated Service Charge</b>: $" + value.service + "</div>");
                //console.log(value.mpg)
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


