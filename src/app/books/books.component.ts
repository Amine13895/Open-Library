import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../models/book";
import {Subscription} from "rxjs";
import {BookService} from "../book.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  books : Book[] = [] ;
  bookSubscribe : Subscription = new Subscription();


  constructor(private bookService: BookService,
              private router: Router) { }

  ngOnInit(): void {

    this.bookSubscribe = this.bookService.bookSubject.subscribe(
      (books: Book[]) => {
        this.books = books
      }
    );
    this.bookService.getBooks();
    this.bookService.emitBooks()
  }


  delete(b : Book) {
    this.bookService.removeBook(b);
  }

  onViewBook(id: number) {
   // console.log(id);


    this.router.navigate(['books', 'view', id])
  }

  ngOnDestroy(): void {
  this.bookSubscribe.unsubscribe();
  }

  onUpdate(id: number) {
    this.router.navigate(['books','update',id])
  }
}
