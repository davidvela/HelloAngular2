import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Input } from '@angular/core';
//import * as d3 from 'd3';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Hier from "d3-hierarchy";
import * as d3Format from "d3-format";
import * as d3Aarray from "d3-array";
import * as d3Force  from "d3-force";


const dim: any = {
    id:    "name",
    val:   "experience",
    label: "name",
    value: "value",
    color: "name"
};


@Component({
  selector: 'app-hero-chart-bubble2',
  encapsulation: ViewEncapsulation.None, /*this make CSS D3JS work*/  
  templateUrl: './hero-chart-bubble2.component.html',
  styleUrls: ['./hero-chart-bubble2.component.css']
})
export class HeroChartBubble2Component implements OnInit {

  
  //@Input() skills: Skill[];
  @ViewChild('chart') private chartContainer: ElementRef;
    
  private skills: Array<any> = [
{
      primary: true,
      category: "PRODUCTS",
      name: "JEE 6", // Oracle.Oracle JAVA/2EE.JEE 6
      experience: "3", // years
      level: "INITIATE",
      lastYearUsed: 2017
    } ,{
      primary: true,
      category: "PRODUCTS",
      name: "Java EE (J2EE)", // Oracle.Oracle JAVA/2EE.Java EE (J2EE) 
      experience: "3", // years
      level: "INITIATE",
      lastYearUsed: 2017
    } ,{
      primary: false,
      category: "PRODUCTS",
      name: "SPRING", // Oracle.Oracle JAVA/2EE.SPRING 
      experience: "1", // years
      level: "INITIATE",
      lastYearUsed: 2016
    } 
  ]
    
    private width: number;
    private height: number;
    private color: any;
    private svg: any;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
    private chart: any;  
  
  constructor() {
    this.width  = 400 - this.margin.left - this.margin.right ;
    this.height = 400 - this.margin.top - this.margin.bottom;
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
  
    this.svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);
    
    // chart plot area
    this.chart = this.svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);  

    this.color = d3Scale.scaleOrdinal()
                          // colors used for the skill overview
                         //.range(["#086EC2", "#890E0E", "#589531", "#752AE5", "#15A4BD", "#ff8c00", "AFB237"]);
                          // colors used for skills 
                          .range(["rgb(166, 20, 200)","rgb(39, 97, 145)", "#890E0E", "#589531", "#752AE5", "#15A4BD", "#ff8c00", "AFB237"]);
  }
  private drawBubbles() {
      let format    = d3Format.format(",d");
      let group = this.svg.append("g");
      
      // create hierarchy: 
     // let nodesV = {children :[] };
      let children  : Array<any> = [];
      
      let rootV = {
                id: "1" ,
                value: "",
                name: "root",
                parent: "",
                primary : "",
              }; children.push(rootV);

      this.skills.forEach(function(d){
      let nodeV = {
        id: d.name,
        value: d.experience,
        name: d.name,
        parent: 1,
        primary : d.primary
      };
        children.push(nodeV);
      });

     try {
      let bubblesG = group.selectAll("g").data(children).enter().append("g")
        .attr('transform', 'translate(0, 0)') ; 
     
     let stratify = d3Hier.stratify()
                      .id( (d:any) =>  d.id )
                      //.parentId( (d:any) => d[dim.id].substring(0, d[dim.id].lastIndexOf("."))  );  
                      .parentId( (d:any) => d.parent  );  
        let nodes = d3Hier.pack().size([400,140]).padding(0);

        let root = stratify(children)
          .sum( (d:any) =>  d.value )
          .sort((a:any, b:any) =>  (b[dim.value] - a[dim.value]) );
      
      nodes(root);
      console.log(root.descendants());
      console.log(root.children);
      let node = group.selectAll(".node")
            .data(root.children)
            .enter().append("g")
              //.attr('transform', 'translate(200, 50)')  
              .attr("class", "node")
              .attr("transform", (d:any) =>  "translate(" + d.x + "," + d.y + ")" )
              ;     
/********************************************************************************* */
      // DRAW//  
/********************************************************************************* */
      node.append("title")
        .text( (d:any) => (  d[dim.id] + ": " +  format(d[dim.val] ) ) );
        node.append("circle")
              .attr("id", (d) => "node-" + d.id )
              .attr("r", (d) =>  d.r )
              //.attr("r", (d) => radio( d.value) )
              .attr("stroke-width", 1)
              .attr("stroke", "black")
              .style("fill", (d) => (d.data.primary === true) ? this.color(d.data[dim.label]) : "gray"  )
              ;        
        node.append("text")
            //.text(function(d) { return d.data.className.substring(0, d.r / 3); })
            .text( (d) =>  d.data[dim.value] +  "\n year")
            //.style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("fill", "white").attr("font-size", "11px")
            ;

/********************************************************************************* */
      // SHADOWS// 
/********************************************************************************* */










       }
        catch (e) {
          console.log(e);
          //  this._rethrowWithContext(e);
          //  throw e;
        }

  }


  private drawLegend() {

      //console.log(this.skills);

      let legend = this.svg.append("g")
                          .attr("class", "legend")
                          .attr("height", 100).attr("width", 200)
                         // .attr('transform', "translate(" + this.width / 2 + "," + ( this.height / 2 - 20 )+ ")")
                          ;
      legend.selectAll("rect").data(this.skills).enter().append("rect")
                        .attr("x", 0).attr("y", (d: any, i:any) => i * 20 + 20 )
                        .attr("width", 20).attr("height", 10)
                        .style("fill", (d: any) =>  (d.primary === true) ? this.color(d[dim.label]) : "gray"  )
                        .style("stroke","black"  )
                        ;
      legend.selectAll("text").data(this.skills).enter().append("text")
                        .attr("x", 30).attr("y", (d:any, i:any) => i*20 + 29)
                        .attr("font-size", "11px").attr("fill", "#737373")
                        .text((d: any) => d[dim.label]);           
                        ;
  }

}