import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  isSubmitted=false;
  authError=false;

  value : string[] = ['email', 'password'];

  constructor(private formBuilder : FormBuilder,
    private userService : UsersService,
    private localStorage : LocalStorageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
  }

  onSubmit(){
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.isSubmitted = true;

    this.userService.login(email, password).subscribe(
      (user:{token:string, user:string, isAdmin:boolean})=>{
        if(user === null){
          this.authError = true;
        }
        this.localStorage.setToken(user.token)
      }
    ), 
    ()=>{
      this.authError = true;
    }

  }
}
