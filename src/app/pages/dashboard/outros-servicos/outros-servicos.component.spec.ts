import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutrosServicosComponent } from './outros-servicos.component';

describe('OutrosServicosComponent', () => {
  let component: OutrosServicosComponent;
  let fixture: ComponentFixture<OutrosServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutrosServicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutrosServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
