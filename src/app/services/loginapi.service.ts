import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginapiService {

  private url='http://exam.antimtechnologies.com/Login.php';
  constructor(private http:HttpClient) { }

  // getData(): Observable<any> {
  //   return this.http.get(this.url)
  // }

  login(data: { phoneNumber: string; password: string }): Observable<any> {
    return this.http.post(this.url, data)
  }
}

