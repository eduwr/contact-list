import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Person } from "../../shared/interfaces/person.interface";
import { CreatePersonDTO } from "../../shared/dto/CreatePersonDTO";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private url = 'http://localhost:8000/people';

  constructor(private httpClient: HttpClient) {
  }

  getPeople() {
    return this.httpClient.get<Person[]>(this.url);
  }

  getPersonById(id: string) {
    return this.httpClient.get<Person>(`${this.url}/${id}`);
  }

  createPerson(createPersonDTO: CreatePersonDTO) {
    return this.httpClient.post<Person>(this.url, createPersonDTO);
  }

  updatePerson(id: string, updatePersonDTO: Partial<CreatePersonDTO>) {
    return this.httpClient.patch<Person>(`${this.url}/${id}`, updatePersonDTO);
  }

  deletePerson(id: string) {
    return this.httpClient.delete<{ status: number }>(`${this.url}/${id}`);
  }
}
