import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRentsComponent } from './agent-rents.component';

describe('AgentRentsComponent', () => {
  let component: AgentRentsComponent;
  let fixture: ComponentFixture<AgentRentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentRentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
