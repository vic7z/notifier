import { Injectable } from '@angular/core';
import district  from "src/app/district_id.json";

@Injectable({
  providedIn: 'root'
})
export class GetDistrictIdService {

  public countryList:{district_name:string, district_id:number}[] = district;

  constructor() { }

  public getData() :void{
      console.log(this.countryList)
  }

  getId(district_name: string): number {
    for(let obj of this.countryList) {
     if(obj.district_name.localeCompare(district_name,undefined,{ sensitivity: 'accent' })===0){
       console.log(obj.district_id)
       return obj.district_id;
     }
    }  
    
  }
}
