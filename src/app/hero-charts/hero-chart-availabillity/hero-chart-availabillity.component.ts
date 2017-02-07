import {Component, OnInit,ViewEncapsulation, ElementRef, ViewChild, Input} from "@angular/core";
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Axis from "d3-axis";
import * as d3Format from "d3-format";
import * as d3Aarray from "d3-array";

@Component({
  selector: 'app-hero-chart-availabillity',
  encapsulation: ViewEncapsulation.None, /*this make CSS D3JS work*/
  templateUrl: './hero-chart-availabillity.component.html',
  styleUrls: ['./hero-chart-availabillity.component.css']
})
export class HeroChartAvailabillityComponent implements OnInit {
  @ViewChild('chartav') private chartContainer: ElementRef;

    private barWidth: number = 600;
    private width: number;
    private height: number;
    private color: any;
    private svg: any;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
    private chart: any;  
  
  constructor() {
    this.width  = 1000 - this.margin.left - this.margin.right ;
    this.height = 100 - this.margin.top - this.margin.bottom;
  }

  private data: any[] = [ { percent : 50, date: new Date(2017, 4, 28)  } ];
  private date: Array<Date> = []; 

  ngOnInit() {
    // analyze data 
    if (this.data[0].percent ==  0 || this.data[0].percent == undefined ) this.data[0].percent = 0.
    let currentDate : Date = this.data[0].date;
    this.date.push( currentDate );

   let nextDate : Date = new Date(currentDate.getFullYear(), 
                                  currentDate.getMonth() + 1, 
                                  currentDate.getDate() );
    this.date.push( nextDate );

   let nextnextDate : Date = new Date(currentDate.getFullYear(), 
                                  currentDate.getMonth() + 2, 
                                  currentDate.getDate() );    
   this.date.push( nextnextDate );

    let element = this.chartContainer.nativeElement;
    this.svg = d3.select(element).append('svg')
      .attr('width',this.width)
      .attr('height',this.height);
    this.chart = this.svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);  

     this.paintBar( );
  }

  paintBar( ){

     let xAxisG = this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 20 + ")")
    /*let xAxisLabel = xAxisG.append("text")
        .style("text-anchor", "middle")
        .attr("x", this.barWidth/2)
        .attr("y", -5)
        .attr("class", "label")
        .attr("font-size", "11px").attr("fill", "#737373")
        .text("Time frame"); */
    //console.log( "date = " + this.data[0].date.getYear())
    let line = this.svg.append("rect")
              .attr("x", 15 ).attr("y", 25 )
              .attr("width", this.barWidth + 10 )
              .attr("height", 1 ) .style("fill",  "black"  )
              .style("stroke","black"  )
   let dates = xAxisG.selectAll("rect").data(this.date).enter().append("text")       
              .style("text-anchor", "middle")
              .attr("x", (d:any, i:any) =>  this.barWidth*i/2 + this.margin.left)
              .attr("y", 0)
              .attr("class", "label")
              .attr("font-size", "11px").attr("fill", "#737373")
              .text( (d:any) => d.getMonth() + "-" + d.getFullYear() );

    /*let x = d3Scale.scaleTime().range([0, this.width]);
    x.domain(  ); //d3Aarray.extent( this.date, d:any => d3.date ) ) ;    
    let xAxis   = d3Axis.axisTop(x)//.orient("bottom")
        .ticks(3)                   // Use approximately 5 ticks marks.
        //.tickFormat(d3Format.format("s")) // Use intelligent abbreviations, e.g. 5M for 5 Million
        //.outerTickSize(0);          // Turn off the marks at the end of the axis.
    xAxisG.call(xAxis); */




    let group = this.svg.append("g");
    let bar = group.selectAll("rect").data(this.data).enter().append("rect")
              .attr("x", 20).attr("y", 30 )
              .attr("width", (d:any) => this.barWidth * d.percent/100)
              .attr("height", 20 ) //25)
              .style("fill", (d: any) =>  "#41c441"  )
              .style("stroke","black"  )
                 
    let textBar = group.selectAll("text").data(this.data).enter().append("text")       
              .style("text-anchor", "middle")
              .attr("x", (d:any, i:any) => this.barWidth * d.percent/200)
              .attr("y", 45)
              .attr("class", "label")
              .attr("font-size", "11px").attr("fill", "black")
              .text( (d:any) => d.percent + "%" );
  }

}
