import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/User';
import { ToastrService } from 'ngx-toastr';
import { GetDistrictIdService } from 'src/app/service/get-district-id.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser :User= {} as User;
  phonergx = new RegExp("^[0-9]{10}$")
  pinrgx=new RegExp("^[1-9][0-9]{5}$")
  test:string="ANY";

  vaccine: string[] = [
    "COVISHIELD","COVAXIN","SPUTNIK V","ANY"
  ];

  fee:boolean=false;
  dosageType:boolean=false;

  constructor(private toastr: ToastrService,private districtService :GetDistrictIdService) { }

  ngOnInit(): void {
  }
  
  onSubmit(newUser){
     
    if (!(this.phonergx.test(newUser.phoneNo) && newUser.userName && newUser.district_id && this.pinrgx.test(newUser.pincode) && newUser.age)) {
      this.toastr.warning("please check all the fields","in valid details",{
      timeOut: 500,
      });

    }else{

      if(this.dosageType){
        newUser.dosageType=1;
      }else{
        newUser.dosageType=2;

      }
      if(this.fee){
        newUser.fee="Paid";
      }else{
        newUser.fee="Free";
      }
      newUser.vaccine=this.test;

      newUser.district_id=this.districtService.getId(newUser.district_id);
      if( !newUser.district_id){
        this.toastr.warning("test","in valid district name",{
          timeOut: 1000,
          });
      }else{
      console.log(newUser);
      }
    }
  }
}
