import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm!:FormGroup;
  isSubmitted=false;
  authError=false;

  constructor(private formBuilder : FormBuilder,
    private authService : UsersService,
    private router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signupForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  onSubmit(){
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;
    //register as non-admin
    const isAdmin = false;

    this.isSubmitted = true;

    this.authService.signup(email, password,isAdmin).subscribe(
      (user:User)=>{
        this.router.navigate(['/users/login'])
      }
    ), 
    (error: boolean)=>{
      this.authError = error;
    }

  }

}
