import { Component, OnInit } from '@angular/core';
import { PeopleService } from "../services/people.service";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
})
export class PeopleComponent implements OnInit {

  constructor(public peopleService: PeopleService) { }

  ngOnInit(): void {

    this.peopleService.getPeople().subscribe({
      next: (response) => {
        this.peopleService.people = response
      },
      error: err => console.log(err)
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
