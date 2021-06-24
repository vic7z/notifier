import { Injectable } from '@angular/core';
import { User } from '../User';

@Injectable({
  providedIn: 'root'
})

export class ShareServiceService {
public response:User;
  constructor() { }

  public setUser(user:User):void{
      this.response=user;
  }
  public getUser():User{
    return this.response;
  }

}
