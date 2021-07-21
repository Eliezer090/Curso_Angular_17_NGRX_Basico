
import { Person } from './../person';
import { createAction, props, union } from '@ngrx/store';

export const  PERSON_ALL = createAction('[PERSON_ALL] Get all people');
export const  PERSON_NEW = createAction('[PERSON_NEW] Add new person', props<{ payload: { person: Person } }>());
export const  PERSON_UPDATE = createAction('[PERSON_UPDATE] Update person', props<{ payload: { id: string , changes: Partial<Person> } }>());
export const  PERSON_DELETE = createAction('[PERSON_DELETE] Delete person', props<{ payload: { id: string } }>());


const actions = union({
  PERSON_ALL,
  PERSON_NEW,
  PERSON_UPDATE,
  PERSON_DELETE
});

export type PersonActions = typeof actions;
