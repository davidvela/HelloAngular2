/* coding tips
  var fill_color = d3.scale.ordinal()
                  .domain(["low", "medium", "high"])
                  .range(["#d84b2a", "#beccae", "#7aa25c"]);

    var max_amount = d3.max(data, function(d) { return parseInt(d.total_amount, 10); } );
    radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([2, 85]);

    data.forEach(function(d){
      var node = {
        id: d.id,
        radius: radius_scale(parseInt(d.total_amount, 10)),
        value: d.total_amount,
        name: d.grant_title,
        org: d.organization,
        group: d.group,
        year: d.start_year,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
      nodes.push(node);
    });

*/


import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Hier from "d3-hierarchy";
import * as d3Format from "d3-format";
import * as d3Aarray from "d3-array";
import * as d3Force  from "d3-force";

//import { Stats } from './shared/data';
const Dimension: any = {
    label: "age",
    value: "population"
};

const chartData: any[] = [
  {age: ".Net",           population: 40}, //blue dark - .NET
  {age: "oracle",         population: 19}, // red  oracle db
  {age: "java",           population: 40}, // green java
  {age: "jboss",          population: 15}, // purple jboss
  {age: "SAP",            population: 59}, // light blue sap 
  {age: "virtualization", population: 32}, // orange virtualization
  {age: "other",          population: 10}
];



@Component({
  selector: 'app-hero-chart-bubble',
  encapsulation: ViewEncapsulation.None, /*this make CSS D3JS work*/
  templateUrl: './hero-chart-bubble.component.html',
  styleUrls: ['./hero-chart-bubble.component.css']
})
export class HeroChartBubbleComponent implements OnInit {
    @ViewChild('chart') private chartContainer: ElementRef;
    //@Input() private data: Array<any>;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;
 
    widthSVG: number = 960; 
    heightSVG: number = 500;

    private color: any;
    private svg: any;

