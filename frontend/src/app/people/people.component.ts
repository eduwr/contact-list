import { Component, OnInit } from '@angular/core';
import { PeopleService } from "../services/people.service";
import { Person } from "../../shared/interfaces/person.interface";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];

  constructor(public peopleService: PeopleService) {
  }

  ngOnInit(): void {

    this.peopleService.getPeople().subscribe({
      next: (response) => {

        this.people = response
        console.log("HERE", response, this.people)
      },
      error: err => console.log(err)
    })
  }

  deletePerson({ id }: {id: string}) {
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

  getPersonInitials(name: string) {
    return name
      .trim()
      .split(" ")
      .map(part => part.charAt(0))
      .join(" ");
  }

}
