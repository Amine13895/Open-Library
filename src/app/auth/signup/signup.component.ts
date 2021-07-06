import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm : FormGroup = new FormGroup({}) ;
  error : string = "";

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.signUpForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required /*, Validators.pattern(/{0-9a-zA-Z}{6}/)*/]]
      }
    )
  }

  onSubmit(){

    // @ts-ignore
    const email = this.signUpForm.get('email').value;

    // @ts-ignore
    const password = this.signUpForm.get('password').value;

    this.auth.signUp(email, password).then(
      ()=> {
        this.router.navigate(['books'])
      },
      (error)=>{
        this.error = error
      }
    );
  }
}
