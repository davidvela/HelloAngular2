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


        this.gridOptionsSkills = {};
        this.gridOptionsSkills.columnDefs = [
            {
                headerName: "PR",
                field: "primary",
                width: 30
            },
            {
                headerName: "NAME",
                field: "name",
                width: 100
            },
            {
                headerName: "EXP",
                field: "experience",
                cellRendererFramework: RedComponentComponent,
                width: 60
            },{
                headerName: "LEVEL",
                field: "level",
                width: 60
            },
            {
                headerName: "LYU",
                field: "lastYearUsed",
                width: 60
            }

        ];
        this.gridOptionsSkills.rowData = skills
  }

  ngOnInit() {
  }

}
