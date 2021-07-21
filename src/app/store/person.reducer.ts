import { Person } from './../person';
import { state } from '@angular/animations';
import { PersonActions, PERSON_ALL, PERSON_DELETE, PERSON_NEW, PERSON_UPDATE } from './person.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface PeopleState extends EntityState<Person> {

}

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>({
  selectId: (p: Person) => p._id!
});

export const initialState: PeopleState = peopleAdapter.getInitialState({});

export function reducer(state = initialState, action: PersonActions) {
  switch (action.type) {

    case PERSON_DELETE.type: {
      return peopleAdapter.removeOne(action.payload.id, state);
    }
    case PERSON_UPDATE.type: {
      return peopleAdapter.updateOne({ id: action.payload.id, changes: action.payload.changes }, state);
    }
    case PERSON_NEW.type: {
      return peopleAdapter.addOne(action.payload.person, state);
    }
    default: {
      return state;
    }
  }
}



/**

OLD VERSION SEM O ENTITY

export const initialState: Person[] = [];
Atençao
  Nós nao podemos alterar o objeto state  ele é imutavel
  Para cada Component (Person,product,auth...), deve ser gerado um reducer novo,
    ou seja cada component ou conjunto de funcionalidades que dependem da mesma interface
    podem ser utilizado o mesmo reducer agora se mudar a interface, precisamos criar outro reducer.


export function reducer(state = initialState, action: PersonActions) {
  switch (action.type) {
    case PERSON_ALL.type: {
      return state;
    }
    case PERSON_DELETE.type: {
      return state.filter(p => p._id != action.payload.id)
    }
    case PERSON_UPDATE.type: {
      //fazendo uma copia
      let people = state.slice();
      let i = people.findIndex(p => p._id == action.payload.person._id);
      if (i >= 0)
        people[i] = action.payload.person;
      return people;
    }
    case PERSON_NEW.type: {
      return state.concat([action.payload.person])
    }
    default: {
      return state;
    }
  }
} */
