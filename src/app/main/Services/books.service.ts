import { Injectable } from '@angular/core';
import booksdata from './books.json'
import { Subject } from 'rxjs/internal/Subject';
import { Book } from '../Interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  bookList:Book[]=booksdata;
  bookSubject=new Subject<Book[]>();
  constructor() { }

  get books()
  {
    return this.bookList;
  }
  set books(BooksToSet:Book[])
  {
    this.bookList=BooksToSet;
    this.bookSubject.next(BooksToSet);
  }

  addNewBook(newBook:Book) {
    this.bookList.push(newBook);
    this.bookSubject.next(this.bookList);
  }
}