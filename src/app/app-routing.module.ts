import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SigninComponent} from "./auth/signin/signin.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {BookAddComponent} from "./book-add/book-add.component";
import {BookUpdateComponent} from "./book-update/book-update.component";
import {HeaderComponent} from "./header/header.component";
import {BooksComponent} from "./books/books.component";
import {GuardService} from "./guard.service";
import {BookDetailComponent} from "./book-detail/book-detail.component";

const routes: Routes = [
  {path: "signin", component: SigninComponent},
  {path: "signup", component: SignupComponent},
  {path: "books/bookadd", canActivate: [GuardService], component: BookAddComponent},
  //{path: "books/update", canActivate: [GuardService], component: BookUpdateComponent},
  {path: "books/update/:id", canActivate: [GuardService], component: BookUpdateComponent},
  {path: "books/view/:id", component: BookDetailComponent, canActivate: [GuardService]},
  {path: "books", canActivate: [GuardService] ,component: BooksComponent},
  {path: "", redirectTo: "books", pathMatch : "full"},
  {path: "**", redirectTo: "books"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
