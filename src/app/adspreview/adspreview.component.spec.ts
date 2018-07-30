import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdspreviewComponent } from './adspreview.component';

describe('AdspreviewComponent', () => {
  let component: AdspreviewComponent;
  let fixture: ComponentFixture<AdspreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdspreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdspreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
