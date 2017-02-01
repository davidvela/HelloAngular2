import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Hier from "d3-hierarchy";


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
          value: 19,
          primary: true,
          category: "Product",
          name: "Java",
          experience: "X",
          level: "X",
          lastYearUsed: 2016                     
        }, 
        {
          id: "root.java",           
          value: 40,
          primary: true,
          category: "Product",
          name: "Java",
          experience: "X",
          level: "X",
          lastYearUsed: 2016                        
        }, 
        {
          id: "root.jboss",          
          value: 15,
          primary: true,
          category: "Product",
          name: "Java",
          experience: "X",
          level: "X",
          lastYearUsed: 2016                        
        }, 
        {
          id: "root.SAP",            
          value: 59 ,
          primary: true,
          category: "Product",
          name: "Java",
          experience: "X",
          level: "X",
          lastYearUsed: 2016                       
        }, 
        {
          id: "root.virtualization", 
          value: 32  ,
          primary: true,
          category: "Product",
          name: "Java",
          experience: "X",
          level: "X",
          lastYearUsed: 2016                      
        }, 
        {
          id: "root.other",          
          value: 10  ,
          primary: true,
          category: "Product",
          name: "Java",
          experience: "X",
          level: "X",
          lastYearUsed: 2016                      
        }
      ];

    const Dimension: any = {
          label: "id",
          value: "value",
          color: "primary"
      };


      let group = this.svg.append("g");
      let bubblesG = group.selectAll("g").data(chartData).enter().append("g")
        .attr('transform', 'translate(200, 50)') ; 
      
      let stratify = d3Hier.stratify()
                      .parentId(function(d:any) { return d.id.substring(0, d.id.lastIndexOf(".")); });
      let nodes = d3Hier.pack().size([400,400]).padding(800);
    
      let root = stratify(data)
          .sum(function(d:any) {    return d.value; })
          .sort(function(a:any, b:any) { return b.value - a.value; });

      nodes(root);
      console.log(root.descendants());

      let node = group.selectAll(".node")
            .data(root.descendants())
            //.filter(function(d) { return !d.children; }))
            .enter().append("g")
              //.attr('transform', 'translate(200, 50)')  
              .attr("class", "node")
              .attr("transform", (d:any) =>  "translate(" + d.x + "," + d.y + ")" );

        node.append("circle")
            .attr("r", (d) => 40 ); //  return d.r; );

        node.append("text")
            .text(function(d) { return d.id; })
            //.style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
            .attr("dy", ".35em")
            .style("fill", "white")
            ;



// normal circles 

      bubblesG.append("circle")
                        .attr("id", (d:any, i) => i )
                        .attr("cx", (d:any, i:any) => 50 * i + 10)
                        .attr("cy",0)
                        .attr("r", (d)=> 20 )
                        .style("fill", (d) => this.color(d[Dimension.label]) );
                 
      bubblesG.append("text")
                    .attr("transform", (d: any, i:any) => "translate("+ (50* i) + "," + 0  + ")")
                    .attr("dy", ".35em")
                    .text((d: any) => d[Dimension.value]);

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
