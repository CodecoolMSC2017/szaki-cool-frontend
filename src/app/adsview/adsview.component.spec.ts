import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsviewComponent } from './adsview.component';

describe('AdsviewComponent', () => {
  let component: AdsviewComponent;
  let fixture: ComponentFixture<AdsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
