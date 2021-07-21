import { Action, ActionReducerMap, createSelector } from '@ngrx/store';
import { Person } from './../person';
import * as fromPersonReducer from './person.reducer';


export interface AppState {
  people: fromPersonReducer.PeopleState;
}

export const appReducers: ActionReducerMap<AppState,any> = {
  people: fromPersonReducer.reducer
}


//OLDS VERSIONS
//export const selectPeople = (state: AppState) => state.people;

//export const selectPeopleCount = createSelector(selectPeople,(people)=> people.length);

//export const selectPeopleCount2 = createSelector(selectPeopleCount,(n)=> n+1);
