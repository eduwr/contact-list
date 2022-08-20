import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from "@angular/forms";
import { CreateContactDTO } from "../../../shared/dto/CreateContactDTO";
import { CreatePersonDTO } from "../../../shared/dto/CreatePersonDTO";


@Component({
  selector: 'app-add-person-form',
  templateUrl: './add-person-form.component.html',
})
export class AddPersonFormComponent {
  @Input() addPersonStep = 0;
  @Output() onNextStep = new EventEmitter<undefined>();
  @Output() onSubmit = new EventEmitter<CreatePersonDTO>();
  @Output() onClose = new EventEmitter<undefined>();

  INITIAL_STATE = {
    name: '',
    contacts: [],
    showContactsMode: true
  }

  name = new FormControl(this.INITIAL_STATE.name);
  tempContactType = new FormControl('');
  tempContactValue = new FormControl('');

  contacts = this.INITIAL_STATE.contacts as CreateContactDTO[]
  showContactsMode = true;

  clearState() {
    this.name.setValue(this.INITIAL_STATE.name);
    this.tempContactValue.setValue("");
    this.tempContactType.setValue("");
    this.contacts = [];
  }

  submit() {
    if (this.name.value && this.name.valid) {
      this.onSubmit.emit({
        name: this.name.value,
        contacts: this.contacts
      })
    }
  }

  goToAddContacts() {
    if (this.addPersonStep === 1 && this.name.valid) {
      this.onNextStep.emit()
    }
  }

  close() {
    this.clearState()
    this.onClose.emit()
  }

  toggleContactsMode() {
    this.showContactsMode = !this.showContactsMode
  }

  saveContact() {
    if (this.tempContactValue.value && this.tempContactType.value) {
      this.contacts.push({
        value: this.tempContactValue.value,
        type: this.tempContactType.value
      })

      this.toggleContactsMode()
    }
  }

  deleteContact(index: number) {
    this.contacts = this.contacts.filter((contact, idx) => idx !== index)
  }
}
