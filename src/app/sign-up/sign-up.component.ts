import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApicallService } from '../apicall.service';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  closeResult:string | undefined;
  // signupForm: FormGroup;
  userData: any[]=[] ;
  friends: any[] = [];

  editForm: FormGroup;
  editingUserId: number | null = null;
  modalForm: FormGroup;


  constructor(private fb: FormBuilder,private router: Router, private dataService: ApicallService,private modalService:NgbModal,private apiService:SignupService, private cdRef: ChangeDetectorRef) {
    this.modalForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      city: ['',Validators.required],
      gender: ['', Validators.required],
      image:['',Validators.required],
      phoneNumber:['',Validators.required],
      hobbies: [''],
      // private fb: FormBuilder,
      // private router: Router,
      // private dataService: ApicallService,
      // private modalService: NgbModal,
      // private apiService: SignupService
    },{
       Validators:[this.checkUserDataValidator.bind(this)]
    }
    );

    // Initialize the editForm with empty values
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      image: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      hobbies: ['']
    });
  }
  
  checkUserDataValidator(control: AbstractControl): ValidationErrors | null {
    const formData = control.value;

    if(this.checkRequiredFields(formData)){
    if (this.checkUserDataExists(formData)) {
      return { exists : true };
    }
  }
    return null;
  }


  checkRequiredFields(formData:any):boolean{
    return formData.username && formData.password && formData.email && formData.city && formData.gender && formData.phoneNumber;

  }

   checkUserDataExists(formData: any):boolean{
    return this.userData.some(user=>{
      return(
        user.Name === formData.username &&
        user['Phone Number'] === formData.phone &&
        user.city === formData.city &&
        user.Hobbies === formData.hobbies &&
        user.Password === formData.password

        );
    })
   }


  ngOnInit(): void {
    this.dataService.fetchData().subscribe((data:any)=>{
      this.userData=data.Select;
      console.log("data",data.Select)
    })

    const postData = {};

    this.apiService.getData(postData).subscribe(
      (response)=>{
        this.friends=response.Select;
        console.log(this.friends)
      }
)
}

deleteFriend(id:number){
     console.log('hii');
          const friendIndex = this.friends.findIndex(friend => friend.Id === id);

          if (friendIndex !== -1) {
            // Remove from the local array
            

            // Update the API here using your apiService
            // const friendToDelete = this.friends[friendIndex];
            this.friends.splice(friendIndex, 1);

            this.apiService.deleteFriend(id).subscribe(
              (      response: any) => {
                console.log('Friend deleted from API successfully:', response);
                // this.friends.splice(friendIndex, 1);
              },
              (      error: any) => {
                console.error('Error deleting friend from API:', error);
                // If deletion from the API fails, you might want to add the friend back to the array
                
              }
            );
          }
 }

 openEditModal(content: any, user: any) {
  console.log('openEditModal works')
  // Populate the editForm with the user's data
  this.editForm.patchValue({
    username: user.Name,
    password: user.Password,
    city: user.City,
    gender: user.Gender,
    image: user.Image,
    phoneNumber: user.PhoneNumber,
    hobbies: user.Hobbies
  });

  // Set the ID of the user being edited
  this.editingUserId = user.Id;

  // Open the modal
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
}

onSubmitEdit() {

  console.log('onSubmitEdit works')
  if (this.editForm.valid && this.editingUserId !== null) {
    // Get the edited user data from the form
    const editedUserData = this.editForm.value;

    // Update the user's data in the API using your apiService
    this.apiService.updateUser(this.editingUserId, editedUserData).subscribe(
      (response: any) => {
        console.log('User updated in API successfully:', response);

        // Close the edit modal
        this.modalService.dismissAll();

        // Refresh the list of users or update the specific user in your local data
        // You might want to reload the data here or update the specific user in your friends array
        const updatedUserIndex = this.friends.findIndex(friend => friend.Id === this.editingUserId);
        if (updatedUserIndex !== -1) {
          this.friends[updatedUserIndex] = { Id: this.editingUserId, ...editedUserData };
        }
      },
      (error: any) => {
        console.error('Error updating user in API:', error);
        // Handle the error appropriately
      }
    );
  }
}

addUser() {
  if (this.modalForm.valid) {
    const newUser = this.modalForm.value;

    // Send a POST request to create a new user using your SignupService
    this.apiService.createUser(newUser).subscribe(
      (response: any) => {
        console.log('User created in API successfully:', response);

        // Close the modal
        // this.modalService.dismissAll();
        this.modalForm.reset(); // Clear the form

        // After adding the user, you should refresh the data in your table
        // You can do this by fetching the updated data from the API
        this.apiService.getData({}).subscribe(
          (data: any) => {
            // Update the friends array with the new data
            console.log(newUser);
            
            this.friends = data.Select;
          }, 
          (error: any) => {
            console.error('Error fetching updated data from API:', error);
            // Handle the error appropriately
          }
        );
      },
      (error: any) => {
        console.error('Error creating user in API:', error);
        // Handle the error appropriately
      }
    );
  }
}

  signup(){
      console.log(this.modalForm.value.username, this.modalForm.value.phoneNumber)
      this.router.navigate(['login']);
    }
  onSubmit() {
    console.log(this.modalForm)
    if (this.modalForm.valid) {
      const formData = this.modalForm.value;
      const userDataExists = this.checkUserDataExists(formData);
      // Process the signup data
      console.log(formData);

      if(userDataExists){
           console.log('User already exists')
      }
      else{
        console.log(formData)
      }
    }
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'Save click') {
        this.addUser();
      }
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}










