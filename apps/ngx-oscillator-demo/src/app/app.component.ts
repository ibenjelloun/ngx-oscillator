import { Component } from '@angular/core';
import { OscillatorService, notes } from '@ngx-oscillator/ngx-oscillator';
import { Observable, merge, fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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
  mouseClicked = false;

  constructor(private _oscillatorService: OscillatorService) {
    document.addEventListener('mousedown', () => (this.mouseClicked = true));
    document.addEventListener('mouseup', () => (this.mouseClicked = false));
  }

  play(note: string, octave: number) {
    this._oscillatorService.playNote(notes[note], octave);
  }

  playIfClicked(note: string, octave: number) {
    if (this.mouseClicked) {
      this.play(note, octave);
    }
  }
}
