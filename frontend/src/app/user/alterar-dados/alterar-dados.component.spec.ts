import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarDadosComponent } from './alterar-dados.component';

describe('AlterarDadosComponent', () => {
  let component: AlterarDadosComponent;
  let fixture: ComponentFixture<AlterarDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarDadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
