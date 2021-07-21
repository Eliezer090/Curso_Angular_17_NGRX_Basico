import { createFeatureSelector } from '@ngrx/store'
import * as fromPersonReducer from './person.reducer'

//essa string 'people' vem do index.ts: people: fromPersonReducer.PeopleState;
export const peopleState = createFeatureSelector<fromPersonReducer.PeopleState>('people');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = fromPersonReducer.peopleAdapter.getSelectors(peopleState);
