import { TestBed } from '@angular/core/testing';

import { PeopleService } from './people.service';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClient } from "@angular/common/http";
import { CreatePersonDTO } from "../../shared/dto/CreatePersonDTO";

describe('PeopleService', () => {
  let service: PeopleService;
  let httpSpy: Spy<HttpClient>;
  let fakePeople: any[] = [
    {
      id: "fbe71d5d-a7c5-48e7-90ce-022803e58fef",
      name: "test3",
      contacts: [
        {
          id: "b9faaa16-3e06-4369-aff8-ead9bb34aed3",
          type: "whatsapp",
          value: "4561234"
        },
        {
          id: "f91988ea-22ff-4472-9b29-b1ac859a8a27",
          type: "email",
          value: "naruto2@konoha.com"
        }
      ]
    },
    {
      id: "8a33f23a-13f0-4c3c-bf0f-fa924af7e154",
      name: "test",
      contacts: []
    },
    {
      id: "1b580e92-2193-4ee6-88a2-25dca6ced7cc",
      name: "test2",
      contacts: []
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        PeopleService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    service = TestBed.inject(PeopleService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe("getPeople()", () => {
    it('should be created', () => {
      expect(service.getPeople).toBeTruthy();
    });

    it('should return an expected list of people', (done: DoneFn) => {
      httpSpy.get.and.nextWith(fakePeople);

      service.getPeople().subscribe({
        next: (people) => {
          expect(people).toHaveSize(fakePeople.length);
          done();
        },
        error: done.fail
      });
      expect(httpSpy.get.calls.count()).toBe(1);
    });
  })

  describe("getPersonById()", () => {
    it('should be created', () => {
      expect(service.createPerson).toBeTruthy();
    });

    it('should return the new person', (done: DoneFn) => {
      httpSpy.get.and.nextWith(fakePeople[0]);

      service.getPersonById(fakePeople[0].id).subscribe({
        next: (person) => {
          expect(person.id).toMatch(fakePeople[0].id)
          expect(person.name).toMatch(fakePeople[0].name)
          expect(person.contacts).toHaveSize(fakePeople[0].contacts.length)
          done();
        },
        error: done.fail
      });
      expect(httpSpy.get.calls.count()).toBe(1);
    });
  })

  describe("createPerson()", () => {
    it('should be created', () => {
      expect(service.getPersonById).toBeTruthy();
    });

    it('should return the expected person', (done: DoneFn) => {
      httpSpy.post.and.nextWith(fakePeople[0]);

      const createPersonDTO: CreatePersonDTO = {
        name: fakePeople[0].name,
        contacts: fakePeople[0].contacts
      }
      service.createPerson(createPersonDTO).subscribe({
        next: (person) => {
          expect(person.id).toMatch(fakePeople[0].id)
          expect(person.name).toMatch(fakePeople[0].name)
          expect(person.contacts).toHaveSize(fakePeople[0].contacts.length)
          done();
        },
        error: done.fail
      });
      expect(httpSpy.post.calls.count()).toBe(1);
    });
  })


  describe("updatePerson()", () => {
    it('should be created', () => {
      expect(service.updatePerson).toBeTruthy();
    });

    it('should return the updated person', (done: DoneFn) => {
      httpSpy.patch.and.nextWith(fakePeople[0]);

      const updatePersonDTO: Partial<CreatePersonDTO> = {
        name: fakePeople[0].name,
      }
      service.updatePerson(fakePeople[0].id, updatePersonDTO).subscribe({
        next: (person) => {
          expect(person.id).toMatch(fakePeople[0].id)
          expect(person.name).toMatch(fakePeople[0].name)
          expect(person.contacts).toHaveSize(fakePeople[0].contacts.length)
          done();
        },
        error: done.fail
      });
      expect(httpSpy.patch.calls.count()).toBe(1);
    });
  })


});
