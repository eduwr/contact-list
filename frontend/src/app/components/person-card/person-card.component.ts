import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from "../../../shared/interfaces/person.interface";


@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
})
export class PersonCardComponent implements OnInit {
  @Input() person = { id: '', name: '', contacts: [] } as Person;
  @Output() onDelete = new EventEmitter<{id: string}>();

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.person)
  }

  emitDeleteEvent(id: string) {
    this.onDelete.emit({ id })
  }

  getPersonInitials(name: string) {
    return name
      .trim()
      .split(" ")
      .map(part => part.charAt(0))
      .join(" ");
  }


}
