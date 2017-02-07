import { HeroGermanyDataService } from './../../shared/hero-germanydata.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Geo from "d3-geo";


@Component({
  selector: 'app-hero-chart-map',
  encapsulation: ViewEncapsulation.None, /*this make CSS D3JS work*/
  templateUrl: './hero-chart-map.component.html',
  styleUrls: ['./hero-chart-map.component.css'],
  providers: [ HeroGermanyDataService ]
})
export class HeroChartMapComponent implements OnInit {

  widthSVG: number = 960; //- doesn't work in the HTML
  heightSVG: number = 500;

  //var width = 960,    height = 500,    focused = null,    geoPath;

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;

  private mapData : any;
  private svg     : any;
  public  group   : any;
  private geoPath : any;
  private focused : any = null;

  constructor( private heroGermanyData: HeroGermanyDataService) {
    this.width  = this.widthSVG - this.margin.left - this.margin.right ;
    this.height = this.heightSVG - this.margin.top - this.margin.bottom;
   
  }

  ngOnInit() {
    this.initSvg()
    this.drawMap();
    //this.drawLegend();
    }

  private initSvg() {
    //set colors 
    //this.color = d3Scale.scaleOrdinal()
    //                      .range(["#086EC2", "#890E0E", "#589531", "#752AE5", "#15A4BD", "#ff8c00", "AFB237"]);
    this.svg    = d3.select("svg");
    this.svg.append("rect").attr("class", "background")
                           .attr("width", this.width).attr("height", this.height); 
    this.group  =  this.svg.append("g")
                           .attr("id", "states");

    this.mapData = this.heroGermanyData.getGermanyData();

  }
  /*  //var svg = d3.select("body")  .append("svg")     .attr("width", width)     .attr("height", height);
    //svg.append("rect")     .attr("class", "background")     .attr("width", width)     .attr("height", height);
    //var g = svg.append("g")
    d3.json("./dataBundesLander.json", function(collection) {
  */

  private drawMap(){
    
  let bounds = d3Geo.geoBounds(this.mapData),
      bottomLeft = bounds[0],
      topRight = bounds[1],
      rotLong = -(topRight[0]+bottomLeft[0])/2,
      center : [number, number] = [(topRight[0]+bottomLeft[0])/2+rotLong, (topRight[1]+bottomLeft[1])/2],

      //default scale projection
     projection = d3Geo.geoAlbers() 
        .parallels([bottomLeft[1],topRight[1]])
        .rotate([rotLong,0,0])
        .translate([this.width/2,this.height/2])
        .center(center),
         bottomLeftPx = projection(bottomLeft),
         topRightPx   = projection(topRight),
         scaleFactor  = 1.00*Math.min(this.width/(topRightPx[0]-bottomLeftPx[0]), this.height/(-topRightPx[1]+bottomLeftPx[1])),
      
      geoProjection = d3Geo.geoAlbers()
        .parallels([bottomLeft[1],topRight[1]])
        .rotate([rotLong,0,0]) 
        .translate([this.width/2,this.height/2])
        .scale(scaleFactor*0.975*1000)
        //.scale(4*1000)
        //.scale(4*1000)  //1000 is default for USA map
        .center(center)
        ;

      this.geoPath = d3Geo.geoPath().projection(geoProjection);
      var graticule = d3Geo.geoGraticule()
          .step([1, 1]);

      let group  = this.group.selectAll("g").data(this.mapData.features).enter().append("g");
      let states = group.append("path")
          .attr("d", this.geoPath)
          .attr("class", "feature")
          .on("click", (d:any) => {  alert("click pressed");
                                      // console.log(this);
                                     // this.group.selectAll("text").remove();
                                  } )
      ;   
      let texts = group.append("text")
                    .text( (d:any)=> d.properties.NAME_1 )
                    .attr("x", (d:any) => this.geoPath.centroid(d)[0]  )
                    .attr("y", (d:any) => this.geoPath.centroid(d)[1]  )
                    .style("text-anchor","middle")
                    .style("font-size","8px")
                    .style("stroke-width","0px")
                    .style("fill","black")
                    .style("font-family","Times New Roman")
                    ;

/*      this.group.append("path")
          .datum(graticule)
          .attr("class", "graticuleLine")
          .attr("d", this.geoPath);
      


      this.group.selectAll("path.feature")
                  .data(this.mapData.features)
                  .enter()
                  .append("path")
                    .attr("class", "feature")
                    .attr("d", this.geoPath)
                    .on("click", this.clickPath)
                    ;
      this.group.selectAll("path.feature")
                  .data(this.mapData.features)
                  .enter().append("text")
                    .text("test" )//(d:any)=> d.properties.NAME_1 )
                    .attr("x", (d:any) => { console.log(this.geoPath.centroid(d)[0] );
                                            return this.geoPath.centroid(d)[0] } )
                    .attr("y", (d:any) => this.geoPath.centroid(d)[1])
                    .style("text-anchor","middle")
                    .style("font-size","8px")
                    .style("stroke-width","0px")
                    .style("fill","black")
                    .style("font-family","Times New Roman")
                  // .on("click", this.clickText)
                  ; */

          console.log("d3.json: bounds = "+bounds);
          console.log("d3.json: bottomLeft = "+bottomLeft);
          console.log("d3.json: topRight = "+topRight);
          console.log("d3.json: center = "+center);
          console.log("d3.json: projection(center) = "+projection(center));
          console.log("d3.json: projection(bottomLeft) = "+projection(bottomLeft));
          console.log("d3.json: projection(topRight) = "+projection(topRight));
          console.log("d3.json: topRightPx = "+topRightPx);
          console.log("d3.json: bottomLeftPx = "+bottomLeftPx);
          console.log("d3.json: scaleFactor x axis = "+this.width/(topRightPx[0]-bottomLeftPx[0]));
          console.log("d3.json: scaleFactor y axis = "+this.height/(-topRightPx[1]+bottomLeftPx[1]));  
          console.log("d3.json: scaleFactor = "+scaleFactor);

  }

  private clickPath(d:any) {
    var x = this.width/2,
        y = this.height/2,
        k = 1,
        name = d.properties.NAME_1;

    //this.group    = d3.select("g");
    this.group.selectAll("text").remove();
    if ((this.focused === null) || !(this.focused === d)) {
      var centroid = this.geoPath.centroid(d),
          x = +centroid[0],
          y = +centroid[1],
          k = 1.75;
      this.focused = d;
      
      this.group.append("text")
        .text(name)
        .attr("x", x)
        .attr("y", y)
        .style("text-anchor","middle")
        .style("font-size","8px")
        .style("stroke-width","0px")
        .style("fill","black")
        .style("font-family","Times New Roman")
        .on("click", this.clickText);
    } else {
      this.focused = null;
    };

    this.group.selectAll("path")
        .classed("active", this.focused && function(d) { return d === this.focused; });
  
    this.group.transition()
        .duration(1000)
        .attr("transform", "translate("+ (this.width/2) +","+ (this.height/2) +")scale("+ k +")translate("+ (-x) +","+ (-y) +")")
        .style("stroke-width", 1.75/k +"px");
  }


  private clickText(d:any) {
    this.focused = null;
    this.group.selectAll("text")
        .remove();
    this.group.selectAll("path")
        .classed("active", 0);
    this.group.transition()
        .duration(1000)
        .attr("transform", "scale("+1+")translate("+0+","+0+")")
        .style("stroke-width", 1.00+"px");
  }

}
