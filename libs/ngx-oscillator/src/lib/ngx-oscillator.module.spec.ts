import { async, TestBed } from '@angular/core/testing';
import { NgxOscillatorModule } from './ngx-oscillator.module';

describe('NgxOscillatorModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [NgxOscillatorModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(NgxOscillatorModule).toBeDefined();
  });
});
