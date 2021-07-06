import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

//  signInForm : FormGroup;
  error : string = "";
  public signInForm: FormGroup = new FormGroup({}) ;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signInForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required /*, Validators.pattern(/{0-9a-zA-Z}{6}/)*/]]
      }
    )
  }

  onSubmit(){

    // @ts-ignore
    const email = this.signInForm.get('email').value;

    // @ts-ignore
    const password = this.signInForm.get('password').value;

    this.auth.signIn(email, password).then(
      ()=> {
        this.router.navigate(['books'])
      },
      (error)=>{
        this.error = error
      }
    );
  }
}
