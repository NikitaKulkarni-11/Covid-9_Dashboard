import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { globaldatasummary } from '../models/globaldata';
import { DateWiseData } from '../models/date-wise-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private baseURL='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';  
  private globaldataurl= '';
private DatewisedataUrl='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
private extension=".csv";
month
date;
year;
getDate(date:number)
{
if(date<10){
return '0'+date;
}
return date;
}
  constructor(private http:HttpClient) {
    let now=new Date();
    this.month=now.getMonth()+1;
    this.year=now.getFullYear();
     this.date=now.getDate();
     console.log({date:this.date,month:this.month,year:this.year});
     this.globaldataurl=`${this.baseURL}${this.getDate(this.month)}-${this.getDate(this.date)}-${this.year}${this.extension}`;
  } 
    getdatewiseData()
    {
      return this.http.get(this.DatewisedataUrl,{responseType:'text'})
      .pipe(map(result=>{
        
        let rows=result.split('\n');
        console.log(rows);
          let maindata={};
        let header=rows[0];
        
         
        let dates=header.split(/,(?=\S)/);
        dates.splice(0,4);
        rows.splice(0,1);
        rows.forEach(row=>{
          let cols=row.split(/,(?=\S)/);
          let cont=cols[1];
          cols.splice(0,4);
          console.log(cont,cols);
          maindata[cont]=[]; 
          cols.forEach((val,index)=>{
            let dw:DateWiseData={
              cases:+val,
              country:cont,
                 date:new Date(Date.parse(dates[index]))
            }
maindata[cont].push(dw);
          

          })
        })
        console.log(maindata);
      return maindata;
      }))
    }
  getGlobaldata()
  {
return this.http.get(this.globaldataurl,{responseType:'text'}).pipe(
  map(result=>{
    let data:globaldatasummary[]=[];
    let raw={};
    let  rows=result.split('\n'); 
    rows.splice(0,1);
  
    //console.log(rows);
    rows.forEach(rows=>{
      let cols=rows.split(/,(?=\S)/);
      let cs={
        country:cols[3],
        confirmed :+cols[7],
        deaths :+cols[8],
        recovered :+cols[9],
        active :+cols[10],

      };
      let temp:globaldatasummary=raw[cs.country];
      if(temp){

        temp.active=cs.active+temp.active;
        temp.confirmed=cs.confirmed+temp.confirmed;
        temp.deaths=cs.deaths+temp.deaths;
        temp.recovered=cs.recovered+temp.recovered;

      
raw[cs.country]=temp;
      }else{
        raw[cs.country]=cs;
      }
    })
    
    return <globaldatasummary[]>Object.values(raw);
    
  }),
  catchError((error:HttpErrorResponse)=>{
 
  
if(error.status==404){ 
  this.date=this.date-1;
  this.globaldataurl=`${this.baseURL}${this.getDate(this.month)}-${this.getDate(this.date)}-${this.year}${this.extension}`;
     console.log(this.globaldataurl);
     console.log(this.globaldataurl);
     return this.getGlobaldata();

}
  })
)
  

  

  }
}


