import { Component, OnInit } from '@angular/core';
import {BookService} from "../book.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../models/book";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book : Book = new Book("","");

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

   /* this.bookService.getSingleBook(+0).then(
      (book: Book )=> {
        this.book = book
      }
    ); */
    //console.log("book on comp ", this.book);

    this.book = new Book('','');

    const id = this.route.snapshot.params['id'];
    //console.log("id in detail ", id);
    //console.log("id form ");



    this.bookService.getSingleBook(+id).then(
      // @ts-ignore
      (data : Book) => {
        this.book = data;
        //console.log("in comp ", data);
        //console.log("book in comp ",this.book);
      }
    );
    //console.log(this.book);
  }

  onBack() {
    this.router.navigate(['/books'])
   }
}