  constructor() {
    this.width  = this.widthSVG ;  //- this.margin.left - this.margin.right ;
    this.height = this.heightSVG ; // - this.margin.top - this.margin.bottom;
  }
  
  
  ngOnInit() {
      this.createChart();
      //if (this.data) {
          //   this.updateChart();
      //}
        //this.initSvg()
      this.drawBubbles();
      this.drawLegend();
  }

      

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);
    // chart plot area
    this.chart = this.svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);  
    this.color = d3Scale.scaleOrdinal()
                          .range(["#086EC2", "#890E0E", "#589531", "#752AE5", "#15A4BD", "#ff8c00", "AFB237"]);
}

  private drawBubbles() {

const data: any[] = [
        { id: "root",     
          value: "" ,   
          primary: true,
          category: "Product",
          name: "Java",
          experience: "X",
          level: "X",
          lastYearUsed: 2016
        }, 
        {
          id: "root.oracle",         
          value: 2,
          primary: true,
          category: "Product",
          name: "Java",
          experience: "X",
          level: "X",
          lastYearUsed: 2016                     
        }, 
        {
          id: "root.java",           
          value: 3,
          primary: false,
          category: "Product",
          name: "Java",
          experience: "X",
          level: "X",
          lastYearUsed: 2016                        
        }, 
        {
          id: "root.jboss",          
          value: 2,
          primary: true,
          category: "Product",
          name: "Java",
          experience: "X",
          level: "X",
          lastYearUsed: 2016                        
        }
      ];

    const Dim: any = {
          label: "id",
          value: "value",
          color: "primary"
      };


    let diameter  = 960,
        format    = d3Format.format(",d"),
        color     = d3Scale.scaleOrdinal()
                          .range(["#086EC2", "#890E0E", "#589531", "#752AE5", "#15A4BD", "#ff8c00", "AFB237"]);
                //d3.scaleOrdinal(d3.schemeCategory20c);

      let group = this.svg.append("g");
      let bubblesG = group.selectAll("g").data(chartData).enter().append("g")
        .attr('transform', 'translate(200, 50)') ; 
      

      let stratify = d3Hier.stratify()
                      .parentId( (d:any) => d.id.substring(0, d.id.lastIndexOf("."))  );  
      //let nodes = d3Hier.pack().size([400,400]).padding(800);
        let nodes = d3Hier.pack().size([800,500]).padding(800);
          let root = stratify(data)
          .sum( (d:any) =>  d.value )
          .sort((a:any, b:any) =>  (b.value - a.value) );
      nodes(root);
      //console.log(root.descendants());
      //console.log(root.children);

    let max_amount = d3Aarray.max(data, function(d) { return parseInt(d.value, 10); } );
    let  radius_scale = d3Scale.scalePow().exponent(0.5).domain([0, max_amount]).range([2, 85]);
    
    let nodesV  : Array<any> = [];
    /*data.forEach(function(d){
      let nodeV = {
        id: d.id,
        radius: radius_scale(parseInt(d.value, 10)),
        value: d.value,
        name: d.id,
        org: d.id,
        primary : d.primary,
        group: d.group,
        year: d.start_year,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
      nodesV.push(nodeV);
    }); /*/

      //console.log(nodesV);
      var radio = d3Scale.scaleOrdinal()
                  .domain(["1", "2", "3"])
                  .range(["20", "30", "50"]);

      let node = group.selectAll(".node")
            .data(root.children)
            //.filter(function(d) { return !d.children; }))
            //.data(nodesV)
            .enter().append("g")
              //.attr('transform', 'translate(200, 50)')  
              .attr("class", "node")
              .attr("transform", (d:any) =>  "translate(" + d.x + "," + d.y + ")" )
           //   .on("mouseover", hovered(true))
           //   .on("mouseout", hovered(false));
            // .on("mouseover", (d:any)=>d3.selectAll(d.ancestors().map(function(d) { return d.node; })).classed("node--hover", true) )

              ;

      
      node.append("title")
        .text(function(d) { 
          return  d.id + ": " +  format(d.value); 
        });

        node.append("circle")
              .attr("id", (d) => "node-" + d.id )
              .attr("r", (d) => 40 ) //  return d.r; );
             //.attr("r", (d) =>  d.r )
             //.attr("r", (d) => radio( d.value) )
             .style("fill", (d) => color(d.data.primary) )
             //.style("fill", "red")//(d) => color(d.primary) )
               
                ;
                
        node.append("text")
            //.text(function(d) { return d.data.className.substring(0, d.r / 3); })
            .text( (d) =>  d.id )
            //.style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("fill", "black").attr("font-size", "11px")
            ;


let simulation = d3Force.forceSimulation()
    .nodes(root.children)
    .force("link", d3Force.forceLink().id(function(d:any) { return d.id; }))
    .force("charge", d3Force.forceManyBody())
    .force("center", d3Force.forceCenter(400 / 2, 400 / 2));
  
  simulation.force(".node");
     // .links(nodesV);

   /* let force = d3Force.Force()
            .nodes(nodesV)
            //.size([this.width, this.height])
            .gravity() ;
    d3Force.gravity(layout_gravity)
         .charge(charge)
         .friction(0.9)
         .on("tick", function(e) {
            circles.each(move_towards_center(e.alpha))
                   .attr("cx", function(d) {return d.x;})
                   .attr("cy", function(d) {return d.y;});
         });
    force.start();
    hide_years(); */
//****************************************************************************** */
//****************************************************************************** */
//****************************************************************************** */
// normal circles 
//****************************************************************************** */
//****************************************************************************** */
//****************************************************************************** */
/*
      bubblesG.append("circle")
                        .attr("id", (d:any, i) => i )
                        .attr("cx", (d:any, i:any) => 50 * i + 10)
                        .attr("cy",0)
                        .attr("r", (d)=> 20 )
                        .style("fill", (d) => this.color(d[Dimension.label]) );
                 
      bubblesG.append("text")
                    .attr("transform", (d: any, i:any) => "translate("+ (50* i) + "," + 0  + ")")
                    //.attr("dy", ".35em")
                    .text((d: any) => d[Dimension.value]);
*/
     // bubblesG.append("title")
     //           .text( (d)=> d[Dimension.label] + "\n" + d[Dimension.value]  );
  }


    private createHierarchy(){

    }

    private drawLegend() {
      let legendTitle = this.svg.append("text")
                                .attr("class",     "Legendtitle")
                                //.attr('transform', "translate(0,350)")
                                .attr("x", 0).attr("y", 10).text("Legend Bubbles:");

      let legend = this.svg.append("g")
                          .attr("class", "legend")
                          .attr("height", 100).attr("width", 200)
                         // .attr('transform', "translate(" + this.width / 2 + "," + ( this.height / 2 - 20 )+ ")")
                          ;
      legend.selectAll("rect").data(chartData).enter().append("rect")
                        .attr("x", 0).attr("y", (d: any, i:any) => i * 20 + 20 )
                        .attr("width", 40).attr("height", 10)
                        .style("fill", (d: any) => this.color(d[Dimension.label])  )
                        .style("stroke","black"  )
                        ;
      legend.selectAll("text").data(chartData).enter().append("text")
                        .attr("x", 50).attr("y", (d:any, i:any) => i*20 + 29)
                        .attr("font-size", "11px").attr("fill", "#737373")
                        .text((d: any) => d[Dimension.label]);           
                        ;
  }
  
}
