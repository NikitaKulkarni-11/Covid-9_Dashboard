import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { globaldatasummary } from 'src/app/models/globaldata';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalconfirmed=0;
  totalactive=0;
  totaldeaths=0;
  totalrecovered=0;
datatable=[];
GlobalData:globaldatasummary[];

chart={
  PieChart:"PieChart",
  ColumnChart:"ColumnChart",
  LineChart:"LineChart",
  height:500,
  options:{
    
    animation:{
      duration:1000,
      easing:'out',
    },
    is3D:true
  }

}

  constructor(private dataservice:DataServiceService) { }

  initchart(caseType : string)
  {
    this.datatable=[];
  // this. datatable.push(["Country","Cases"])

    this.GlobalData.forEach(cs=>{
      let value:number;
      if(caseType == 'c')
      if(cs.confirmed > 2000)
   value=cs.confirmed
    
    if(caseType == 'r')
    if(cs.recovered > 2000)
     value=cs.recovered 
  
  if(caseType == 'd')
  if(cs.deaths > 1000)
  value=cs.deaths

if(caseType == 'a')
if(cs.active > 2000)
value=cs.active 

this.datatable.push([cs.country,value
])
})

console.log(this.datatable);
  
    
  }
  ngOnInit(): void {
    this.dataservice.getGlobaldata().subscribe(
      {
next: (result) =>{
  console.log(result);
  this.GlobalData=result;
  result.forEach(cs=>{
    if(!Number.isNaN(cs.confirmed))
    {
    this.totalconfirmed+=cs.confirmed;
    this.totalactive+=cs.active;
    this.totaldeaths+=cs.deaths;
    this.totalrecovered+=cs.recovered;
    }
  })
this.initchart('c');
}
      }
    )
      }
      updateChart(input:HTMLInputElement)
    {
console.log(input.value);
this.initchart(input.value);
    }  
    }

  
 

