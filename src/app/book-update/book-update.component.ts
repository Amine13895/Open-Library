import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../book.service";
import {Book} from "../../models/book";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {

  // @ts-ignore
  book: Book;
  // @ts-ignore
  private id: number;
  formBook: FormGroup = new FormGroup({});
  fileUploaded = false;
  private fileUploading = false;
  // @ts-ignore
  currentURL: string;

  // @ts-ignore
  private fileUrl: string;
  // @ts-ignore
  private imageDeleted: boolean = false;
  // @ts-ignore
   change: boolean = true;


  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private bookService: BookService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.formBook = this.formBuilder.group({
        name: [""],
        author: [""],
        img: [""],

      }
    );


    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.id = id;

    this.book = new Book("", "");

    this.bookService.getSingleBook(id).then(
      // @ts-ignore
      (book: Book) => {
        this.book = book;
        //if(book.img){ this.book.img = book.img }
        console.log(this.book);
        if(this.book.img){
          // @ts-ignore
          //this.formBook.addControl('img');
        this.currentURL = this.book.img;
        console.log("current url is : ", this.currentURL);
        //this.formBook.setValue(this.book);

        } else {
          this.book.img = "";
          // @ts-ignore
          //this.formBook.get('img').patchValue("");
          //this.formBook.removeControl('img');
          // @ts-ignore
          //this.formBook.get('image').setValue([''])
        }

        this.formBook.setValue(this.book)

        //const name = this.book.name;
      },

      (error) => {
        console.log("error !")
      }
    );


    //console.log(this.book);
  }

  //private intiForm()


  onSubmit() {
    // @ts-ignore
    const name = this.formBook.get('name').value;
    // @ts-ignore
    const author = this.formBook.get('author').value;

    if(this.book.name === name && this.book.author === author && !this.fileUploaded && !this.imageDeleted){
      this.change = false;
      // in the template add message
    }

    else{
    const ubook = new Book(name, author);
    if (this.fileUploaded && this.fileUrl !== ''){
     ubook.img = this.fileUrl;
      //ubook.img = this.currentURL;
     /* else{
      if (!this.imageDeleted){
        ubook.img = this.currentURL
      } */
    }


    this.bookService.updateBook(this.id, ubook);
      this.router.navigate(['books'])
    }



    //if(this.fileUploaded && this.fileUrl !== ''){
//    this.bookService.updateBook(this.id, name, author, this.fileUrl);
    //} else {


    // if (this.currentURL !== this.fileUrl) {
     // this.bookService.removeImg(this.currentURL)
    //}
  }

  upload(file: File) {
    this.fileUploading = true;
    this.bookService.uploadFile(file).then(
      (url) => {
        if (typeof url === "string") {
          this.fileUrl = url;
          //this.currentURL = url;
        }
        console.log("url in book update", url);
        this.fileUploading = false;
        this.fileUploaded = true;
        this.book.img = this.fileUrl;
      }
    )
  }

  // @ts-ignore
  detectUpload(event) {
    this.upload(event.target.files[0]);
  }


  deleteImg() {
    this.bookService.removeImg(this.currentURL);
    this.imageDeleted = true;
    this.book.img = "";
  }
}

