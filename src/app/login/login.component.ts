import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginapiService } from '../services/loginapi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // dataFromApi: {
  //   Login: any;
  //   Select: any[]; // This should be an array of user objects
  //   Error: any[];
  // } = {
  //   Select: [], Error: [],
  //   Login: undefined
  // };
  
  // userInput: any = {};
  // isDataLoaded: boolean = false;
  errorMsg: string = '';
  loginForm: FormGroup;
  phoneNumber = "";
  password = "";

  constructor(private apiService: LoginapiService, private router: Router,private formBuilder: FormBuilder, private http:HttpClient) {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
   }
  ngOnInit(): void {
  
  }


  onSubmit() {
    console.log(this.loginForm.value.phoneNumber)
    console.log(this.loginForm.value.password)
 

    if (this.loginForm.invalid) {
      return;
    }

    const formData  = this.loginForm.value;
    this.authenticateUser(formData);
  }

  authenticateUser(formData:any){
  this.apiService.login(formData).subscribe(
    (response)=>{
    console.log(response)
    if (response.username === formData.phoneNumber && response.password === formData.password) {
      this.router.navigate(['/home']);
    }
    else{
      this.errorMsg = 'Invalid login credentials. Please try again.';
    }
    }
  )
  }
}
