import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/User';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  response:any;
  centerList:any[]=[];
  column=["name","address","block name","pincode","fee","session"];
  session_column=["date","avilable capacity","vaccine"];

  constructor(private router: Router) {
    this.response=this.router.getCurrentNavigation().extras.state.user;

    
    if(!this.response){
      console.log("no data")
    }else{
      this.centerList=this.response.availableCenters;
      console.log(this.centerList[0].sessions.vaccine)
    }

   }

  ngOnInit(): void {
  }

}
