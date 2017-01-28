import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";


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
                        //      blue          red        green     purple     blue       orange    other - yellow 
                          .range(["#086EC2", "#890E0E", "#589531", "#752AE5", "#15A4BD", "#ff8c00", "AFB237"]);
}






  private initSvg() {
      //set colors 
      this.color = d3Scale.scaleOrdinal()
                        //      blue          red        green     purple     blue       orange    other - yellow 
                          .range(["#086EC2", "#890E0E", "#589531", "#752AE5", "#15A4BD", "#ff8c00", "AFB237"]);
      this.svg    = d3.select("svg2").append("g")
                 .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")")
                 .attr("class", "bubbles")
                 ;


  }
  
  private drawBubbles() {
      let bubbles = this.svg.append("g");
      
      bubbles.selectAll("rect").data(chartData).enter()
                       .append("circle")
                        .attr("id", (d:any, i) => i )
                        .attr("cx", 200).attr("cy", 200)
                        .attr("r", (d)=> 20 )
                        .style("fill", (d) => this.color(d[Dimension.label]) );
                 
      bubbles.selectAll("rect").data(chartData).enter()
                    .append("text")
                    //.attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
                    .attr("dy", ".35em")
                    .text((d: any) => d[Dimension.value]);

      bubbles.selectAll("rect").data(chartData).enter()
                .append("title")
                .text( (d)=> d[Dimension.label] + "\n" + d[Dimension.value]  );
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
                        .attr("width", 10).attr("height", 10)
                        .style("fill", (d: any) => this.color(d[Dimension.label])  )
                        ;
      legend.selectAll("text").data(chartData).enter().append("text")
                        .attr("x", 20).attr("y", (d:any, i:any) => i*20 + 29)
                        .attr("font-size", "11px").attr("fill", "#737373")
                        .text((d: any) => d[Dimension.label]);           
                        ;
  }
  
}
