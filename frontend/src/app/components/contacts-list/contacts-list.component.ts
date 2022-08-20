import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Contact } from "../../../shared/interfaces/contact.interface";
import { FormControl } from "@angular/forms";
import { ContactsService } from "../../services/contacts.service";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
})
export class ContactsListComponent implements OnInit {
  addContactMode = false;

  type = new FormControl("");
  value = new FormControl("")

  @Input() contacts: Contact[] = []
  @Input() personId = ''

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit(): void {
  }

  toggleAddContactMode() {
    this.type.setValue("")
    this.value.setValue("")
    this.addContactMode = !this.addContactMode;
  }

  createContact() {
    if (this.type.value && this.value.value) {
      this.contactsService.createContact(this.personId, {
        type: this.type.value,
        value: this.value.value
      }).subscribe({
          next: contract => {
            this.contacts.push(contract);
          },
          error: err => console.log(err),
          complete: () => {
            this.toggleAddContactMode()
          }
        }
      )
    }
  }

  deleteContact(id: string) {
    this.contactsService.deleteContact(id).subscribe({
        next: () => {
          this.contacts = this.contacts.filter(contact => contact.id !== id);
        },
        error: err => console.log(err),
      }
    )
  }

}
