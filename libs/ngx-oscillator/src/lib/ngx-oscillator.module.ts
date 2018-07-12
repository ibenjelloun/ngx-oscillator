import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OscillatorService } from './services/oscillator.service';
@NgModule({
  imports: [CommonModule],
  providers: [OscillatorService]
})
export class NgxOscillatorModule {}
