import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../models/book";
import {Subject} from "rxjs";
import firebase from "firebase";


@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = [];
  bookSubject = new Subject<Book[]>();

  emitBooks() {
    this.bookSubject.next(this.books)
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }


  getBooks() {
    firebase.database().ref('/books').on(
      'value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    )
  }


  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/'+id).once('value').then(
          (data) => {
            resolve(data.val());
            console.log(data.val())
          }, (error) => {
            reject(error);
            //console.log(error)
          }
        )
      }
    )
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks()
  }

  removeImg(url:string){
    const del = firebase.storage().refFromURL(url);
    del.delete().then(
      ()=>{ console.log("image has been deleted !")}
    ).catch(
      (error)=> {console.log("error !", error)}
    );
    this.emitBooks()
  }

  removeBook(book: Book) {
    if(book.img){
      const url = firebase.storage().refFromURL(book.img);
        url.delete().then(
          ()=>{ console.log("image has been deleted !")}
        ).catch(
          (error)=> {console.log("error !", error)}
        )
    }


    const bookIndex = this.books.findIndex(
      // @ts-ignore
      (bookEl) => {
        if (bookEl === book) {
          return true
        }

      }
    );
    this.books.splice(bookIndex, 1);
    this.saveBooks();
    this.emitBooks()
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const almostUniquefile = Date.now().toString();
        const upload = firebase.storage().ref().child(
          'images/' + almostUniquefile + file.name
        ).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=> {
          console.log("Upload ...")
          },
          (error)=> { console.log("error "+ error);
          reject()},
          ()=> {
          resolve(upload.snapshot.ref.getDownloadURL().then(
            function (downloadurl) {console.log("url at", downloadurl ); return downloadurl}
          ));
          }
        )
      }
    )
  }

  updateBookOld(id: number, name: string, author: string, img: string) {
    firebase.database().ref('books/' + id).set({
      name: name,
      author: author,
      img: img
    }).then(
      ()=> {console.log("S")},
      (error)=> {console.log("Error !!")}
    ) ;
  }

  updateBook(id: number, book: Book) {
    if(book.img){
    firebase.database().ref('books/' + id).set({
      name: book.name,
      author: book.author,
      img: book.img
    }).then(
      ()=> {console.log("S")},
      (error)=> {console.log("Error !!")}
    ) ;
  } else {
      firebase.database().ref('books/' + id).set({
        name: book.name,
        author: book.author,
         }).then(
        ()=> {console.log("S")},
        (error)=> {console.log("Error !!")}
      ) ;

    }
  }

  constructor(private http: HttpClient) {
  }


}
/*
  // --------------------------------------------------------------------------------
  addBook(book: Book){
    this.books.push(book);
    this.http.put("https://real-library-4fb9f-default-rtdb.firebaseio.com/books", this.books).subscribe(
      ()=>{
        console.log("success !")
      },
      (error => {console.log("error !", error)})
    )
  }

  getBook(){
    this.http.get<Book[]>("https://real-library-4fb9f-default-rtdb.firebaseio.com/books").subscribe(
      (resp)=>{
        this.books = resp
      },
      (error => console.log("error: ", error))
    )
  }

  getBookById(id: number){
    this.http.get<Book[]>("https://real-library-4fb9f-default-rtdb.firebaseio.com/books/"+id).subscribe(
      (resp)=>{
        this.books = resp
      },
      (error => console.log("error: ", error))
    )
  }

  deleteBook(id: number){
    this.http.delete("https://real-library-4fb9f-default-rtdb.firebaseio.com/books/"+id).subscribe(
      ()=>{
        console.log("deleted !")
      },
      (error => {console.log("error")})
    )
  }

  updateBook(id: number, book: Book){
    this.http.put("https://real-library-4fb9f-default-rtdb.firebaseio.com/books/"+id, book).subscribe(
      ()=>{
        console.log("updated !")
      },
      (error => {
        console.log("error")
      })
    )
  }
}
*/
