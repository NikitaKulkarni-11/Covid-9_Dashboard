import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { globaldatasummary } from 'src/app/models/globaldata';
import { DateWiseData } from 'src/app/models/date-wise-data';
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  data:globaldatasummary[];
countries:string[]=[];
@Input('totalconfirmed')
  totalconfirmed;
  @Input('totalrecovered')
  totalrecovered;
  @Input('totaldeaths')
  totaldeaths;
  @Input('totalactive')
  totalactive;
  dateWiseData;
  datatable=[];
  selectedCountrydata:DateWiseData[]
  chart={
    
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
  constructor(private service:DataServiceService  ) { }

  ngOnInit(): void {
    this.service.getdatewiseData().subscribe(result=>{
this.dateWiseData=result; 
this.updatechart();

    //console.log(result);
    })
    this.service.getGlobaldata().subscribe(result=>
      {
         this.data=result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country);

        })
      })
  }
  updatechart()
  {
    this.datatable.push(['cases','Date'])
    this.selectedCountrydata.forEach(cs=>{
      this.datatable.push([cs.cases,cs.date])
    })
  }
  update(country:string)
  { 
console.log(country);
this.data.forEach(cs=>{
  if(cs.country==country)
  {
    this.totalactive=cs.active;
    this.totalconfirmed=cs.confirmed;
    this.totalrecovered=cs.recovered;
    this.totaldeaths=cs.deaths;
  }
}) 

this.selectedCountrydata=this.dateWiseData[country];
console.log(this.selectedCountrydata);
this.updatechart();
  }  
  }


