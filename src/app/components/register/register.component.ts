import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { ToastrService } from 'ngx-toastr';
import { GetDistrictIdService } from 'src/app/service/get-district-id.service';
import { HttpClientService } from 'src/app/service/http-client.service';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  newUser :User= {} as User;
  response:User;

  phonergx = new RegExp("^[0-9]{10}$")
  pinrgx=new RegExp("^[1-9][0-9]{5}$")
  vaccine:string="ANY";

  vaccine1: string[] = [
    "COVISHIELD","COVAXIN","SPUTNIK V","ANY"
  ];

  fee:boolean=false;
  dosageType:boolean=false;

  constructor(private toastr: ToastrService,
    private districtService :GetDistrictIdService,
    private myhttp:HttpClientService,
    private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(form){
    

     const newUser1=form.value;

    if (!(this.phonergx.test(newUser1.phoneNo) && newUser1.userName && newUser1.district_id && this.pinrgx.test(newUser1.pincode) && newUser1.age)) {
      this.toastr.warning("please check all the fields","in valid details",{
      timeOut: 500,
      });

    }else{

      if(this.dosageType){
        newUser1.dosageType=1;
      }else{
        newUser1.dosageType=2;

      }
      if(this.fee){
        newUser1.fee="Paid";
      }else{
        newUser1.fee="Free";
      }
      // newUser.vaccine=this.vaccine;
      newUser1.phoneNo="+91" +newUser1.phoneNo;
      // console.log(newUser1.phoneNo)

      newUser1.district_id=this.districtService.getId(newUser1.district_id);
      if( !newUser1.district_id){
        this.toastr.warning("test","in valid district name",{
          timeOut: 1000,
          });
      }else{
      console.log(newUser1);

      this.myhttp.SendData(newUser1).subscribe(
        (user:any)=>{this.response=user;
        this.router.navigate(['/data'],{state:{user}});
        },
        (err)=>console.log(err.status));
     
      // form.reset();
      }
    }
  }
}
