import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulArticlesListComponentComponent } from './successful-articles-list-component.component';

describe('SuccessfulArticlesListComponentComponent', () => {
  let component: SuccessfulArticlesListComponentComponent;
  let fixture: ComponentFixture<SuccessfulArticlesListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulArticlesListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulArticlesListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
