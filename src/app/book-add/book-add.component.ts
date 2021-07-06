import { Component, OnInit } from '@angular/core';
import {BookService} from "../book.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../models/book";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {

  formBook : FormGroup = new FormGroup({});
  fileUploading = false;
  fileUploaded = false;
  fileUrl  = "";

  constructor(private bookService: BookService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.intiForm();
  }

  private intiForm() {
    this.formBook = this.formBuilder.group({
      name : ['', Validators.required],
      author : ['', Validators.required],
      //image : ['']
    }
    )
  }

  onSubmit(){
    // @ts-ignore
    const name = this.formBook.get('name').value;
    // @ts-ignore
    const author = this.formBook.get('author').value;
    // @ts-ignore
    //const image = this.formBook.get('image').value;

    const newBook = new Book(name, author);

    if(this.fileUploaded && this.fileUrl !== ''){
    newBook.img = this.fileUrl;
    }

    this.bookService.createNewBook(newBook);

    this.router.navigate(['books'])
  }

  upload(file: File){
    this.fileUploading = true;
    this.bookService.uploadFile(file).then(
      (url ) => {
        if (typeof url === "string") {
          this.fileUrl = url;
        }
        console.log("url in book add", url);
        this.fileUploading = false;
        this.fileUploaded = true
      }
    )
  }

  // @ts-ignore
  detectUpload(event) {
    this.upload(event.target.files[0]);
  }
}

