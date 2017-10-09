import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllprofileComponent } from './allprofile.component';

describe('AllprofileComponent', () => {
  let component: AllprofileComponent;
  let fixture: ComponentFixture<AllprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
