import { Component, OnInit } from '@angular/core';
import { PeopleService } from "../services/people.service";
import { Person } from "../../shared/interfaces/person.interface";
import { CreatePersonDTO } from "../../shared/dto/CreatePersonDTO";


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];
  addPersonStep = 0;

  constructor(public peopleService: PeopleService) {
  }

  ngOnInit(): void {

    this.peopleService.getPeople().subscribe({
      next: (response) => {

        this.people = response
      },
      error: err => console.log(err)
    })
  }

  deletePerson({ id }: { id: string }) {
    this.peopleService.deletePerson(id).subscribe({
      next: () => {
        this.people = this.people.filter((person) => person.id !== id);
        console.log('DELETED PERSON WITH ID ' + id);
      },
      error: (e) => {
        console.log(e);
      },
    })
  }

  addPersonNextStep(step?: number) {
    if (typeof step !== "undefined") {
      this.addPersonStep = step;
      return;
    }
    this.addPersonStep++
  }

  createPerson(payload: CreatePersonDTO) {
    this.peopleService.createPerson(payload).subscribe({
      next: (response) => {
        this.people.push(response)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => this.addPersonNextStep(0)
    })
  }

  updatePerson(payload: Person) {
    this.peopleService.updatePerson(payload.id, {
      name: payload.name
    }).subscribe({
      next: response => {
        const index = this.people.findIndex(person => person.id === payload.id)
        this.people[index] = response;
      },
      error: err => {
        console.log(err)
      }

    })
  }


}
