import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreationComponent } from './post-creation.component';

describe('PostCreationComponent', () => {
  let component: PostCreationComponent;
  let fixture: ComponentFixture<PostCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
