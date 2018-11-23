d3.json('data_bar.json').then(function(data_before){
    document.getElementById("salesButton").style.background="lightblue";
    //Setting up variables
    var inLevel = 1;
    var dataChain = [];
    var choiceGlobal = 0;
    var maxV = 0

    var svg = d3.select("#chart1");
    var firstData = data_before.map(x => x);
    var currentData = data_before;
    var sortState = 0; //alphabetical=0, asc=1, desc=2

    dataChain.push(firstData);
    renderBars(currentData,choiceGlobal)

    function renderBars(tempData,choice){
        choiceGlobal = choice
        var maxVal = 0
        tempData.forEach(function(d) { 
            //getting lengths of all children for averages besides sales
            var l = 0
            if(typeof d.categories === 'undefined'){
                l = 1
            } else{
                if(inLevel == 1){
                    var tempL = 0;
                    (d.categories).forEach(function(d1){
                        if(typeof d1.categories === 'undefined'){
                            tempL = tempL;
                        } else{
                            tempL += d1.categories.length;
                        }
                    });
                    l = tempL;
                }
                else{
                    l = d.categories.length
                }
            }
            //now finding max average value (besides sales which is totaled)
            if(choice == 0){
                if(d.sales > maxVal){
                    maxVal = d.sales;
                }
            }
            else if(choice == 1){
                if(d.mpg/l > maxVal){
                    maxVal = d.mpg/l;
                }
            } else{
                if(d.price/l > maxVal){
                    maxVal = d.price/l;
                }
            }
        });
        maxV = maxVal
        
        /* Remove any existing lines */
        d3.select("#chart").selectAll("*").remove();
        d3.select(".axis-X").remove()
        d3.select(".axis-Y").remove()

        //setting up axis functions
        var x = d3.scaleLinear()
            .domain([0,maxVal])
            .range([0, 750]);
        var axisX = d3.axisTop()
            .scale(x);
        svg.append("g")
            .attr("class", "axis-X")
            .attr("transform", "translate(100,100)")
            .call(axisX);

        //call first state
        update(tempData);
    }
    
    //update function
    function update(data) {
        currentData = data
        var len = 30*data.length

        var y = d3.scaleBand()
            .domain(data.map(a => a.category))
            .range([0, len])
            .paddingInner(0.05);
        var axisY = d3.axisLeft()
            .scale(y);
        d3.selectAll(".axis-Y").remove()
        svg.append("g")
            .attr("class", "axis-Y")
            .attr("transform", "translate(100,100)")
            .call(axisY);

        var rects = svg.selectAll("rect")
            .data(data, function (d) { 
                return d.category; });
        rects.transition()  //UPDATE
            .duration(1000)
            .attr("y", function(d, i) { 
                //console.log(i)
                return i * 30 + 102; })
            .attr("x", function(d) { 
                return 102;
            })
            .attr("height", 25) 
            .attr("width", function (d) { 
                var l = 0
                if(typeof d.categories === 'undefined'){
                    l = 1
                } else{
                    if(inLevel == 1){
                        var tempL = 0;
                        (d.categories).forEach(function(d1){
                            if(typeof d1.categories === 'undefined'){
                                tempL = tempL;
                            } else{
                                tempL += d1.categories.length;
                            }
                        });
                        l = tempL;
                    }
                    else{
                        l = d.categories.length
                    }
                }
                if(choiceGlobal == 0){
                    return 750*(d.sales/maxV); 
                }
                else if(choiceGlobal == 1){
                    return 750*((d.mpg/l)/maxV); 
                } else {
                    return 750*((d.price/l)/maxV);;
                }
            })
            .attr("fill", "skyblue");
        rects.exit()  //EXIT
            .transition()
            .duration(1000)
            .style("opacity", 0)  //style here!
            .remove();
        rects.enter()  //ENTER
            .append("rect")
            .attr("y", function(d, i) { 
                return i * 30 + 102; })
            .attr("x", function(d) { 
                return 102;
            })
            .attr("height", 25)
            .attr("width", function (d) { 
                var l = 0
                if(typeof d.categories === 'undefined'){
                    l = 1
                } else{
                    if(inLevel == 1){
                        var tempL = 0;
                        (d.categories).forEach(function(d1){
                            if(typeof d1.categories === 'undefined'){
                                tempL = tempL;
                            } else{
                                tempL += d1.categories.length;
                            }
                        });
                        l = tempL;
                    }
                    else{
                        l = d.categories.length
                    }
                }
                if(choiceGlobal == 0){
                    return 750*(d.sales/maxV); 
                }
                else if(choiceGlobal == 1){
                    return 750*((d.mpg/l)/maxV); 
                } else {
                    return 750*((d.price/l)/maxV);;
                }
            })
            .attr("fill", "skyblue")
            .on("mouseover", function(d){
                d3.select(this)
                .style("fill", "blue");
            })
            .on("mouseout", function(d){
                d3.select(this)
                .style("fill", "skyblue");
            })
            .on("click", barClick)
            .transition()
            .duration(1000);
        //deal with axis
        y.domain(data.map(z => z.category));
        //y.domain(data.map(z => z.sales))

        d3.select(".axis-Y")
        .transition()
        .duration(1000)
        .call(axisY);
    }

    function goLevelUp() {
        if(inLevel == 1){
            return false;
        }
        inLevel = inLevel-1;
        dataChain.splice(dataChain.length - 1, 1);
        var prev = dataChain[dataChain.length - 1];
        renderBars(prev,choiceGlobal);
        if(self.inLevel === 1)
            console.log("first layer")  
        return false;
    };

    function barClick(d, i) {
        if(typeof d.categories === 'undefined')
          return false;
        inLevel++;
        dataChain.push( d.categories );
        renderBars(d.categories,choiceGlobal);
        return false;
      };
    
    //add button listeners
    d3.select("#descButton")
    .on("click", function() {
        sortState = 2;
        update(currentData.sort(function(a, b) { 
            if(choiceGlobal == 0){
                return b.sales - a.sales;
            } 
            else if(choiceGlobal == 1){
                return b.mpg - a.mpg;
            } else{
                return b.price - a.price;
            }
        }));
    });
    d3.select("#ascButton")
    .on("click", function() {
        sortState = 1;
        update(currentData.sort(function(a, b) { 
            if(choiceGlobal == 0){
                return a.sales - b.sales;
            } 
            else if(choiceGlobal == 1){
                return a.mpg - b.mpg;
            } else{
                return a.price - b.price;
            }
        }));
    });
    d3.select("#alphaButton")
    .on("click", function() {
        sortState = 0;
        update(currentData.sort(function(a, b) { 
           return (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0);
        }));
    });

    d3.select("#salesButton")
        .on("click", function() {
            this.style.background='lightblue';
            whiteMpg()
            whitePrice()
            renderBars(currentData,0)
        });

    d3.select("#mpgButton")
        .on("click", function() {
            this.style.background='lightblue';
            whiteSales()
            whitePrice()
            renderBars(currentData,1)
        });
    d3.select("#priceButton")
        .on("click", function() {            
            this.style.background='lightblue';
            whiteMpg()
            whiteSales()
            renderBars(currentData,2)
        });

    d3.select("#resetButton")
        .on("click", goLevelUp)
    
    function whitePrice() {document.getElementById("priceButton").style.background="white";}
    function whiteMpg() { document.getElementById("mpgButton").style.background="white"; }
    function whiteSales() {document.getElementById("salesButton").style.background="white";}

});
