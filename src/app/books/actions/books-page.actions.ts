import { createAction, props } from "@ngrx/store";
import { BookRequiredProps } from "src/app/shared/models";


export const enter = createAction('[Books page] Enter')

export const selectBook =createAction(
    '[Books page] Select a book',
    props<{bookId : string}>()
)

export const clearSelectBook =createAction(
    '[Books page] clear Select a book'
)

export const createBook = createAction(
    '[Books page] Create a book',
    props<{book : BookRequiredProps}>()
)

export const updateBook = createAction(
    '[Books page] Update a book',
    props<{bookId :string; changes: BookRequiredProps}>()
)

export const deleteBook = createAction(
    '[Books page] Delete a book',
    props<{bookId :string}>()
)

