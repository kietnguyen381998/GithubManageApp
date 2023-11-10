import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriesInfoComponent } from './repositories-info.component';

describe('RepositoriesInfoComponent', () => {
  let component: RepositoriesInfoComponent;
  let fixture: ComponentFixture<RepositoriesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepositoriesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
