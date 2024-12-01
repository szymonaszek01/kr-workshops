import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [NgFor, MatCardModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  booksSub!: Subscription;

  books: Book[];

  constructor(private bookService: BookService) {
    this.books = [];
  }

  ngOnInit(): void {
    this.booksSub = this.bookService.getAll().subscribe({
      next: (books) => (this.books = books),
      error: (error) => console.error(error),
    });
  }

  ngOnDestroy(): void {
    this.booksSub.unsubscribe();
  }
}
