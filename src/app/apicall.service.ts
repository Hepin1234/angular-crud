import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  

  constructor(private http:HttpClient) { }

  fetchData() {
    return this.http.get('http://exam.antimtechnologies.com/SelectUser.php')
  }
}
