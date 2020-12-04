import { createAction, props } from "@ngrx/store";
import { BookModel } from "src/app/shared/models";

export const BooksLoaded = createAction(
  "[Books Page] Books Loaded Sucessful",
  props<{ books: BookModel[] }>()
);

export const BookCreated = createAction(
  "[Books Page] Book Created Sucessful",
  props<{ book: BookModel }>()
);

export const BookUpdated = createAction(
  "[Books Page] Book Updated Sucessful",
  props<{ book: BookModel }>()
);

export const BookDeleted = createAction(
  "[Books Page] Book Deleted Sucessful",
  props<{ bookId: string }>()
);
