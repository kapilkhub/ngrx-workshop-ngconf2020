import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";
import { BooksLoaded } from "src/app/books/actions/books-api.actions";
import { state } from "@angular/animations";

const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map((book) => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter((book) => bookId !== book.id);

export interface State {
  collection: BookModel[];
  activeBookId: string | null;
}

export const initialState: State = {
  collection: [],
  activeBookId: null,
};

export const booksReducer = createReducer(
  initialState,
  on(BooksPageActions.clearSelectBook, (state) => {
    console.log("reducer called")
    return {
      ...state,
      activeBookId: null,
    };
  }),
  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookId,
    };
  }),
  on(BooksApiActions.BooksLoaded, (state, action) => {
    return {
      ...state,
      collection: action.books,
    };
  }),
  on(BooksApiActions.BookDeleted, (state, action) => {
    return {
      ...state,
      collection: deleteBook(state.collection, action.bookId),
    };
  }),
  on(BooksApiActions.BookUpdated, (state, action) => {
    return {
      ...state,
      collection: updateBook(state.collection, action.book),
    };
  }),
  on(BooksApiActions.BookCreated, (state, action) => {
    return {
      ...state,
      collection: createBook(state.collection, action.book),
    };
  })
);

//to make aot happy
export function reducer(state: undefined | State, action: Action) {
  return booksReducer(state, action);
}

// getter selector to select each property of the state.

export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;

//complex slectors

export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (books, bookId) => {
    return books.find((book) => book.id == bookId);
  }
);  

export const selectEarningTotals = createSelector(selectAll, (books) => {
  return calculateBooksGrossEarnings(books)
});

//unoptimzed selector
export const selectActiveBook_unoptimized = (state: State) => {
  const books = selectAll(state);
  const activeBookId = selectActiveBookId(state);
  return books.find((book) => book.id == activeBookId);
};
