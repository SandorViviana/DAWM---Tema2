import { Component, OnInit } from '@angular/core';
import { BooksService } from '../Services/books.service';
import { Book } from '../Interfaces/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  listOfData:Book[]=[]
constructor(private bookService:BooksService, private route: ActivatedRoute,
  private router: Router, private modalService:NzModalService ) {
    this.route.queryParams.subscribe((res) => {
      console.log(res);
    });
  this.bookService.bookSubject.subscribe((res) => {
    this.listOfData = [...res];
    console.log('in subscribe ');
  });
}

showForm:boolean=false
showEditForm:boolean=false;
ngOnInit(): void {
  this.listOfData=this.bookService.books;
}
addBook() { this.showForm = true;}


addReceivedBook(event:any)
{
  if(event as Book !=null)
  {

    this.bookService.addNewBook(event);
    
  }
  
  
}



editEntry(entry: Book): void {
  this.showEditForm = true;
  const modal = this.modalService.create<BookModalComponent, { bookData: Book | null }, Book | null>({
    nzTitle: 'Edit entry',
    nzContent: BookModalComponent,
    nzComponentParams: {
      bookData: entry,
    },   
    nzMaskClosable: false,
    nzClosable: true,
  });
  modal.afterClose.subscribe((result: any) => {
    this.showEditForm = false;
    if (result) {     
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          bookTitle: entry.title,
        },
        queryParamsHandling: 'merge',
      });
    }
  });
}
}
