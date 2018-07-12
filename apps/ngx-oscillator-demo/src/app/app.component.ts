import { Component } from '@angular/core';
import { OscillatorService, notes } from '@ngx-oscillator/ngx-oscillator';

@Component({
  selector: 'osc-demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  colors = [
    '#FEA47F',
    '#25CCF7',
    '#EAB543',
    '#55E6C1',
    '#CAD3C8',
    '#F97F51',
    '#1B9CFC',
    '#F8EFBA',
    '#58B19F',
    '#2C3A47',
    '#B33771'
  ];
  notesNames = Object.keys(notes);

  constructor(private _oscillatorService: OscillatorService) {}

  play(note: string, octave: number) {
    this._oscillatorService.playNote(notes[note], octave);
  }
}
