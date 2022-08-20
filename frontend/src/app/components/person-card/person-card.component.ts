import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from "../../../shared/interfaces/person.interface";
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
})
export class PersonCardComponent implements OnInit {
  @Input() person = { id: '', name: '', contacts: [] } as Person;
  @Output() onDelete = new EventEmitter<{id: string}>();
  @Output() onUpdatePerson = new EventEmitter<Person>();
  personEditMode = false;
  name = new FormControl('');

  ngOnInit(): void {
    this.name.setValue(this.person.name);
  }

  togglePersonEditMode() {
    this.personEditMode = !this.personEditMode
  }

  emitDeleteEvent(id: string) {
    this.onDelete.emit({ id })
  }

  getPersonInitials(name: string) {
    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map(part => part.charAt(0))
      .join(" ");
  }

  cancelEditPersonName() {
    this.name.setValue(this.person.name)
    this.togglePersonEditMode()
  }

  updatePersonName () {
    if(this.name.value) {
      this.onUpdatePerson.emit({
        ...this.person,
        name: this.name.value
      })
    }

  }
}
