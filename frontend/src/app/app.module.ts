import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonCardComponent } from './components/person-card/person-card.component';
import { AddPersonFormComponent } from './components/add-person-form/add-person-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PersonCardComponent,
    AddPersonFormComponent,
    ContactsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
