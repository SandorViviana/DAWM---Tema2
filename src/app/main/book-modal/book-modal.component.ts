import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../Interfaces/book';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { CustomValidators } from 'src/helpers/validators';
//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnInit {
  @Input() isVisible: boolean =false;
  @Input() bookData: Book | null = null;
  title:string="Add a new book"
  
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() addBook: EventEmitter<Book> = new EventEmitter<Book>();
  @Output() editBook: EventEmitter<Book> = new EventEmitter<Book>();
  bookForm!: FormGroup;


  constructor() {}

  ngOnInit() {
   
   this.initializeForm()
   if (this.bookData) {
   this.editEntry(this.bookData);
  }
  
  }
  initializeForm(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [
        Validators.required,
        CustomValidators.yearValidator,
      ]),
      edition: new FormControl(null, [Validators.required]),
      
    });
  }

  onOk(): void {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      const newBook: Book = {
        title: this.bookForm.get('title')?.value,
        author: this.bookForm.get('author')?.value,
        yearOfPublication: this.bookForm.get('year')?.value,
        publishingHouse: this.bookForm.get('edition')?.value,
      };
      if (this.bookData) {
        
        this.editBook.emit({ ...formData, id: this.bookData.title});
      } else {
        
        this.addBook.emit(newBook);
      }
      this.closeModal.emit(true);
      this.isVisible=false;
      this.initializeForm();
    } else {
      this.bookForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.closeModal.emit(true);
    this.isVisible=false;
  }


  submitForm() {
    if (this.bookForm.valid) {
      const newBook: Book = {
        title: this.bookForm.get('title')?.value,
        author: this.bookForm.get('author')?.value,
        yearOfPublication: this.bookForm.get('year')?.value,
        publishingHouse: this.bookForm.get('edition')?.value,
      };
      this.addBook.emit(newBook);
      this.closeModal.emit(true);     
    }
  }
  editEntry(entry: Book): void {
    this.isVisible = true; 
    this.title="Edit entry";
    this.bookForm.patchValue({
      title: entry.title,
      author: entry.author,
      year: entry.yearOfPublication,
      publishing: entry.publishingHouse
    });

   }
   get year(): FormControl {
    return this.bookForm.get('year') as FormControl;
  }
}
