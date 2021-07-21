import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';
import * as faker from 'faker'
import { select, Store } from '@ngrx/store';
import { AppState } from './store';
import * as PersonActions from './store/person.actions';
import * as fromPersonSelectors from './store/person.selectors'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(PersonActions.PERSON_ALL())
    //this.people$ = this.store.pipe(select('people'))
    this.people$ = this.store.select(fromPersonSelectors.selectAll);
    //this.store.select(selectPeopleCount).subscribe(n=>console.log(n))
  }

  people$: Observable<Person[]> = new Observable;
  addNew() {
    let person: Person = {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      age: Math.round(Math.random() * 100),
      _id: new Date().getMilliseconds().toString()
    };
    this.store.dispatch(PersonActions.PERSON_NEW({ payload: { person } }))
  }

  update(p: Person) {
    //Lembrando novamente, nao conseguimos alterar o objeto que está gravado,
    //  precisamos fazer uma cópa para podermos editar.
    let x = JSON.parse(JSON.stringify(p));
    x.name = faker.name.findName();
    x.address = faker.address.streetAddress();
    x.city = faker.address.city();
    x.country = faker.address.country();
    x.age = Math.round(Math.random() * 100);
    this.store.dispatch(PersonActions.PERSON_UPDATE({ payload: { id: p._id!, changes: x } }))
  }
  delete(p: Person) {
    this.store.dispatch(PersonActions.PERSON_DELETE({ payload: { id: p._id! } }))
  }
}
