import { Component } from '@angular/core';
import  firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: any;

  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyC7KU1me3x3JqEVfM9zYrlXDqBDX-VtMaM",
      authDomain: "real-library-4fb9f.firebaseapp.com",
      databaseURL: "https://real-library-4fb9f-default-rtdb.firebaseio.com",
      projectId: "real-library-4fb9f",
      storageBucket: "real-library-4fb9f.appspot.com",
      messagingSenderId: "363416477921",
      appId: "1:363416477921:web:5b7e23bfe043613d1157a0",
      measurementId: "G-SGJGG5WM6N"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

  }

}
