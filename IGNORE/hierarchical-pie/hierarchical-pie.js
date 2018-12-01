d3.json('data_pie.json').then(function(data_before){
    //Setting up variables
    var inLevel = 1;
    var dataChain = [];
    var choiceGlobal = 0;
    var maxV = 0
    var firstData = data_before.map(x => x);
    var radius = Math.min(document.getElementById('chart1').clientWidth-1,document.getElementById('chart1').clientHeight-1)/2
    dataChain.push(firstData);

    //set init variables
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius / 2);
    var arcOver = d3.arc()
        .outerRadius(radius)
        .innerRadius(radius / 2);
    var pie = d3.pie()
        .sort(null)
        .value(function(d) {
            var val = d.cost;
            if(typeof val === 'string')
                return parseFloat(val);
            return val;
      });

    //add main svg
    var svg = d3.select("#chart1")
        .append("g")
        .attr("transform", "translate(" + ((document.getElementById('chart1').clientWidth-1)/2) + "," + ((document.getElementById('chart1').clientHeight-1)/2) + ")");;
    
    //inner labeling for 
    var focusGroup = svg.append('g')
        .attr('class', 'focus-group');
    var nameLabel = focusGroup.append('g')
        .attr('class', 'arc-percent')
        .style("text-anchor", "middle")
        .style("font-size", "32px")
        .append("text")
        .attr("dy", "-1.2em");
    var percentLabel = focusGroup.append('g')
        .attr('class', 'arc-percent')
        .style("text-anchor", "middle")
        .style("font-size", "24px")
        .append("text");
    var costLabel = focusGroup.append('g')
        .attr('class', 'arc-percent')
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .append("text")
        .attr("dy", "1.2em");

    //set button actions
    d3.select("#resetButton")
        .on("click", goLevelUp)
    
    renderPie(firstData)

    function goLevelUp() {
        if(inLevel == 1){
            return false;
        }
        inLevel = inLevel-1;
        dataChain.splice(dataChain.length - 1, 1);
        var prev = dataChain[dataChain.length - 1];
        renderPie(prev);
        if(inLevel === 1)
            console.log("first layer")  
        return false;
    };

    function sliceClick(d, i) {
        if(typeof d.data.categories === 'undefined')
          return false;
        inLevel++;
        dataChain.push( d.data.categories );
        renderPie(d.data.categories);
        return false;
    };

    function pieMouseOut(d, i) {
        var hovered = d3.select(this);   
        focusGroup.transition().attr('opacity', 0);
        hovered.transition()
            //.ease("easeInOutQuart")
            .duration(100)
            .attr("d", arc);
    };

    function pieMouseOver(d, i) {
        var hovered = d3.select(this);
        var percentage = (((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100).toFixed(1);
        nameLabel.text(d.data.category);
        if(inLevel == 1){
            percentLabel.text("Market Share: " + percentage + '%');
        } else{
            percentLabel.text("% of company sales: " + percentage + '%');
        }
        costLabel.text("Total Sales: " + Number(d.data.cost).toLocaleString());
        focusGroup.transition().attr('opacity', 1);
        hovered.transition()
            //.ease("easeInOutQuart")
            .duration(100)
            .attr("d", arcOver);
    };

    function tweenPie(b){
        b.innerRadius = 0;
        var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
        return function(t) { return arc(i(t)); };
    };

    function renderPie(data) {
        svg.select('g.cake').remove();
        var arcs = svg.append('g')
            .attr('class', 'cake')
            .selectAll("g.arc").data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
    
        arcs.append("path").attr("d", arc)
            .attr("fill", function(d,i) { return color(i); })
            .attr("stroke", function(d,i) { return d3.rgb(color(i)).darker(); })
            .attr('class', function(d,i) { return 'category-pie-' + i + (typeof d.categories === 'undefined' ? ' pie-leaf' : ''); })
            .on('mouseover', pieMouseOver)
            .on('mouseout', pieMouseOut)
            .on('click', sliceClick)
            .transition()
            //.ease("easeInOutQuart")
            .duration(1000)
            .attrTween("d", tweenPie);
      };
});
