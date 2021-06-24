import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
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
  private uri:string="http://localhost:8080/user/add";
  public err:number;


  constructor(private httpclient:HttpClient) { }

  SendData(user:User):Observable<any>{
    
     return this.httpclient.post<any>(this.uri,JSON.stringify(user), httpOptions)
     .pipe(
       catchError(this.handleError));
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
