import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClientService } from 'src/app/service/http-client.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  response:any;
  centerList:any[]=[];
  responseData:boolean=false;
  paramId:string=null;
  

  column=["name","address","block name","pincode","fee","session"];
  session_column=["date","avilable capacity","vaccine"];
  centerList1: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private myhttp:HttpClientService) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.paramId = params['id'];
  
  });
  
    if(this.paramId){
      console.log(this.paramId);
     this.myhttp.getCenters(this.paramId).subscribe(response=>{
       console.log(response);
       this.centerList1=response
       this.update()
     });
     console.log(this.centerList1)
   
    }else{

    this.response=this.router.getCurrentNavigation().extras.state.user;
    console.log(this.response)
    console.log(this.response.availableCenters.length)

    if(!this.response.availableCenters || this.response.availableCenters.length==0 ){
      console.log("no data")
    }else{
      this.centerList=this.response.availableCenters;
      this.responseData=true;
    }
  }

   }

  update() {
    if(!this.centerList1 || this.centerList1.length==0){
      console.log("no data")
    }else{
      this.centerList=this.centerList1;
      this.responseData=true;
    }
  
  }

  unSub(){
    if(this.paramId){
        console.log(this.paramId)
        this.myhttp.deleteUser(this.paramId);
        this.router.navigate(["/bye"]);
    }else{
      console.log(this.response.id)
      this.myhttp.deleteUser(this.response.id);
      this.router.navigate(["/bye"]);
    }
  }

  ngOnInit(): void {
  }
  

}
