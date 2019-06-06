import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPlaceholderComponent } from './friends-placeholder.component';

describe('FriendsPlaceholderComponent', () => {
  let component: FriendsPlaceholderComponent;
  let fixture: ComponentFixture<FriendsPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
