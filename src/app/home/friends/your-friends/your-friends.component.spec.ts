import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourFriendsComponent } from './your-friends.component';

describe('YourFriendsComponent', () => {
  let component: YourFriendsComponent;
  let fixture: ComponentFixture<YourFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
