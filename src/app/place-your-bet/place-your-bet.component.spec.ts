import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceYourBetComponent } from './place-your-bet.component';

describe('PlaceYourBetComponent', () => {
  let component: PlaceYourBetComponent;
  let fixture: ComponentFixture<PlaceYourBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceYourBetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceYourBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
