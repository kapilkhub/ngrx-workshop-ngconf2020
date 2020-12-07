import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import { create } from "domain";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";

export interface State {
  books: fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer,
};

//getter selector
export const selectBooksState = (state: State) => state.books;

export const selectActiveBook_unoptimized = (state: State) => {
  const booksState = selectBooksState(state);
  return fromBooks.selectActiveBook(booksState);
};

export const selectActiveBook_v1 = createSelector(
  selectBooksState,
  (bookSate) => fromBooks.selectActiveBook(bookSate)
);

export const selectActiveBook = createSelector(
  selectBooksState,
  fromBooks.selectActiveBook
);

export const selectAllBooks = createSelector(
    selectBooksState,
    fromBooks.selectAll
)

export const selectBooksEarningTotals = createSelector(
    selectBooksState,
    fromBooks.selectEarningTotals
)

export const metaReducers: MetaReducer<State>[] = [];
