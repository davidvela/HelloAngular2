import { Component, OnInit } from '@angular/core';
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
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  title: string = 'D3.js with Angular 2!';
  subtitle: string = 'Pie Chart';
  widthSVG: number = 500; //- doesn't work in the HTML
  heightSVG: number = 300;

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private radius: number;

  private arc: any;
  private labelArc: any;
  private pie: any;
  private color: any;
  private svg: any;

  constructor() {
    this.width  = this.widthSVG - this.margin.left - this.margin.right ;
    this.height = this.heightSVG - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ngOnInit() {
    this.initSvg()
    this.drawPie();
    this.drawLegend();
  }

  private initSvg() {
    //set colors 
    this.color = d3Scale.scaleOrdinal()
                        //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
                        //      blue          red        green     purple     blue       orange    other - yellow 
                          .range(["#086EC2", "#890E0E", "#589531", "#752AE5", "#15A4BD", "#ff8c00", "AFB237"]);
    //this.color =   d3Scale.scaleOrdinal()
      //                    .range(d3Scale.schemeCategory10);    
                          //var colorscale = d3Scale.category10();
    this.arc = d3Shape.arc()
                      .outerRadius(this.radius - 10)
                      .innerRadius(0);
    this.labelArc = d3Shape.arc()
                           .outerRadius(this.radius - 40)
                           .innerRadius(this.radius - 40);
    this.pie = d3Shape.pie()
                      .sort(null)
                     // .value((d: any) => d.population);
                      .value((d: any) => d[ Dimension.value ] );
    this.svg = d3.select("svg")
                 .append("g")
                 .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");;
  }

  private drawPie() {
    let g = this.svg.selectAll(".arc")
                    .data(this.pie(chartData))
                    .enter().append("g")
                    .attr("class", "arc");
    g.append("path").attr("d", this.arc)
                    .attr("stroke-width", 2)
                    .attr("stroke", "white")
                    .style("fill", (d: any) => this.color(d.data[Dimension.label]) )
                    ;
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
                    .attr("dy", ".35em")
                    .text((d: any) => d.data[Dimension.value]);
  }

  private drawLegend() {
    let legendTitle = this.svg.append("text")
                              .attr("class",     "title")
                              .attr('transform', "translate(-" + this.width / 2 + ",-" + this.height / 2 + ")")
                              .attr("x", 0)
                              .attr("y", 10)
                              .attr("font-size", "12px")
                              .attr("fill", "#404040")
                              .text("Legend:");
    //Initiate Legend	
    let legend = this.svg.append("g")
                        .attr("class", "legend")
                        .attr("height", 100)
                        .attr("width", 200)
                        .attr('transform', "translate(-" + this.width / 2 + ",-" + ( this.height / 2 - 20 )+ ")")
                        ;
    //create the colour squares 
    legend.selectAll("rect")
                      .data(chartData).enter()
                      .append("rect")
                      .attr("x", 0)
                      .attr("y", (d: any, i:any) => i * 20 )
                      .attr("width", 10)
                      .attr("height", 10)
                      .style("fill", (d: any) => this.color(d[Dimension.label])  )
                      ;
   //add the texts
   legend.selectAll("text")
                      .data(chartData).enter()
                      .append("text")
                      .attr("x", 20)
                      .attr("y", (d:any, i:any) => i*20 + 9)
                      .attr("font-size", "11px")
                      .attr("fill", "#737373")
                      .text((d: any) => d[Dimension.label]);           
                      ;
  }

}
