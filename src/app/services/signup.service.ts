import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SignupService {
  

  private  apiUrl='http://exam.antimtechnologies.com/SelectUser.php';
  private  api1Url='http://exam.antimtechnologies.com/SignUp.php';
  private  api2Url='http://exam.antimtechnologies.com/SelectUser.php';


  constructor(private http:HttpClient) {}
    getData(data:any): Observable<any> {
      return this.http.post<any>(this.apiUrl,data)
   }

   updateUser(userId: number, userData: any): Observable<any> {
    const url = `${this.api2Url}?userId=${userId}`;
    // Assuming a POST request to update user data
    return this.http.post(url, userData);
  }
  // adduser(newUser: any): Observable<any> {
  //   return this.http.post(`${this.api1Url}/users`, newUser);
  // }
  createUser(newUser: any) {
    const url = `http://exam.antimtechnologies.com/SignUp.php`;
    return this.http.post(`${this.apiUrl}/users`, newUser);
  }

   deleteFriend(friendId: number): Observable<any> {
    const url = `http://exam.antimtechnologies.com/Delete.php`;
    // Assuming DELETE method for friend deletion
    
    return this.http.delete(url);
   
   }
  }
