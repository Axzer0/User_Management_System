import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {
  DEFAULT_LANGUAGE,
  MissingTranslationHandler,
  TranslateCompiler,
  TranslateLoader, TranslateModule,
  TranslateParser,
  TranslateService,
  TranslateStore, USE_DEFAULT_LANG, USE_EXTEND, USE_STORE
} from "@ngx-translate/core";

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponent],
    providers: [TranslateService,
      TranslateStore,
      TranslateLoader,
      TranslateCompiler,
      MissingTranslationHandler,
      TranslateParser,
      { provide: USE_STORE, useValue: {} },
      { provide: USE_EXTEND, useValue: {} },
      { provide: DEFAULT_LANGUAGE, useValue: {} },
      { provide: USE_DEFAULT_LANG, useValue: {} }]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  //
  // it(`should have as title 'User_Management_System'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('User_Management_System');
  // });
  //
  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('User_Management_System app is running!');
  // });
});
