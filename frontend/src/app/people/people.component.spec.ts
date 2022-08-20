import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { createSpyFromClass, Spy } from "jasmine-auto-spies";
import { PeopleService } from "../services/people.service";

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let peopleService: Spy<PeopleService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent ],
      providers: [
        PeopleComponent,
        { provide: PeopleService, useValue: createSpyFromClass(PeopleService) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    peopleService = TestBed.inject<any>(PeopleService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'People List'`, () => {
    fixture.detectChanges();
    const app: HTMLElement = fixture.nativeElement;
    const h1 = app.querySelector('h1')!;
    expect(h1.textContent).toContain('People List');
  });
});
