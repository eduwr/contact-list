import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Hi there'`, () => {
    fixture.detectChanges();
    const app: HTMLElement = fixture.nativeElement;
    const h1 = app.querySelector('h1')!;
    expect(h1.textContent).toContain('Hi there!');
  });

  it('should render the get started link', () => {
    fixture.detectChanges();
    const app: HTMLElement = fixture.nativeElement;
    const a = app.querySelector('a')!;
    expect(a.textContent).toContain('Get Started');
    expect(a.href).toContain("/people")
  });
});
