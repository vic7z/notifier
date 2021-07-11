import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,of, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators'; 
import { User } from '../User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'   
  })
};

 const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
  private uri:string="https://potato1.azurewebsites.net/user/add";
  private geturi:string="https://potato1.azurewebsites.net/user/get-center"
  private deluri:string="https://potato1.azurewebsites.net/user/delete"
  public err:number;
  

  constructor(private httpclient:HttpClient) { }

  SendData(user:User):Observable<any>{
    
     return this.httpclient.post<any>(this.uri,JSON.stringify(user), httpOptions)
     .pipe(
       catchError(this.handleError));
  }

  getCenters(userId:string){
    let params = new HttpParams().set("id",userId); 
    return this.httpclient.get<any>(this.geturi,{headers:headers,params:params});

  }
  deleteUser(userId:string){
    let params = new HttpParams().set("id",userId); 
    this.httpclient.delete<any>(this.deluri,{headers:headers,params:params})
    .subscribe(res=>console.log(res))

  }


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
     
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      if(error.status==400){
       this.err=400
      }
    }
    
    return throwError(
      'Something bad happened; please try again later.');
  }
}
