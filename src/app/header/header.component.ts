import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import firebase from "firebase";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user){ this.isAuth = true}
        else {this.isAuth = false}
      }
    )
  }


  signOut() {
    this.auth.signOut();
  }
}
