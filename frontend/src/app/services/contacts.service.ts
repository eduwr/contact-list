import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Contact } from "../../shared/interfaces/contact.interface";
import { CreateContactDTO } from "../../shared/dto/CreateContactDTO";

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private personUrl = `${environment.apiBaseURL || 'http://localhost:8000'}/people`;
  private contactsUrl = `${environment.apiBaseURL || 'http://localhost:8000'}/contacts`

  private getUrlByPerson(personId: string) {
    return `${this.personUrl}/${personId}/contacts`
  }

  constructor(private httpClient: HttpClient) {}

  createContact(personId: string, createContactDTO: CreateContactDTO) {
    return this.httpClient.post<Contact>(
      this.getUrlByPerson(personId),
      createContactDTO
    );
  }

  deleteContact(id: string) {
    const endpoint = `${this.contactsUrl}/${id}`
    console.log(endpoint)
    return this.httpClient
      .delete<{ status: number }>(`${this.contactsUrl}/${id}`)
  }
}
