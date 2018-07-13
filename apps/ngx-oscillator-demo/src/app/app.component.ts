import { Component } from '@angular/core';
import { OscillatorService, scales, notes } from 'ngx-oscillator';

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
    '#58B19F'
  ];

  currentNotes: any;
  notesNames;
  mouseClicked = false;

  allNotesNames = Object.keys(notes);
  allScalesNames = Object.keys(scales);

  currentScale = 'Major';
  currentNote = 'A';

  constructor(private _oscillatorService: OscillatorService) {
    this.onScaleOrNoteChange();
    document.addEventListener('mousedown', () => (this.mouseClicked = true));
    document.addEventListener('mouseup', () => (this.mouseClicked = false));
  }

  play(note: string, octave: number) {
    this._oscillatorService.playNote(this.currentNotes[note], octave);
  }

  playIfClicked(note: string, octave: number) {
    if (this.mouseClicked) {
      this.play(note, octave);
    }
  }

  changeScale(scale: string, note: string) {
    this.currentNotes = this._oscillatorService.getScale(scales[scale], notes[note]);
    this.notesNames = Object.keys(this.currentNotes);
  }

  onScaleOrNoteChange() {
    this.changeScale(this.currentScale, this.currentNote);
  }
}
