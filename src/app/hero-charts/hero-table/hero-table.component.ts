import { RedComponentComponent } from './../red-component/red-component.component';
import { skills } from './../../shared/mock-skills';
import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid";

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.css']
})
export class HeroTableComponent implements OnInit {
  private gridOptions: GridOptions;
  private gridOptionsSkills: GridOptions;

  constructor() { 

      //table 1 
        this.gridOptions = {};
        this.gridOptions.columnDefs = [
            {
                headerName: "ID",
                field: "id",
                width: 100
            },
            {
                headerName: "Value",
                field: "value",
                cellRendererFramework: RedComponentComponent,
                width: 100
            },

        ];
        this.gridOptions.rowData = [
            {id: 5, value: 10},
            {id: 10, value: 15},
            {id: 15, value: 20}
        ]
        //*********************************************** 
        //Table 2
        //*********************************************** 
        this.gridOptionsSkills = {};
        this.gridOptionsSkills.columnDefs = [
            {
                headerName: "#",
                checkboxSelection: true,
                field: "primary",
                width: 20,
                suppressSorting: true,
                pinned : true

            },{
                headerName: "PR",
                field: "primary",
                width: 50,
                cellRenderer: this.prCellRenderer
            },
            {
                headerName: "NAME",
                field: "name",
                width: 150
            },
            {
                headerName: "EXP",
                field: "experience",
                cellRendererFramework: RedComponentComponent,
                width: 50
            },{
                headerName: "LEVEL",
                field: "level",
                width: 80
            },
            {
                headerName: "LYU",
                field: "lastYearUsed",
                width: 50
            }

        ];
        this.gridOptionsSkills.rowData = skills
  }

  ngOnInit() {
  }
  public onQuickFilterChanged($event) {
    this.gridOptionsSkills.api.setQuickFilter($event.target.value);
  }

  public prCellRenderer(params) {
    return (params.value == true)? "X": "N";
   // return value; // '<b>' + params.value.toUpperCase() + '</b>';
  }

  public doSomething($event) {
    var selectedRows = this.gridOptionsSkills.api.getSelectedRows();
   console.log("do something" + selectedRows);
  }

}
