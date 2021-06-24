import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/User';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  response:User;

  constructor(private router: Router) {
    // console.log(this.router.getCurrentNavigation().extras.state.user);
    this.response=this.router.getCurrentNavigation().extras.state.user;
    console.log(this.response)
   }

  ngOnInit(): void {
  }

}
