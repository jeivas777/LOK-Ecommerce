import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentItensComponent } from './content-itens.component';

describe('ContentItensComponent', () => {
  let component: ContentItensComponent;
  let fixture: ComponentFixture<ContentItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
